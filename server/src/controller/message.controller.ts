import {Body, Controller, Get, Inject, Post, Query} from "@midwayjs/decorator";
import {Result} from "../common/result";
import {MessageService} from "../service/message.service";
import {Message} from "../entity/message";

@Controller('/message')
export class MessageController {

  @Inject()
  messageService: MessageService;

  @Post('/add')
  async addMessage(@Body() message: Message) {
    return Result.succ(await this.messageService.insert(message))
  }

  @Get('/query')
  async queryMessage(@Query('to') to: string) {
    return Result.succ(await this.messageService.selectByTo(to))
  }
}
