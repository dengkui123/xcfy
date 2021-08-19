import fetch from './fetch';

export default {
  // 注册
  webRegister: (query) => fetch.post('/auth/webRegister', query),
  // 手机验证码登录
  phoneLogin: (query) => fetch.get('/auth/phoneLogin', query),
  // 获取登录二维码
  getLoginQr: (query) => fetch.get('/auth/getLoginQr', query),
  // 获取验证码
  sendMsg: (query) => fetch.get('/auth/sendMsg', query),
  // 用户退出
  loginOut: (query) => fetch.get('/auth/login/out', query),
  // token获取用户信息
  userData: (query) => fetch.get('/auth/token/userdata', query),
  // 检查用户扫码登录
  checkLogin: (query) => fetch.get('/auth/wechat/checkLogin', query),
  //获取重置手机号验证码
  sendPwdMsg: (query) => fetch.get('/auth/sendPwdMsg', query),
  //网站绑定手机号
  bindMobile: (query) => fetch.post('/auth/bindMobile', query),
  //重置手机号
  uploadCustomerMobile: (query) => fetch.post('/auth/uploadCustomerMobile', query),
};
