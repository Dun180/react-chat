import {prop, Ref} from '@typegoose/typegoose'
import { EntityModel} from "@midwayjs/typegoose";
import mongoose from "mongoose";
import {User} from "./user";

@EntityModel()
export class Group {

  public _id?: mongoose.Types.ObjectId;

  /**
   * 创建者
   */
  @prop({ ref: () => User , required: true })
  public creator?: Ref<User>;

  /**
   * 群组名
   */
  @prop({ required:true })
  public name?: string;

  /**
   * 成员
   */
  @prop({ ref: () => User })
  public members?: Ref<User>[];

  /**
   * 创建时间
   */
  @prop({default: new Date().getTime()})
  public createTime?: number;
}
