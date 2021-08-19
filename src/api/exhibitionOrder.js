import fetch from './fetch';

export default {
  //获取展会订单列表
  getExhibitionOrders: (query) => fetch.get('/exhibitionOrder/getExhibitionOrders', query), 
  
  //获取展会订单详情
  getExhibitionOrderByCode: (query) => fetch.get('/exhibitionOrder/getExhibitionOrderByCode', query),

  //确认支付
  confirmPay: (query) => fetch.post('/exhibitionOrder/confirmPay', query),
};
