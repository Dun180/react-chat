import {Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/typegoose";
import {Friend} from "../entity/friend";
import {ReturnModelType} from "@typegoose/typegoose";
import mongoose from "mongoose";
import * as assert from 'assert';

@Provide()
export class FriendService {

  @InjectEntityModel(Friend)
  friendModel:ReturnModelType<typeof Friend>

  async insert(friend: Friend){
    const findRes = await this.friendModel.find({from: friend.from, to: friend.to}).exec()
    assert(!findRes,'好友已添加')
    if (friend.from === friend.to) {
      throw new Error('不能添加自己为好友')
    }
    return await this.friendModel.create(friend)
  }

  async selectById(id: mongoose.Types.ObjectId) {
    return await this.friendModel.find({_id: id}).exec()
  }
}
