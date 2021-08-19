<template>
  <div class="empty">
    <div class="content">
      <div><img class="img" src="./images/noData.png" /></div>
      <div class="txt">{{ content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    content: {
      type: String,
      default: '暂无数据',
    },
  },
  data() {
    return {};
  },

  mounted() {},
};
</script>
<style lang="less" scoped>
.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;

  .img {
    width: 160px;
  }
  .txt {
    margin-top: 10px;
    font-size: 18px;
    text-align: center;
    color: #999;
    font-size: 20px;
  }
}
</style>
