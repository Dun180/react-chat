import {EntityModel} from "@midwayjs/typegoose";
import mongoose from "mongoose";
import { prop, Ref } from '@typegoose/typegoose'
import {User} from "./user";

@EntityModel()
export class Conversation {

  public _id?: mongoose.Types.ObjectId;

  /**
   * 用户id
   */
  @prop({ ref: () => User, index: true, required: true})
  public user?: Ref<User>;

  /**
   * 群聊: 群id, 私聊: 两人id拼接, 按字符串比较, 小的在前
   */
  @prop({index: true, required: true})
  public to?: string;

  /**
   * 会话目标名称
   */
  @prop({required: true})
  public name?: string;

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
