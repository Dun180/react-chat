import { Provide } from '@midwayjs/decorator';
import {InjectEntityModel} from "@midwayjs/typegoose";
import {ReturnModelType} from "@typegoose/typegoose";
import { Message } from '../entity/message';

@Provide()
export class MessageService {

  @InjectEntityModel(Message)
  messageModel: ReturnModelType<typeof Message>;

  async add(message: Message) {
    return await this.messageModel.create(message)
  }
}
