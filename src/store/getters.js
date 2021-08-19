const getters = {
  hasLogin: (state) => {
    if (!state.hasLogin) {
      return window.$vApp.store.local.get('hasLogin');
    }
    return state.hasLogin;
  },
  token: (state) => {
    if (!state.token) {
      return window.$vApp.store.local.get('token');
    }
    return state.token;
  },
  phone: (state) => {
    if (!state.phone) {
      return window.$vApp.store.local.get('phone');
    }
    return state.phone;
  },
  isLoading: (state) => {
    return state.isLoading;
  },
  userInfo: (state) => {
    return state.userInfo;
  },
  openId: (state) => {
    return state.openId;
  },
};

export default getters;
