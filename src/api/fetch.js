import axios from 'axios';
import qs from 'qs';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.timeout = 30000;
// axios.defaults.transformRequest = [(data) => qs.stringify(data)];

axios.interceptors.request.use((config) => {
  const newConfig = config;
  newConfig.headers = {
    ...newConfig.headers,
    token: window.$token,
  };
  return config;
});

let timer = null;

axios.interceptors.response.use(
  (response) => {
    const {data, status} = response;
    return new Promise((resolve, reject) => {
      // 更新token时间戳
      if (status !== 200) {
        window.$dialog.error('网络异常');
        reject('网络异常');
        return;
      }
      if (data.code !== 100200) {
        if (data.code === 100403) {
          window.$dialog.error('登录过期');
          window.$vApp.vueInst.$store.commit('refreshToken', '');
          window.$vApp.vueInst.$router.push('/login');
          return;
        }
        if (data.code === 500) {
          window.$dialog.error(data.msg || '服务器异常');
          reject();
          return;
        }
        window.$dialog.error(data.msg);
        reject(data);
        return;
      }
      resolve(data.data);
    });
  },
  (error) => {
    clearTimeout(timer);
    window.$dialog.error('网络异常');
    return Promise.reject(error);
  }
);

const post = (url, data = {}, options = {}) => {
  if (!options.hideLoading) {
    timer = setTimeout(() => {
      // window.$dialog.loading();
    }, 2000);
  }

  return new Promise((resolve, reject) => {
    const baseUrl = window.$config.host.url;
    const query = options.contentType === 'formDate' ? '' : `?${qs.stringify(data)}`;
    axios
      .post(`${baseUrl}${url}${query}`, data, {headers: options.headers || {}})
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
      .finally(() => {
        // window.$dialog.close();
        clearTimeout(timer);
      });
  });
};
const get = (url, data = {}, options = {}) => {
  if (!options.hideLoading) {
    timer = setTimeout(() => {
      // window.$dialog.loading();
    }, 300);
  }

  return new Promise((resolve, reject) => {
    const baseUrl = window.$config.host.url;
    const query = options.contentType === 'formDate' ? '' : `?${qs.stringify(data)}`;
    axios
      .get(`${baseUrl}${url}${query}`, data, {headers: options.headers || {}})
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(`${url}`, err);
        reject(err);
      })
      .finally(() => {});
  });
};
export default {post, get};
