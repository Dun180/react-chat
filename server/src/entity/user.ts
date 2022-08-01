import { prop } from '@typegoose/typegoose'
import { EntityModel} from "@midwayjs/typegoose";
import mongoose from "mongoose";

@EntityModel()
export class User {

  public _id: mongoose.Types.ObjectId;

  /**
   * 用户名
   */
  @prop({
    unique: true,
    index: true,
    required: true
  })
  public username?: string;

  /**
   * 密码
   */
  @prop({ required: true })
  public password?: string;

  /**
   * 名字
   */
  @prop()
  public name?: string;

  /**
   * 创建时间
   */
  @prop({default: new Date().getTime()})
  public createTime?: number;

}
