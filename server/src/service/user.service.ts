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
    const session = await this.userModel.startSession()
    await session.withTransaction(async () => {

    })
    const findRes = await this.userModel.find({username:user.username}).exec();
    if (findRes.length === 0){
      const createRes = await this.userModel.create({
        name:'',
        username: user.username,
        password: user.password
      } as User);
      if (createRes !== null){
        const updateRes = await this.userModel.updateOne({_id:createRes._id},{ $set:{name:'用户'+createRes._id.toString().substring(20,22)}}).exec()
        if (updateRes.modifiedCount > 0){
          return true
        }else {
          return false
        }

      }else {
        return false
      }
    }else {
      return false;
    }
  }
}
