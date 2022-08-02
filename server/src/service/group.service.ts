import { Provide } from '@midwayjs/decorator';
import {InjectEntityModel} from "@midwayjs/typegoose";
import {ReturnModelType} from "@typegoose/typegoose";
import { Group } from '../entity/group';
import mongoose from "mongoose";

@Provide()
export class GroupService {

  @InjectEntityModel(Group)
  groupModel: ReturnModelType<typeof Group>;

  async insert(group: Group) {
    return await this.groupModel.create(group);
  }

  async selectOne(id: mongoose.Types.ObjectId) {
    return this.groupModel.findOne({_id: id}).exec();
  }
}
