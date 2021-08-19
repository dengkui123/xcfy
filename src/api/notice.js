import fetch from './fetch';

export default {
  //根据页面位置,获取关于我们内容列表(含详情内容)
  queryNoticeByNoticeInfo: (query) => fetch.get('/notice/queryNoticeByNoticeInfo', query),
  
};