<template>
  <div class="wechat">
    <div class="avatar">
      <span>微信头像：</span>
      <img :src="info.avatarUrl" alt="微信头像" />
    </div>
    <div class="name">
      微信昵称：<span>{{ info.nickName }}</span>
    </div>
    <div class="binding">
      绑定微信：<img :src="info.qrCode" alt="二维码" />
      <p class="text">(扫码绑定微信)</p>
    </div>
    <button class="btn-save" @click.prevent="save">保存</button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      info: {
        avatar: '',
        name: '',
        qrCode: '',
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    pageLoad() {
      this.info = {...this._userInfo};
    },
    save() {
      console.log('save');
    },
  },
  mounted() {},
  created() {},
};
</script>
<style lang="less" scoped>
.wechat {
  .avatar {
    margin: 40px 0 22px 0;
    img {
      vertical-align: middle;
      width: 48px;
      height: 48px;
      margin-left: 21px;
      border-radius: 50%;
    }
  }
  .name {
    margin-bottom: 40px;
    span {
      margin-left: 21px;
    }
  }
  .binding {
    img {
      vertical-align: top;
      margin-left: 21px;
      width: 125px;
      height: 125px;
    }
    .text {
      font-size: 12px;
      color: #666;
      margin: 10px 0 0 113px;
    }
  }
  .btn-save {
    margin-top: 60px;
    width: 97px;
    height: 32px;
    color: #fff;
    background: #037aff;
    font-size: 12px;
    border-radius: 2px;
    margin-left: 105px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 1;
    }
  }
}
</style>
