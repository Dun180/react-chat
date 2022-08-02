import {Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/typegoose";
import {Conversation} from "../entity/conversation";
import {ReturnModelType} from "@typegoose/typegoose";


@Provide()
export class ConversationService {

  @InjectEntityModel(Conversation)
  conversationModel: ReturnModelType<typeof Conversation>;

  async insert(conversation: Conversation){
    return await this.conversationModel.create(conversation)
  }
}
