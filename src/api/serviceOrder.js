import fetch from './fetch';

export default {
  // 取消订单
  cancelWaitePayOrder: (query) => fetch.post('/serviceOrder/cancelWaitePayOrder', query),
  // 检查服务库存
  checkInventory: (query) => fetch.post('/serviceOrder/checkInventory', query),
  // 确认支付
  confirmPay: (query) =>
    fetch.post('/serviceOrder/confirmPay', query, {
      contentType: 'formDate',
    }),
  // 获取服务订单详情
  getServiceOrderByCode: (query) => fetch.get('/serviceOrder/getServiceOrderByCode', query),
  // 获取服务订单列表
  getServiceOrders: (query) => fetch.get('/serviceOrder/getServiceOrders', query),
  // 创建订单
  makeSureOrder: (query) => fetch.post('/serviceOrder/makeSureOrder', query),
  // 计算订单金额
  orderAmt: (query) => fetch.post('/serviceOrder/orderAmt', query),
  // 支付
  prepay: (query) => fetch.post('/serviceOrder/prepay', query),
};
