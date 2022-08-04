import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1658384704130_9147',
  koa: {
    port: 7001,
  },
  socketIO: {
    path: '/testPath',
    cors: {
      origin: '*',
      methods: ["GET", "POST"]
    }
  },
  mongoose: {
    client: {
      uri: 'mongodb://152.136.209.249:27017/test',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: 'test',
        pass: 'test'
      },
    },
  },
  jwt: {
    secret: 'f4e2e52034348f86b67cde581c0f9eb6', // fs.readFileSync('xxxxx.key')
    expiresIn: '2d', // https://github.com/vercel/ms
  },
  cache: {
    store: 'memory',
    options: {
      max: 100,
      ttl: null,      // 修改默认的ttl配置
    },
  },
} as MidwayConfig;
