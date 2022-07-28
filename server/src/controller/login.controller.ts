import { Inject, Controller, Post, Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { User } from '../entity/user';
import { Result } from '../common/result'
import Md5Util from "../utils/md5Util";
import { JwtService } from '@midwayjs/jwt';
@Controller()
export class LoginController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  jwtService: JwtService;

  @Post('/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string
    ): Promise<object> {
    const res = await this.userService.login(username) as User;
    if (res === null) {
      return Result.fail('用户不存在')
    }
    if (Md5Util.hex_md5(username+password) !== res.password) {
      return Result.fail('密码错误')
    }

    const token = await this.jwtService.sign({id:res._id});
    this.ctx.set('Authorization', token);
    this.ctx.set('Access-control-Expose-Headers', "Authorization");

    return Result.succ({id:res._id, name:res.name})
  }

  @Post('/register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string
  ): Promise<object> {
    password = Md5Util.hex_md5(username+password)
    const user = new User();
    user.username = username;
    user.password = password;
    const res = await this.userService.register(user)
    if (res) {
      return Result.succ(null)
    }else {
      return Result.fail('注册失败')
    }
  }
}
