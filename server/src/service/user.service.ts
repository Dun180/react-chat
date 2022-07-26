import { Provide } from '@midwayjs/decorator';
import {InjectEntityModel} from "@midwayjs/typegoose";
import {ReturnModelType} from "@typegoose/typegoose";
import { User } from '../entity/user';

@Provide()
export class UserService {

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;


  async login(username: string) {
    return await this.userModel.findOne({username:username}).exec();
  }
  async register(user: User) {

    const findRes = await this.userModel.find({username:user.username}).exec();
    if (findRes.length === 0){
      const createRes = await this.userModel.create({
        name:'',
        username: user.username,
        password: user.password
      } as User);
      if (createRes !== null){
        const updateRes = await this.userModel.updateOne({_id:createRes._id},{ $set:{name:'用户'+createRes._id.toString().substring(22,24)}}).exec()
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

  async selectOne(id: string) {
    return await this.userModel.findOne({_id: id}).exec();
  }

  async selectByName(name: string) {
    const regexpName =  new RegExp(name, 'i');
    return await this.userModel.find({name: regexpName}).exec();
  }
}
