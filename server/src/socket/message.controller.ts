import {Inject, OnWSConnection, WSController, OnWSMessage} from "@midwayjs/decorator";
import {Context} from "@midwayjs/socketio";
import { CacheManager } from '@midwayjs/cache';
import {Message} from "../entity/message";
import mongoose from "mongoose";
import {GroupService} from "../service/group.service";
import {UserService} from "../service/user.service";
import {User} from "../entity/user";
import {Group} from "../entity/group";
const { isValid } = mongoose.Types.ObjectId;
import * as assert from 'assert';
import {OnWSDisConnection} from "@midwayjs/decorator/dist/decorator/ws/webSocketEvent";
import {SocketService} from "../service/socket.service";
import {MessageService} from "../service/message.service";


@WSController('/message')
export class MessageController {

  @Inject()
  ctx: Context;

  @Inject()
  cacheManager: CacheManager;

  @Inject()
  groupService: GroupService;

  @Inject()
  socketService: SocketService;

  @Inject()
  userService: UserService;

  @Inject()
  messageService: MessageService;

  @OnWSConnection()
  async onConnectionMethod() {
    console.log('on client connect', this.ctx.id);
    await this.socketService.insert({id: this.ctx.id})
  }

  @OnWSDisConnection()
  async onDisConnectionMethod(){
    await this.socketService.deleteById(this.ctx.id)
  }

  @OnWSMessage('login')
  async login(data) {
    await this.cacheManager.set(data, this.ctx.id);
  }

  @OnWSMessage('sendMsg')
  async sendMsg(msg: Message) {
    const { to, content } = msg;
    const { type } = msg;

    let toGroup: Group | null = null;
    let toUser: User | null = null;
    if (isValid(to)){
      toGroup = await this.groupService.selectOne(msg._id);
      assert(toGroup, '群组不存在');
    }else {
      const socket = await this.socketService.selectOne(this.ctx.id)
      assert(socket, '连接错误')
      const userId = msg.to.replace(socket.user.toString(), '');
      assert(isValid(userId), '无效的用户ID');
      toUser = await this.userService.selectOne(userId);
      assert(toUser, '用户不存在');
    }

    if (type === 'text') {
      assert(content.length <= 2048, '消息长度过长');

    }

    const user = await this.userService.selectOne(msg.from.toString())
    assert(user,'用户不存在')

    const message = await this.messageService.insert(msg)

    if (toGroup) {

    }else if (toUser) {
      const target = await this.cacheManager.get(message.to)
      this.ctx.to(target.toString()).emit('sendMsg',message)
    }
    console.log(msg)

    // this.ctx.to(result).emit('sendMsg', data)
  }
}
