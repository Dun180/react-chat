import {Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/typegoose";
import {Friend} from "../entity/friend";
import {ReturnModelType} from "@typegoose/typegoose";
import mongoose from "mongoose";

@Provide()
export class FriendService {

  @InjectEntityModel(Friend)
  friendModel:ReturnModelType<typeof Friend>

  async insert(friend: Friend){
    return await this.friendModel.create(friend)
  }

  async selectById(id: mongoose.Types.ObjectId) {
    return await this.friendModel.find({_id: id}).exec()
  }
}
