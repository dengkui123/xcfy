<template>
  <div class="footer">
    <div class="w">
      <div class="footer-content">
        <div class="logo">
          <img src="../assets/images/logo.png" />
        </div>
        <div class="menu  flex-wrap">
          <div class="item" v-for="item in footerMenu" :key="item.id">
            <router-link :to="{path:'/about',query:{id:item.id}}">{{ item.name }}</router-link>
          </div>
        </div>
        <div class="settle">
          <a href=""><i class="el-icon-s-custom"></i> 展览公司入驻</a>
        </div>
      </div>
      <div class="copyright">
        <p>致力于服务广大的中小企业，让参展就像旅行，做展览行业的最佳SAAS服务商</p>
        <p>版权所有©小草发芽展览科技（深圳）有限公司 ICP备案号：粤ICP备15072167号-1</p>
      </div>
      <div class="links flex">
        <div class="item">友情链接：</div>
        <div class="item" v-for="item in linksList" :key="item.id">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      footerMenu: [
        {
          id: 1,
          name: '关于我们',
          // url: 'https://www.baidu.com',
        },
        {
          id: 2,
          name: '展会合作',
          // url: 'https://www.baidu.com',
        },
        {
          id: 3,
          name: '帮助中心',
          // url: 'https://www.baidu.com',
        },
        {
          id: 4,
          name: '高薪聘请',
          // url: 'https://www.baidu.com',
        },
        {
          id: 5,
          name: '致主办方',
          // url: 'https://www.baidu.com',
        },
        {
          id: 6,
          name: '联系我们',
          // url: 'https://www.baidu.com',
        },
        {
          id: 7,
          name: '友情链接',
          // url: 'https://www.baidu.com',
        },
        {
          id: 8,
          name: '广告服务',
          // url: 'https://www.baidu.com',
        },
        {
          id: 9,
          name: '法律声明',
          // url: 'https://www.baidu.com',
        },
        {
          id: 10,
          name: '媒体信息',
          // url: 'https://www.baidu.com',
        },
      ],
      linksList: [
        {
          id: 1,
          name: '小助手科技',
          url: 'https://www.baidu.com',
        },
        {
          id: 2,
          name: '香港会展中心',
          url: 'https://www.baidu.com',
        },
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.footer {
  padding: 57px 0 40px;
  background: #ededed;
  min-width: 1440px;
  &-content {
    display: flex;
    justify-content: space-between;
    .logo {
      width: 180px;
    }
    .menu {
      flex: 1;
      margin-bottom: 30px;
      padding-right: 200px;
      display: flex;
      .item {
        margin: 10px 0 0 100px;
        color: #333;
        font-size: 14px;
      }
    }
    .settle {
      width: 200px;
      text-align: right;
    }
  }
  .copyright {
    padding: 20px 0;
    color: #666;
    font-size: 14px;
    border-bottom: 1px solid #cccccc;
    line-height: 26px;
  }
  .links {
    padding-top: 20px;
    color: #666;
    font-size: 14px;
    .item {
      margin-right: 14px;
    }
  }
}
</style>
