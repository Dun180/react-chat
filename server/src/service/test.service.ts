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
    const { _id: id } = await this.userModel.create({ name: 'JohnDoe', username: 'root', password: '123' } as User); // an "as" assertion, to have types for all properties

    // find data
    const user = await this.userModel.findById(id).exec();
    console.log(user)
  }
}
