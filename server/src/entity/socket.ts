import {EntityModel} from "@midwayjs/typegoose";
import mongoose from "mongoose";
import {prop, Ref} from "@typegoose/typegoose";
import {User} from "./user";

@EntityModel()
export class Socket {
  public _id?: mongoose.Types.ObjectId;

  /**
   * socket id
   */
  @prop({index: true, required: true})
  public id?: string;

  /**
   * 连接用户
   */
  @prop({ref: () => User})
  public user?: Ref<User>;

  /**
   * 创建时间
   */
  @prop({default: new Date().getTime()})
  public createTime?: number;
}
