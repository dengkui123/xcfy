<template>
  <div class="container">
    <div class="login">
      <div class="login-header">
        <div class="w"><router-link to="/" class="logo"></router-link></div>
      </div>
      <div class="login-main content-between">
        <div class="content content-between">
          <div class="idea">
            <p class="h1">提供全产业的展位及软件服务</p>
            <p class="h4">搭建一个信息交易的桥梁</p>
          </div>
          <div class="box">
            <el-tabs class="login-tabs" stretch v-model="activeName" @tab-click="handleClick">
              <el-tab-pane
                :label="item.label"
                :name="item.name"
                v-for="item in tabs"
                :key="item.id"
              >
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
                    <el-button class="button" type="danger" @click="onSubmitCode">登录</el-button>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <div class="login-footer">
        <div>
          <p>致力于服务广大的中小企业，让参展就像旅行，做展览行业的最佳SAAS服务商</p>
          <p>版权所有©小草发芽展览科技（深圳）有限公司 ICP备案号：粤ICP备15072167号-12020</p>
        </div>
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
      activeName: '1',
      qrData: {},
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
          label: '微信登录',
        },
        {
          name: '2',
          label: '手机登录',
        },
      ],
    };
  },

  computed: {
    codeDisabled() {
      return this.second < 60;
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    pageLoad() {
      this.getLoginQr();
    },
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
        // 请完善个人信息，完成注册
        if (res.code == '10301') {
          this.refreshPhone(res.phone);
          this.navigateTo('/register');
          return;
        }
        // 登录成功
        if (res.code === 100200) {
          this.refreshPhone(res.phone);
          this.refreshToken(res.data);
          this.refreshHasLogin(true);
          this.refreshOpenId(res.openid);
          this.getUserInfo();
          this.navigateTo('/');
          return;
        }
        this.$dialog.toast(res.msg);
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
  },
};
</script>
<style lang="less" scoped>
.login {
  &-header {
    height: 120px;
    .logo {
      margin-top: 20px;
      display: inline-block;
      width: 156px;
      height: 80px;
      margin-right: 56px;
      background: url('../../assets/images/logo.png') center no-repeat;
      -webkit-background-size: contain;
      background-size: contain;
      cursor: pointer;
    }
  }
  &-main {
    height: calc(100vh - 240px);
    min-height: 500px;
    background: url(../../assets/images/login_bg.png) no-repeat center center / cover;
    .content {
      width: 1200px;
      margin: auto;
      .idea {
        width: 600px;
        color: #fff;
        text-align: center;
        .h1 {
          font-size: 38px;
          font-weight: bold;
        }
        .h4 {
          margin-top: 18px;
          font-size: 30px;
        }
      }
      .box {
        width: 400px;
        height: 450px;
        background: #fff;
        border-radius: 16px;
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
          .form {
            padding: 50px 30px 0 30px;
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
        }
        .login-tabs {
          padding: 20px;
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
      }
    }
  }
  &-footer {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    text-align: center;
  }
}
</style>
