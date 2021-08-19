const mutations = {
  refreshHasLogin(state, hasLogin) {
    state.hasLogin = hasLogin;
    window.$vApp.store.local.set('hasLogin', hasLogin);
  },
  refreshToken(state, token) {
    state.token = token;
    window.$vApp.store.local.set('token', token);
  },
  refreshPhone(state, phone) {
    state.phone = phone;
    window.$vApp.store.local.set('phone', phone);
  },
  refreshOpenId(state, openId) {
    state.openId = openId;
  },
  refreshUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
};

export default mutations;
