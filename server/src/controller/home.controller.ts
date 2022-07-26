import {Controller, Get, Inject} from '@midwayjs/decorator';
import { TestService} from "../service/test.service";
import { Result } from '../common/result'

@Controller('/')
export class HomeController {

  @Inject()
  testService: TestService

  @Get('/')
  async home() {
    // await this.testService.getTest()
    // return 'Hello Midwayjs!'
    return Result.succ('Hello Midwayjs!');
  }
}
