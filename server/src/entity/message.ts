import { prop, Ref } from '@typegoose/typegoose'
import { EntityModel} from "@midwayjs/typegoose";
import {User} from "./user";
import mongoose from "mongoose";


@EntityModel()
export class Message {

  public _id: mongoose.Types.ObjectId;
  /**
   * 发送者
   */
  @prop({ ref: () => User , required: true})
  public from?: Ref<User>;

  /**
   * 群聊: 群id, 私聊: 两人id拼接, 按字符串比较, 小的在前
   */
  @prop({index: true, required: true})
  public to?: string;

  /**
   * 消息类型 ['text', 'image', 'code', 'invite']
   */
  @prop({
    enum: ['text', 'image', 'file', 'code', 'invite', 'system'],
    default: 'text'
  })
  public type?: string;

  /**
   * 消息内容
   */
  @prop({default: ''})
  public content?: string;

  /**
   * 创建时间
   */
  @prop({default: new Date().getTime()})
  public createTime?: number;
}
