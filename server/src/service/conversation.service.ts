import {Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/typegoose";
import {Conversation} from "../entity/conversation";
import {ReturnModelType} from "@typegoose/typegoose";
import mongoose from "mongoose";
const { isValid } = mongoose.Types.ObjectId;


@Provide()
export class ConversationService {

  @InjectEntityModel(Conversation)
  conversationModel: ReturnModelType<typeof Conversation>;

  async insert(conversation: Conversation){
    //判断是群组会话还是个人会话
    if(isValid(conversation.contact as mongoose.Types.ObjectId)) {
      //TODO
      //待更改，用一个to来存是对个人还是对群组会话，这里添加时就可以不用判断类型了
    }
    return await this.conversationModel.create(conversation)
  }

  async selectById(id: mongoose.Types.ObjectId) {
    return await this.conversationModel.find({_id: id}).exec()
  }
}
