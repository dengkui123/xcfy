import fetch from './fetch';

export default {
  //获取个人资料
  getPersonalData: (query) => fetch.get('/personalCenter/getPersonalData', query),

  //修改个人资料
  updatePersonalData: (query) => fetch.post('/personalCenter/updatePersonalData', query),

  //获取关注行业
  getUserIndustry: (query) => fetch.get('/personalCenter/getUserIndustry', query),

  //新增关注行业
  addIndustry: (query) =>
    fetch.post('/personalCenter/addIndustry', query, {
      contentType: 'formData',
    }),

  //删除关注行业
  deleteIndustry: (query) => fetch.delete('/personalCenter/deleteIndustry', query),

  //获取订阅设置
  getSubscribeList: (query) => fetch.get('/personalCenter/getSubscribeList', query),
};
