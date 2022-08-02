import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as socketio from '@midwayjs/socketio';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import * as typegoose from '@midwayjs/typegoose';
import * as jwt from '@midwayjs/jwt';
import * as cache from '@midwayjs/cache';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
// import { FormatMiddleware } from './middleware/format.middleware';
import { ErrorResponseMiddleware } from "./middleware/errorResponse.middleware";
import { JwtMiddleware } from "./middleware/jwt.middleware";

@Configuration({
  imports: [
    koa,
    validate,
    typegoose,
    jwt,
    socketio,
    cache,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([
      ReportMiddleware,
      // FormatMiddleware,
      // ErrorResponseMiddleware,
      JwtMiddleware
    ]);
    this.app.getMiddleware().insertFirst(ErrorResponseMiddleware);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
