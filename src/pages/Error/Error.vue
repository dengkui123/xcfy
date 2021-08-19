<template>
  <div class="container">
    <HeaderBar />
    <div class="content">
      <div class="img"><img src="../../assets/images/404.png" /></div>
      <div class="tips">很抱歉！你访问的页面不存在…</div>
      <div class="oper content-between">
        <router-link to="/" class="oper-btn back">返回首页</router-link>
        <div class="oper-btn" @click="onBack()">返回上一步</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onBack() {
      this.navigateBack();
    },
  },
  created() {
    setTimeout(() => {
      this.navigateBack();
    }, 3000);
  },
};
</script>
<style lang="less" scoped>
.container {
  .content {
    width: 264px;
    margin: 100px auto 0;
    .tips {
      margin: 17px 0 72px 0;
      font-size: 18px;
      color: #666;
    }
    .oper {
      &-btn {
        width: 105px;
        height: 36px;
        border-radius: 18px;
        border: 1px solid #e11321;
        text-align: center;
        line-height: 36px;
        color: #e11321;
        cursor: pointer;
      }
      .back {
        background: #e11321;
        color: #fff;
      }
    }
  }
}
</style>
