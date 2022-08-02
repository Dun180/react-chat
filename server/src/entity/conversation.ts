import {EntityModel} from "@midwayjs/typegoose";
import mongoose from "mongoose";
import { prop, Ref } from '@typegoose/typegoose'
import {User} from "./user";
import {Group} from "./group";

@EntityModel()
export class Conversation {

  public _id?: mongoose.Types.ObjectId;

  /**
   * 用户id
   */
  @prop({ index: true, required: true})
  public user?: string;

  /**
   * 联系人
   */
  @prop({ref: () => User})
  public linkman?: Ref<User>;

  /**
   * 群组
   */
  @prop({ref: () => Group})
  public group?: Ref<Group>;

  /**
   * 最新一条信息
   */
  @prop()
  public message?: string;

  /**
   * 更新时间
   */
  @prop({default: new Date().getTime()})
  public updateTime?: number;
}
