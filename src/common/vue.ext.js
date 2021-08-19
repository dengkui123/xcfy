// 导入自定义App实例
import VApp from './vue.app';
import config from './config';
import API from '@/api';
// uuid生成器
import uuid from './vue.uuid';
import store from '@/store';
import dialog from '@/common/vue.dialog';

const extConfig = () => ({
  $vApp: {
    value: VApp,
  },
  $api: {
    value: API,
  },
  $config: {
    value: config,
  },
  $uuid: {
    value: uuid,
  },
  $dialog: {
    value: dialog,
  },
  $token: {
    get() {
      return store.getters.token;
    },
  },
  $hasLogin: {
    get() {
      return store.getters.hasLogin;
    },
  },
});

const install = (V) => {
  const properties = extConfig();
  Object.defineProperties(V.prototype, properties);
  Object.defineProperties(window, properties);
};

const ext = {
  install,
};

export default ext;
