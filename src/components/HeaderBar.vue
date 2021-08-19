<template>
  <div class="header">
    <div class="w">
      <div class="user">
        <div class="logined flex" v-if="hasLogin">
          <div class="name">
            <router-link to="/user"
              ><i class="el-icon-user-solid"></i> {{ _userInfo.userName || '' }}</router-link
            >
          </div>
          <div class="logout" @click="onLoginOut">退出登录</div>
        </div>
        <div class="login" @click="showLoginDialog" v-else>
          登录 / 注册
        </div>
      </div>
      <div class="content content-between">
        <router-link to="/" class="logo"></router-link>
        <div class="search">
          <div class="ipt">
            <input
              v-model="keyword"
              @keyup.enter="onSearch"
              placeholder="输入：国家、城市、行业、展会名称"
            />
          </div>
          <div class="button" @click="onSearch">搜索</div>
        </div>
      </div>
      <div class="nav content-between">
        <router-link
          :to="item.url"
          class="li"
          :class="['li', currentPath === item.url ? 'active' : '']"
          v-for="item in menuList"
          :key="item.name"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
    <!-- 登录 -->
    <LoginDialog ref="loginDialog" />
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  data() {
    return {
      keyword: '',
      currentPath: '',
      myUserInfo: {},
      menuList: [
        {
          name: '首页',
          url: '/',
        },
        {
          name: '国际展会',
          url: '/exhibitionAbroad',
        },
        {
          name: '国内展会',
          url: '/exhibitionChina',
        },
        {
          name: '展会服务',
          url: '/services',
        },
        {
          name: '展会资讯',
          url: '/news',
        },
        {
          name: '联系我们',
          url: '/contact',
        },
        {
          name: '关于我们',
          url: '/about',
        },
      ],
    };
  },
  watch: {
    $route: {
      handler(to) {
        if (to.query.isDomestic == 0) {
          this.currentPath = '/exhibitionAbroad';
          return;
        }
        if (to.query.isDomestic == 1) {
          this.currentPath = '/exhibitionChina';
          return;
        }
        this.currentPath = to.path;
      },
      immediate: true,
    },
  },
  methods: {
    pageLoad({keyword = ''}) {
      this.keyword = keyword;
    },
    // 查询
    onSearch() {
      if (this.$route.path == '/search') {
        this.$emit('search', this.keyword);
      } else {
        this.navigateTo(`/search?keyword=${this.keyword}`);
      }
    },
    // 退出登录
    onLoginOut() {
      this.$api.auth.loginOut().then(() => {
        this.refreshToken('');
        this.refreshHasLogin(false);
        this.$refs.loginDialog.onClose();
        this.navigateTo('/');
        window.location.reload();
      });
    },
    showLoginDialog() {
      this.$refs.loginDialog.show();
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  background: #fff;
  min-width: 1440px;
  .w {
    padding-top: 80px;
    position: relative;
  }
  .user {
    position: absolute;
    right: 0;
    top: 28px;

    font-size: 16px;

    .login {
      color: #dc905a;
      cursor: pointer;
    }
    .logined {
      color: #999;
      a {
        color: #999;
        &:hover {
          color: #e11321;
        }
      }
    }
    .logout {
      cursor: pointer;
      margin-left: 15px;
    }
  }
}
.content {
  width: 1200px;

  .logo {
    width: 156px;
    height: 83px;
    margin-right: 56px;
    background: url('../assets/images/logo.png') center no-repeat;
    -webkit-background-size: contain;
    background-size: contain;
    cursor: pointer;
  }
  .search {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-content: center;
    height: 62px;
    border: 2px solid #e11321;
    border-radius: 8px;
    overflow: hidden;
    .ipt {
      flex: 1;
      height: 60px;
      padding: 10px 10px 10px 37px;
      input {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
      }
    }
    .button {
      width: 141px;
      text-align: center;
      line-height: 60px;
      color: #fff;
      background: #e11321;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
.nav {
  margin-left: 212px;
  height: 74px;
  width: 990px;
  .li {
    line-height: 40px;
    color: #333333;
    font-size: 20px;
    cursor: pointer;
  }
  .active {
    color: #e11321;
  }
}
</style>
