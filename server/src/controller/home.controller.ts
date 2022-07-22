import {Controller, Get, Inject} from '@midwayjs/decorator';
import { TestService} from "../service/test.service";

@Controller('/')
export class HomeController {

  @Inject()
  testService: TestService

  @Get('/')
  async home(): Promise<string> {
    await this.testService.getTest()
    return 'Hello Midwayjs!';
  }
}
