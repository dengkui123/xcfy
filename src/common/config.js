// 配置文件
const HOST = {
  development: {
    url: 'http://demo.l-helper.com/exhibition-api',
  },
  test: {
    url: 'http://demo.l-helper.com/exhibition-api',
  },
  production: {
    url: 'http://demo.l-helper.com/exhibition-api',
  },
};

const host = HOST[process.env.NODE_ENV];
const config = {host};

export default config;
