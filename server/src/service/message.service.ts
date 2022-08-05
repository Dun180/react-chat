import { Provide } from '@midwayjs/decorator';
import {InjectEntityModel} from "@midwayjs/typegoose";
import {ReturnModelType} from "@typegoose/typegoose";
import { Message } from '../entity/message';
import {Conversation} from "../entity/conversation";

@Provide()
export class MessageService {

  @InjectEntityModel(Message)
  messageModel: ReturnModelType<typeof Message>;

  @InjectEntityModel(Conversation)
  conversationModel: ReturnModelType<typeof Conversation>;

  async insert(message: Message) {
    return await this.messageModel.create(message);
  }

  async selectByTo(to: string) {
    return await this.messageModel.find({to: to}).exec();
  }
}
