import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../entity/user';

@Provide()
export class TestService {

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  async getTest(){
    // create data
    const res = await this.userModel.create({ name: 'JohnDoe2', username: 'root2', password: '123' } as User); // an "as" assertion, to have types for all properties
    console.log(res)
    // find data
    // const user = await this.userModel.findById(id).exec();

    const user2 = await this.userModel.find({username:'root1',password:'123'}).exec();
    // console.log(user)
    console.log(user2)


  }
}
