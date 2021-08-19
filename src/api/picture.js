import fetch from './fetch';

export default {
  // 获取首页轮播图
  getBanner: (query) => fetch.post('/picture/getBanner', query),
};
