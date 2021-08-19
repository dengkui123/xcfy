<template>
  <div class="container">
    <HeaderBar />
    <div class="main">
      <div class="w">
        <div class="position">首页 > 展会服务 > 签证详情</div>
      </div>
      <div class="service-info">
        <div class="w flex">
          <div class="cover">
            <el-image fit="cover" style="width: 336px;height: 210px" :src="detailData.serviceUrl" />
          </div>
          <div class="info">
            <div class="title">{{ detailData.serviceTitle }}</div>
            <div class="desc">
              {{ detailData.serviceDescribe }}
            </div>
            <div class="oper">
              <div class="price">¥ {{ detailData.servicePrice }}</div>
              <div class="buy" @click="onBuy">立即购买</div>
            </div>
          </div>
        </div>
      </div>
      <div class="detail">
        <div class="w">
          <div class="content introduce">
            <div class="title">详情介绍</div>
            <div class="rich">
              {{ detailData.serviceDescribe }}
            </div>
          </div>
          <div class="content other">
            <!-- <div class="title">签证费 代办服务费 EVUS免费代注册</div> -->
            <div class="rich">
              <div v-html="detailData.serviceDesc"></div>
            </div>
          </div>
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
      serviceId: 0,
      detailData: {},
    };
  },
  methods: {
    pageLoad({serviceId}) {
      if (!this.$token) {
        this.navigateTo('/login');
        return;
      }
      this.serviceId = serviceId;
      this.getServiceInfo();
    },
    // 服务详情
    getServiceInfo() {
      this.$api.service.getServiceInfo({serviceId: this.serviceId}).then((res) => {
        this.detailData = res || {};
      });
    },
    onBuy() {
      this.navigateTo(`/services/buy?serviceId=${this.detailData.serviceId}`);
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  .main {
    .position {
      height: 70px;
      line-height: 70px;
      color: #666;
      font-size: 14px;
    }
    .service-info {
      padding: 35px 0 26px 0;
      background: #eaeaea;
      .cover {
        width: 336px;
        height: 210px;
      }
      .info {
        margin-left: 30px;
        padding: 10px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          color: #333;
          font-size: 30px;
        }
        .desc {
          padding: 20px 0;
          flex: 1;
          color: #666;
          font-size: 20px;
        }
        .oper {
          display: flex;
          align-items: center;
          .price {
            font-size: 24px;
            color: #333;
          }
          .buy {
            margin-left: 20px;
            width: 120px;
            height: 40px;
            background: #e11321;
            color: #fff;
            font-size: 16px;
            text-align: center;
            line-height: 40px;
            border-radius: 4px;
            font-weight: bold;
            cursor: pointer;
          }
        }
      }
    }
    .detail {
      padding: 18px 26px;
      .content {
        padding-bottom: 20px;
        .title {
          margin: 14px 0;
          color: #333;
          font-size: 16px;
          font-weight: bold;
        }
        .rich {
          font-size: 14px;
          color: #666;
        }
      }
      .introduce {
        border-bottom: 1px dashed #ccc;
      }
    }
  }
}
</style>
