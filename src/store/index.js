import Vue from 'vue';
import Vuex from 'vuex';
/**
 * 动作器,异步提交状态数据
 */
import actions from './actions';
/**
 * 数据维护器,变更状态数据
 */
import mutations from './mutations';
/**
 * 获取器,获取状态中的数据
 */
import getters from './getters';
/**
 * 导入存储数据状态
 */
import state from './state';
Vue.use(Vuex);
const debug = process.env.VUE_APP_ENV !== 'production';

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    strict: debug
});
