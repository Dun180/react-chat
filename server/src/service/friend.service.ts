import {Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/typegoose";
import {Friend} from "../entity/friend";
import {ReturnModelType} from "@typegoose/typegoose";
import mongoose from "mongoose";
import * as assert from 'assert';
import {User} from "../entity/user";

@Provide()
export class FriendService {

  @InjectEntityModel(Friend)
  friendModel:ReturnModelType<typeof Friend>

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  async insert(friend: Friend){
    const findRes = await this.friendModel.find({from: friend.from, to: friend.to}).exec()
    assert(!findRes.length,'好友已添加')
    if (friend.from === friend.to) {
      throw new Error('不能添加自己为好友')
    }
    return await this.friendModel.create(friend)
  }

  async selectById(id: mongoose.Types.ObjectId) {
    const friendList = await this.friendModel.find({from: id}).exec()
    const userList = []
    await Promise.all(friendList.map(async friend => {
      const user = await this.userModel.findOne({_id: friend.to}).exec()
      userList.push(user)
    }))
    return userList
  }
}
