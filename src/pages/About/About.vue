<template>
  <div class="container">
    <HeaderBar />
    <div class="main">
      <div class="banner"></div>
      <div class="w inner">
        <div class="side-menu">
          <side-menu :current="0" :list="sideMenu" @on-click="onClickMenus" />
        </div>
        <div class="content">
          <div class="position">{{ aboutObj.textTitle }}</div>
          <div class="rich-text" v-html="aboutObj.content"></div>
        </div>
      </div>
    </div>
    <FooterBar />
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      activeMenu: {},
      sideMenu: [
        {
          id: 1,
          name: "关于我们",
          position: 2007,
        },
        {
          id: 2,
          name: "联系我们",
          position: 2008,
        },
        {
          id: 3,
          name: "展会合作",
          position: 2009,
        },
        {
          id: 4,
          name: "友情链接",
          position: 2010,
        },
        {
          id: 5,
          name: "帮助中心",
          position: 2011,
        },
        {
          id: 6,
          name: "广告服务",
          position: 2012,
        },
        {
          id: 7,
          name: "高薪聘请",
          position: 2013,
        },
        {
          id: 8,
          name: "法律声明",
          position: 2014,
        },
        {
          id: 9,
          name: "致主办方",
          position: 2015,
        },
      ],
      aboutObj: {},
    };
  },
  watch: {
    sideMenu: {
      handler(val) {
        console.log("val", val);
        this.activeMenu = val[0];
      },
      immediate: true,
    },
  },
  computed: {},
  methods: {
    pageLoad() {
      this.queryNoticeByNoticeInfo();
    },

    //获取标题和富文本内容
    queryNoticeByNoticeInfo() {
      this.$api.notice
        .queryNoticeByNoticeInfo({ position: this.activeMenu.position })
        .then((res) => {
          this.aboutObj = res[0] || {};
        });
    },
    onClickMenus(item) {
      this.activeMenu = item;
      console.log(item);
      this.queryNoticeByNoticeInfo();
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;

  .banner {
    width: 100%;
    height: 400px;
    background: url(../../assets/images/about/banner.png) no-repeat center
      center / cover;
  }

  .inner {
    display: flex;
    margin-top: 30px;
    background: #fff;
    .side-menu {
      width: 200px;
      background: #f3f3f3;
    }
    .content {
      flex: 1;
      padding: 0 30px 0 46px;
      .position {
        height: 60px;
        padding: 20px 0 10px 0;
        color: #333;
        font-weight: bold;
        font-size: 18px;
        border-bottom: 1px solid #ccc;
      }
      .rich-text {
        padding: 20px 0;
      }
    }
  }
}
</style>
<style lang="less">
.container .inner .content .rich-text {
  img {
    width: 100%;
  }
  a:hover {
    opacity: 0.8;
  }
}
</style>
