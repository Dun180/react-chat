import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1658384704130_9147',
  koa: {
    port: 7001,
  },
  mongoose: {
    client: {
      uri: 'mongodb://152.136.209.249:27017',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: 'dun',
        pass: '721210'
      }
    },
  },
} as MidwayConfig;