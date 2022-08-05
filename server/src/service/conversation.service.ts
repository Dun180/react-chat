import {Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/typegoose";
import {Conversation} from "../entity/conversation";
import {ReturnModelType} from "@typegoose/typegoose";
import mongoose from "mongoose";
import * as assert from "assert";
import {Group} from "../entity/group";
import {User} from "../entity/user";
const { isValid } = mongoose.Types.ObjectId;


@Provide()
export class ConversationService {

  @InjectEntityModel(Conversation)
  conversationModel: ReturnModelType<typeof Conversation>;

  @InjectEntityModel(Group)
  groupModel: ReturnModelType<typeof Group>;

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  async insertOrUpdate(conversation: Conversation){
    //检验to的合法性，给name赋值
    if (isValid(conversation.to)){
      const toGroup = await this.groupModel.findOne({_id: new mongoose.Types.ObjectId(conversation.to)});
      assert(toGroup, '群组不存在');
      conversation.name = toGroup.name
    }else {
      const userId = conversation.to.replace(conversation.user.toString(), '');
      assert(isValid(userId), '无效的用户ID');
      const toUser = await this.userModel.findOne({_id: new mongoose.Types.ObjectId(userId)});
      assert(toUser, '用户不存在');
      conversation.name = toUser.name
    }
    //会话查重
    const findRes = await this.conversationModel.find({user: conversation.user, to: conversation.to}).exec()
    if (findRes.length > 0) {
      if (conversation.message === '' || conversation.message === undefined || conversation.message === null) {
        return findRes[0]
      }else {
        const updateRes = await this.conversationModel.updateOne({_id: findRes[0]._id} ,{$set:{message: conversation.message}}).exec()
        console.assert(updateRes.matchedCount,'数据更新错误')
        return this.conversationModel.findOne({user: conversation.user, to: conversation.to}).exec()
      }

    }else {
      return await this.conversationModel.create(conversation)
    }
  }


  async selectById(id: mongoose.Types.ObjectId) {

    return await this.conversationModel.find({user: id}).exec()

  }
}
