import fetch from './fetch';

export default {
  //获取展会提醒
  getRemindList: (query) => fetch.get('/subscribe/getRemindList', query),

  //已读接口
  read: (query) => fetch.post('/subscribe/read', query),
};
