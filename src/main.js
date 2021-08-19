import Vue from 'vue';
import VueRouter from 'vue-router';
import jsStorage from 'store';
import ElementUI from 'element-ui';
import vuexStore from '@/store';

import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/app.css';
import '@/common/vue.common';
import vueExt from '@/common/vue.ext';
import App from './App.vue';
import router from './router';
import './icons';
import './assets/less/font.css';
import mixin from '@/common/vue.mixin.js';

/**
 * 导入公众组件
 */
import GlobalComponents from './components';

Vue.use(ElementUI);
/**
 * 导入主题
 */
import './assets/css/app.css';

(() => {
  window.jsStorage = jsStorage;
})();
/**
 * 使用组件
 */
Vue.use(VueRouter);

Vue.mixin(mixin);
/**
 * 方法挂载
 */
Vue.use(vueExt);

Vue.use(GlobalComponents);

new Vue({
  el: '#app',
  router,
  store: vuexStore,

  created() {
    this.$vApp.vueInst = this;
    if (this.$token) {
      this.getUserInfo();
    }
  },
  render: (h) => h(App),
});
