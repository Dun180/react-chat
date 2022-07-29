import { WSController, OnWSConnection, Inject, OnWSMessage, WSEmit } from '@midwayjs/decorator';
import { Context } from '@midwayjs/socketio';

@WSController('/hello')
export class HelloSocketController {

  @Inject()
  ctx: Context;

  @OnWSConnection()
  async onConnectionMethod() {
    console.log('on client connect', this.ctx.id);
    console.log('参数', this.ctx.handshake.query);
    this.ctx.join('fz' + this.ctx.handshake.query.fjh);
    let data2 = {
      id: this.ctx.id,
      fj: this.ctx.handshake.query.fjh,
      data: null,
      xx: this.ctx.handshake.query,
    };
    this.ctx.emit('data', data2, '连接成功');
  }
  // 消息事件
  @OnWSMessage('data')
  @WSEmit('data')
  async getMessage(data) {
    let data2 = {
      id: this.ctx.id,
      fj: this.ctx.handshake.query.fjh,
      data: data,
      xx: this.ctx.handshake.query,
    };
    // console.log('on data got', this.ctx.id, data2);
    // this.ctx.broadcast.emit('data', data);
    this.ctx.to('fz' + this.ctx.handshake.query.fjh).emit('data', data2);
    // this.ctx.to('polling').emit('data', data);
    return data2;
  }

}
