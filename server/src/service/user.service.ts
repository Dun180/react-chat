import { Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import {InjectEntityModel} from "@midwayjs/typegoose";
import {ReturnModelType} from "@typegoose/typegoose";
import { User } from '../entity/user';

@Provide()
export class UserService {

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
  async login(username: string) {
    return await this.userModel.findOne({username:username}).exec();
  }
  async register(user: User) {
    const findRes = await this.userModel.find({username:user.username}).exec();
    if (findRes.length === 0){
      const createRes = await this.userModel.create({
        name: user.name,
        username: user.username,
        password: user.password
      } as User);
      return createRes !== null
    }else {
      return false;
    }
  }
}
