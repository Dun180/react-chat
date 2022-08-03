import {Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/typegoose";
import {Conversation} from "../entity/conversation";
import {ReturnModelType} from "@typegoose/typegoose";
import mongoose from "mongoose";


@Provide()
export class ConversationService {

  @InjectEntityModel(Conversation)
  conversationModel: ReturnModelType<typeof Conversation>;

  async insert(conversation: Conversation){
    return await this.conversationModel.create(conversation)
  }

  async selectById(id: mongoose.Types.ObjectId) {
    return await this.conversationModel.find({_id: id}).exec()
  }
}
