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
import {ConversationService} from "../service/conversation.service";


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

  @Inject()
  conversationService: ConversationService;

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

    //判断信息是发给个人还是群聊，并进行数据校验

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

    //插入数据库
    const message = await this.messageService.insert(msg)


    //根据发送的对象不同进行不同处理
    if (toGroup) {
      //更新会话列表
      await this.conversationService.insert(
        {
          user: message.from,
          group: new mongoose.Types.ObjectId(msg.to),
          message: user.name + ':' + message.content
        })
      //群发消息
      //ToDo
    }else if (toUser) {
      //更新会话列表
      await this.conversationService.insert(
        {
          user: message.from,
          contact: toUser._id,
          message: message.content
        })

      //发送消息
      const target = await this.cacheManager.get(message.to)
      this.ctx.to(target.toString()).emit('sendMsg',message)
    }
    console.log(msg)

  }
}
