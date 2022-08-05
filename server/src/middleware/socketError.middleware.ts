// src/middleware/socket.middleware.ts
import { Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/socketio';

@Middleware()
export class SocketErrorMiddleware {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      try {
        return await next();

      } catch (error) {
        console.log(error)
        ctx.emit('error',error.message)
      }
    }
  }
}
