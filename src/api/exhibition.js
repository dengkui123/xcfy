import fetch from './fetch';

export default {
  // 获取全部分类
  getAllCategory: (query) => fetch.get('/exhibition/getAllCategory', query, {}),

  // 查询展会列表
  exhibitionList: (query) =>
    fetch.post('/exhibition/exhibitionList', query, {
      contentType: 'formDate',
    }),

  // 参展信息提交
  exhibitor: (query) => fetch.post('/exhibition/exhibitor', query),

  // 获取分类
  getCategory: (query) => fetch.get('/exhibition/getCategory', query),

  //获取区域
  getCategoryRegion: (query) => fetch.get('/exhibition/getCategoryRegion', query),

  // 获取城市信息
  getCity: (query) => fetch.get('/exhibition/getCity', query),

  // 获取国家信息
  getCountry: (query) => fetch.get('/exhibition/getCountry', query),

  // 获取年份
  getYears: (query) => fetch.get('/exhibition/getYears', query),

  // 获取月份
  getMonths: (query) => fetch.get('/exhibition/gettMonths', query),

  // 获取展会详细信息
  getExhibition: (query) => fetch.get('/exhibition/getExhibition', query),

  //获取首页头条展会列表
  headilinesExhibition: (query) => fetch.get('/exhibition/headilinesExhibition', query),

  //获取推荐展会列表
  recommendExhibition: (query) => fetch.get('/exhibition/recommendExhibition', query),

  //获取近期展会列表
  getRecentExhibitions: (query) => fetch.get('/exhibition/getRecentExhibitions', query),

  //获取订阅状态
  subscribeNotice: (query) => fetch.post('/exhibition/subscribeNotice', query),

  //取消/订阅接口
  subscribe: (query) => fetch.post('/exhibition/subscribe', query),
};
