import {Body, Controller, Inject, Post} from "@midwayjs/decorator";
import {MessageService} from "../service/message.service";
import {Message} from "../entity/message";

@Controller('/message')
export class MessageController {

  @Inject()
  messageService:MessageService;

  @Post('/add')
  async addMessage(@Body() message: Message){
      return this.messageService.add(message)
  }

}
