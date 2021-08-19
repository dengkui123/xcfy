<template>
  <el-dialog :visible="visible" :show-close="false" width="488px">
    <div class="login" v-if="unbind">
      <el-tabs class="login-tabs" stretch v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabs" :key="item.id">
          <div class="login-centent">
            <!-- 扫码 -->
            <div class="scan content-center-column" v-if="activeName === '1'">
              <div class="qr"><el-image :src="qrData.qrcodeUrl" /></div>
              <div class="tips">请使用微信扫描二维码登录</div>
              <div class="follow">扫码并「关注我们的公众号」安全快捷登录</div>
            </div>
            <!-- 短信验证码 -->
            <div class="form" v-if="activeName === '2'">
              <el-input
                class="ipt"
                maxlength="11"
                v-model="formCode.phone"
                placeholder="请输入手机号码"
              ></el-input>
              <el-input class="ipt" v-model="formCode.code" placeholder="请输入验证码">
                <div
                  class="suffix"
                  slot="suffix"
                  :class="{codeDisabled: codeDisabled}"
                  @click="onSendMsg"
                >
                  <span v-if="second > 59 || second <= 0">发送验证码</span>
                  <span v-else>{{ second }}秒</span>
                </div>
              </el-input>
              <el-button class="button" type="danger" @click="onSubmitCode">登录 / 注册</el-button>
            </div>
            <!-- 账号登录 -->
            <div class="form" v-if="activeName === '3'">
              <el-input class="ipt" v-model="formPwd.phone" placeholder="请输入手机号码"></el-input>
              <el-input class="ipt" v-model="formPwd.pwd" placeholder="请输入密码"> </el-input>
              <el-button class="button" type="danger" @click="onSubmitPwd">登录</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="bind" v-else>
      <!-- 账号登录 -->
      <div class="form">
        <el-input class="ipt" v-model="formBind.phone" placeholder="请输入手机号码"></el-input>
        <div class="form-btn">
          <el-button class="button" type="danger" @click="onBindPhone">绑定</el-button>
        </div>
      </div>
    </div>
    <div class="close" @click="onClose">×</div>
  </el-dialog>
</template>

<script>
export default {
  name: 'loginDialog',
  props: {},
  data() {
    return {
      activeName: '1',
      visible: false,
      unbind: true,
      qrData: {},
      formBind: {
        phone: '',
      },
      formCode: {
        phone: '',
        code: '',
      },
      formPwd: {
        phone: '',
        pwd: '',
      },
      second: 60,
      tabs: [
        {
          name: '1',
          label: '扫码登录',
        },
        {
          name: '2',
          label: '短信验证码登录',
        },
      ],
    };
  },
  watch: {
    visible(bool) {
      if (!bool) {
        clearInterval(this.timer);
        return;
      }
      this.getLoginQr();
    },
  },
  computed: {
    codeDisabled() {
      return this.second < 60;
    },
  },
  methods: {
    // 短信验证码登录
    onSubmitCode() {
      if (!String.isMobile(this.formCode.phone)) {
        this.$dialog.toast('请输入正确的手机号');
        return;
      }
      if (String.isEmpty(this.formCode.code)) {
        this.$dialog.toast('请输入验证码');
        return;
      }
      this.$api.auth.phoneLogin(this.formCode).then((res) => {
        this.formatRes(res);
      });
    },
    // 登录结果
    formatRes(res) {
      this.$dialog.toast(res.msg);
      // 请完善个人信息，完成注册
      if (res.code == '10301') {
        this.refreshPhone(res.phone);
        this.navigateTo('/register');
        return;
      }
      // 登录成功
      if (res.code === 100200) {
        this.visible = false;
        this.refreshPhone(res.phone);
        this.refreshToken(res.data);
        this.refreshHasLogin(true);
        this.refreshOpenId(res.openid);
        this.getUserInfo();
        return;
      }
    },
    // 账号密码登录
    onSubmitPwd() {
      this.$api.auth.phoneLogin(this.formPwd).then((res) => {
        console.log(res);
      });
    },
    // 获取登录二维码
    getLoginQr() {
      this.$api.auth.getLoginQr().then((res) => {
        this.qrData = res;
        if (!res) return;
        this.timer = setInterval(() => {
          this.checkLogin();
        }, 3000);
      });
    },
    // 检查用户扫码登录
    checkLogin() {
      this.$api.auth.checkLogin({sceneStr: this.qrData.sceneStr}).then((res) => {
        console.log(res);
        if (res.code === 100200) {
          this.$dialog.toast(res.msg);
          this.formatRes(res);
        }
        if (res.code == 10290) {
          this.$dialog.toast(res.msg);
          this.unbind = false;
          clearInterval(this.timer);
          this.formBind.sceneStr = this.qrData.sceneStr;
        }
      });
    },
    // 绑定手机号
    onBindPhone() {
      if (!String.isMobile(this.formBind.phone)) {
        this.$dialog.toast('请输入正确的手机号');
        return;
      }
      this.$api.auth.bindMobile(this.formBind).then((res) => {
        this.formatRes(res);
      });
    },
    // 发送验证码
    onSendMsg() {
      if (!String.isMobile(this.formCode.phone)) {
        this.$dialog.toast('请输入正确的手机号');
        return;
      }
      this.$api.auth.sendMsg({phone: this.formCode.phone}).then(() => {
        this.countDown();
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
    handleClick({index}) {
      if (index === '0') {
        this.getLoginQr();
      }
      if (index === '1') {
        clearInterval(this.timer);
      }
    },
    show() {
      this.visible = true;
    },
    // 关闭
    onClose() {
      this.visible = false;
    },
  },
};
</script>
<style lang="less" scoped>
.login-centent {
  height: 353px;
  .scan {
    padding-top: 56px;
    font-size: 12px;
    .qr {
      height: 170px;
      width: 170px;
      border: 1px solid #e8e8e8;
    }
    .tips {
      margin-top: 6px;
      color: #666;
    }
    .follow {
      margin-top: 27px;
      color: #999;
    }
  }
}
.login-tabs {
  /deep/ .el-tabs__nav-wrap {
    .el-tabs__item {
      font-size: 20px;
      color: #666666;
    }
    .is-active {
      color: #f30213;
    }
    .el-tabs__active-bar {
      background-color: #f30213;
    }
    &::after {
      height: 1px;
      background-color: #ccc;
    }
  }
}
.form {
  padding: 50px 72px 0 72px;
  &-btn {
    margin-top: 20px;
  }
  .ipt {
    margin-bottom: 30px;
    /deep/ .el-input__inner {
      height: 48px;
      line-height: 48px;
    }
  }
  .suffix {
    width: 70px;
    text-align: center;
    height: 48px;
    line-height: 48px;
    color: #e58459;
    cursor: pointer;
  }
  .codeDisabled {
    pointer-events: none;
  }
  .button {
    margin-top: 10px;
    width: 100%;
  }
  /deep/ .el-button--danger {
    height: 48px;
    background: #f30213;
    font-size: 16px;
  }
}
.close {
  position: absolute;
  top: -18px;
  right: -18px;
  width: 42px;
  height: 42px;
  background: #999999;
  text-align: center;
  line-height: 46px;
  color: #fff;
  font-size: 22px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
