import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class ErrorResponseMiddleware implements IMiddleware<Context, NextFunction>{
  resolve() {
    return async (ctx: Context, next: () => Promise<any>) => {
      try {
        await next();
      } catch (error) {
        // ctx.body = getReturnValue(
        //   false,
        //   null,
        //   error.message || '系统发生错误，请联系管理员'
        // );
      }
    };
  }

  static getName(): string {
    return 'error_response';
  }
}
