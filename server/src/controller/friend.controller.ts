import {Controller, Get, Inject, Query} from "@midwayjs/decorator";
import {ConversationService} from "../service/conversation.service";
import mongoose from "mongoose";
import {Result} from "../common/result";

@Controller('/conversation')
export class ConversationController {

  @Inject()
  conversationService:ConversationService;



  @Get('/query')
  async queryConversation(@Query('id') id){

    return Result.succ(await this.conversationService.selectById(new mongoose.Types.ObjectId(id)))
  }
}
