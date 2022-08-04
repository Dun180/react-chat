import {Body, Controller, Get, Inject, Post, Query} from "@midwayjs/decorator";
import mongoose from "mongoose";
import {FriendService} from "../service/friend.service";
import {Friend} from "../entity/friend";
import {Result} from "../common/result";

@Controller('/friend')
export class FriendController {

  @Inject()
  friendService: FriendService;

  @Post('/add')
  async addFriend(@Body() friend: Friend){
    return Result.succ(await this.friendService.insert(friend))
  }

  @Get('/query')
  async queryFriend(@Query('id') id){
    return Result.succ(await this.friendService.selectById(new mongoose.Types.ObjectId(id)))
  }
}
