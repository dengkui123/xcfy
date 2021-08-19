import fetch from './fetch';

export default {
  // 获取服务分类
  getServiceCategory: (query) => fetch.post('/service/getServiceCategory', query, {}),

  // 获取服务列表
  getServiceList: (query) => fetch.post('/service/getServiceList', query, {}),

  // 获取服务详情
  getServiceInfo: (query) => fetch.post('/service/getServiceInfo', query),
};
