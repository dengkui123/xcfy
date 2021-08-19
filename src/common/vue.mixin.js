import {mapMutations} from 'vuex';

const mixin = {
  data() {
    return {};
  },
  computed: {
    _token() {
      if (!this.$store) {
        return '';
      }
      return this.$store.getters.token;
    },
    hasLogin() {
      if (!this.$store) {
        return false;
      }
      return this.$store.getters.hasLogin;
    },
    _userInfo() {
      if (!this.$store) {
        return {};
      }
      return this.$store.getters.userInfo || {};
    },
  },
  /**
   * 仅在页面Create时初始化参数
   */
  created() {
    if (this.$route) {
      this.$vOptions = {
        ...{},
        ...this.$route.query,
        ...this.$route.params,
      };
    } else {
      this.$vOptions = {};
    }
    if (typeof this.pageLoad == 'function') {
      this.pageLoad(this.$vOptions);
    }
  },
  mounted() {
    if (typeof this.pageShow == 'function') {
      this.pageShow();
    }
  },
  methods: {
    ...mapMutations([
      'refreshToken',
      'refreshPhone',
      'refreshHasLogin',
      'refreshUserInfo',
      'refreshOpenId',
    ]),
    navigateTo(obj) {
      if (Object.isObject(obj)) {
        this.$router.push({
          path: obj.path,
          query: obj.query,
        });
      }
      if (Object.isString(obj)) {
        this.$router.push(obj);
      }
    },
    navigateBack(num = -1) {
      this.$router.go(num);
    },
    // 获取用户信息
    getUserInfo() {
      this.$api.auth.userData().then((res) => {
        console.log(res);
        this.refreshUserInfo(res);
      });
    },
  },
};

export default mixin;
