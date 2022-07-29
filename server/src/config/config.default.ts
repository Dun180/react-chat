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
      uri: 'mongodb://152.136.209.249:27017',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: 'dun',
        pass: '721210'
      },
    },
  },
  jwt: {
    secret: 'f4e2e52034348f86b67cde581c0f9eb6', // fs.readFileSync('xxxxx.key')
    expiresIn: '2d', // https://github.com/vercel/ms
  },
} as MidwayConfig;
