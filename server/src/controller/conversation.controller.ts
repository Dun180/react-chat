import {Body, Controller, Get, Inject, Post, Query} from "@midwayjs/decorator";
import {ConversationService} from "../service/conversation.service";
import mongoose from "mongoose";
import {Result} from "../common/result";
import {Conversation} from "../entity/conversation";

@Controller('/conversation')
export class ConversationController {

  @Inject()
  conversationService:ConversationService;

  @Post('/add')
  async addConversation(@Body() conversation: Conversation) {
    return Result.succ(await this.conversationService.insertOrUpdate(conversation))
  }

  @Get('/query')
  async queryConversation(@Query('id') id){

    return Result.succ(await this.conversationService.selectById(new mongoose.Types.ObjectId(id)))
  }
}
