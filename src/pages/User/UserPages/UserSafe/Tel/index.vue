<template>
  <div class="phone">
    <el-form 
    ref="form" 
    :model="info" 
    label-width="80px"
    class="phone-form"
    >
      <el-form-item label="新手机号：">
        <el-input v-model="info.phone" style="width:294px;"></el-input>
      </el-form-item>
      <el-form-item label="验证码：">
        <el-input v-model="info.code" style="width:294px;"></el-input>
      </el-form-item>
      </el-form>
    <el-button v-if="second > 59 || second <= 0" class="btn-send" @click.prevent="sendPwdMsg"><span >发送验证码</span></el-button>
    <span v-else class="countDown">{{ second }}s</span>
    <button class="btn-save" @click.prevent="onSubmitCode">保存</button>  
     
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data(){
    return{
      info:{
        phone:'',
        code:'',
      },
      second: 60,
    }
  },
  watch: {},
  computed: {},
  methods: {
    pageLoad() {},
    //保存绑定
    onSubmitCode() {
      this.info.token = window.$token;
      this.$api.auth.uploadCustomerMobile(this.info).then(() => {
        clearTimeout(this.timer);
        this.second = 60;
        this.info = {};
        this.$dialog.toast('手机号修改成功!');
      });
    },
    // 发送验证码
    sendPwdMsg() {
      if (!String.isMobile(this.info.phone)) {
        this.$dialog.toast('请输入正确的手机号');
        return;
      }
      this.$api.auth.sendPwdMsg({phone: this.info.phone}).then(() => {
        this.countDown();
        console.log();
      });
    },
    // 倒计时
    countDown() {
      this.timer = setInterval(() => {
        if (this.second <= 0) {
          clearInterval(this.timer);
          this.second = 60;
        } else {
          this.second--;
        }
      }, 1000);
    },
  },
  mounted() {},
  created() {},
}
</script>
<style lang="less" scoped>
.phone{
  margin-top: 43px;
  position: relative;
  .btn-send{
    position: absolute;
    width: 118px;
    height: 32px;
    border: 1px solid #037aff;
    color: #037aff;
    background: #fff;
    left: 404px;
    top: 2px;
    padding:0;
    margin:0;
    &:hover{
      opacity: 0.8;
    }
    &:active{
      opacity: 1;
    }
  }
  .countDown{
    position: absolute;
    width:100px;
    height: 32px;
    left: 400px;
    top: 10px;
    color: #f11321;
  }
  .btn-save{
    margin-top: 50px;
    width: 119px;
    height: 32px;
    color: #fff;
    background: #037AFF;
    font-size: 14px;
    border-radius: 4px;
    margin-left: 178px;
    cursor: pointer;
    &:hover{
      opacity: 0.8;
    }
    &:active{
      opacity: 1;
    }
  }
}
</style>
<style lang="less">
.phone-form{
  .el-form-item__label{
    width: 100px !important;
    text-align: left;
  }
}
</style>