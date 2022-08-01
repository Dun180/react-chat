import { Provide } from '@midwayjs/decorator';
import {InjectEntityModel} from "@midwayjs/typegoose";
import {ReturnModelType} from "@typegoose/typegoose";
import { Group } from '../entity/group';

@Provide()
export class GroupService {

  @InjectEntityModel(Group)
  groupModel: ReturnModelType<typeof Group>;

  async add(group: Group) {
    return await this.groupModel.create(group)
  }
}
