<template>
  <div class="container">
    <div class="w">
      <div class="header">
        <div class="pay-info">
          <div class="cash flex">
            <div class="logo"></div>
            <div class="cash-right">
              <div class="name">收银台</div>
              <div class="desc">您正在使用***网的担保交易，资金更安全</div>
            </div>
          </div>
          <div class="trade-name">交易名称：{{ info.name }}</div>
          <div class="order-id">交易号：{{ info.orderSn }}</div>
        </div>
        <div class="price">
          应付金额：<span>￥ {{ info.orderPrice }}</span>
        </div>
      </div>
      <div class="bank">
        <div class="bank-hd">
          <div class="tips">企业或个人银行转账支付<span>填写汇款识别码自动上账</span></div>
          <div class="code">汇款识别码：XZCY202105170001</div>
        </div>
        <div class="bank-bd">
          <div class="list flex flex-wrap">
            <div
              class="item"
              v-for="item in bankList"
              :key="item.bankId"
              @click="onCheckBank(item)"
            >
              <div :class="['icon', bankInfo.bankId === item.bankId ? 'active' : '']"></div>
              <div class="logo">
                <el-image style="width: 100px;height: 40px" :src="item.bankUrl" />
              </div>
              <div class="info">
                <div class="code">汇款识别码：XZCY202105170001<span class="copy">复制</span></div>
                <div class="account">银行账号：{{ item.bankAccount }}</div>
                <div class="name">开户名：{{ item.accountName }}</div>
                <div class="Deposit">开户行：{{ item.bankDeposit }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="h1">操作指引:</div>
        <p>
          1.将汇款识别码填至电汇凭证的<span class="span">【用途】、【附言】</span
          >栏内。注:不同银行的备注字段不同,最好是将所有的可填写的地方都写上汇款识别码;<span
            class="span"
            >点此查看填写示例>>
          </span>
        </p>
        <p>2请勿同时打开多个收银台页面以兔填错;</p>
        <div class="h1">友情提示:</div>
        <p>正确填写汇款识別码系统才能识別并自动上账,请按照订单金额正确填写,请勿多转账或少转账!</p>
      </div>
      <div class="submit" @click="onSubmit">确认提交</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      info: {},
      bankInfo: {},
      bankList: [],
    };
  },
  methods: {
    pageLoad(options) {
      this.info = options;
      this.getBankAccounts();
    },
    getBankAccounts() {
      this.$api.bankAccount.getBankAccounts().then((res) => {
        this.bankList = res;
        if (!Array.isEmpty(res)) {
          this.bankInfo = res[0];
        }
      });
    },
    // 确认支付
    onSubmit() {
      const {accountName, bankAccount, bankDeposit} = this.bankInfo;
      this.$api.serviceOrder
        .confirmPay({
          accountName,
          bankAccount,
          bankDeposit,
          orderSn: this.info.orderSn,
          token: window.$token,
        })
        .then((msg) => {
          this.$dialog.toast(msg);
        });
    },
    // 选中银行
    onCheckBank(bankInfo) {
      this.bankInfo = bankInfo;
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  padding-top: 140px;
  .header {
    padding-bottom: 38px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1px solid #cccccc;
    .pay-info {
      font-size: 14px;
      color: #666;
      .cash {
        padding-bottom: 16px;
        .logo {
          width: 45px;
          height: 45px;
        }
        .cash-right {
          margin-left: 20px;
          .name {
            font-size: 30px;
            font-weight: bold;
            color: #333;
          }
          .desc {
            margin-top: 14px;
          }
        }
      }
    }
    .price {
      font-size: 20px;
      span {
        color: #e11321;
      }
    }
  }
  .bank {
    margin-top: 40px;
    &-hd {
      .tips {
        color: #008be2;
        span {
          color: #ff9e3d;
        }
      }
      .code {
        margin-top: 12px;
        font-size: 20px;
        color: #e11321;
      }
    }
    &-bd {
      margin-top: 50px;
      .list {
        .item {
          display: flex;
          margin-top: 20px;
          &:nth-of-type(2n) {
            margin-left: 300px;
          }
          .icon {
            display: block;
            width: 20px;
            height: 20px;
            border: 2px solid #cccccc;
            border-radius: 50%;
            position: relative;
          }
          .active {
            &::before {
              content: '';
              position: absolute;
              left: 2px;
              top: 2px;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              font-size: 30px;
              background: #ccc;
            }
          }
          .logo {
            margin-left: 24px;
          }
          .info {
            margin-left: 15px;
            color: #666;
            font-size: 16px;
            .code {
              color: #e11321;
              .copy {
                display: inline-block;
                margin-left: 10px;
                width: 50px;
                height: 28px;
                background: #eeeeee;
                border-radius: 2px;
                color: #056684;
                font-size: 16px;
                text-align: center;
                line-height: 28px;
                cursor: pointer;
              }
            }
            div {
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
  .footer {
    margin-top: 50px;
    padding: 24px 50px 24px 24px;
    background: rgba(15, 107, 136, 0.1);
    color: #056684;
    .h1 {
      margin-top: 24px;
      font-size: 20px;
      font-weight: bold;
    }
    .span {
      color: #e11321;
    }
  }
  .submit {
    margin: 80px auto;
    width: 242px;
    height: 48px;
    background: #e11321;
    border-radius: 4px;
    line-height: 48px;
    text-align: center;
    font-size: 18px;
    color: #fff;
    cursor: pointer;
  }
}
</style>
