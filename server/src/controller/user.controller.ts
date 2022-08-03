import { Controller, Inject, Query, Get} from "@midwayjs/decorator";
import {UserService} from "../service/user.service";
import {Result} from "../common/result";

@Controller('/user')
export class UserController {

  @Inject()
  userService: UserService;

  @Get('/query')
  async queryUser(@Query('name') name: string) {
    return Result.succ(await this.userService.selectByName(name));
  }
}
