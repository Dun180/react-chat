import {prop, Ref} from '@typegoose/typegoose'
import { EntityModel} from "@midwayjs/typegoose";
import mongoose from "mongoose";
import {User} from "./user";

@EntityModel()
export class Friend {

  public _id?: mongoose.Types.ObjectId;

  /**
   * 源用户id
   */
  @prop({ ref: () => User , required: true })
  public from?: Ref<User>;

  /**
   * 目标用户id
   */
  @prop({ ref: () => User, required:true })
  public to?: Ref<User>;

  /**
   * 创建时间
   */
  @prop({default: new Date().getTime()})
  public createTime?: number;
}
