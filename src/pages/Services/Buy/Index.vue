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
            <el-image
              fit="cover"
              style="width: 336px;height: 210px"
              :src="detailData.serviceUrl"
            />
          </div>
          <div class="info">
            <div class="title">{{ detailData.serviceTitle }}</div>
            <div class="desc">
              {{ detailData.serviceDescribe }}
            </div>
            <div class="oper">
              <div class="price">¥ {{ detailData.servicePrice }}</div>
              <div class="summary">
                <div class="li">
                  <div class="dt">选择规格</div>
                  <div class="dd">
                    <div class="sku">
                      <div
                        :class="['item', item.id === selectSpecification.id ? 'active' : '']"
                        v-for="item in detailData.specificationVos"
                        :key="item.id"
                        @click="onCheckSpecification(item)"
                      ><span v-for="(type,index) in item.specificationName" :key="index">
                        {{ type }}
                      </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="li">
                  <div class="dt">选择数量</div>
                  <div class="dd">
                    <el-input-number
                      v-model="detailData.serviceNum"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                    ></el-input-number>
                  </div>
                </div>
                <div class="li">
                  <div class="dt">备注</div>
                  <div class="dd">
                    <el-input type="textarea" :rows="7" v-model="form.orderRemarks"></el-input>
                  </div>
                </div>
              </div>
              <div class="buy" @click="onBuy">立即购买</div>
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
      detailData: {},
      selectSpecification: {},
      form: {
        companyName: '',
        linkMail: '',
        linkMan: '',
        linkMobile: '',
        orderRemarks: '',
        servicesList: [
          {
            isShopCard: 0,
            number: '',
            price: '',
            serviceId: '',
            specificationsId: '',
          },
        ],
      },
    };
  },
  methods: {
    pageLoad({serviceId}) {
      this.serviceId = serviceId;
      this.getServiceInfo();
    },
    handleChange(idx) {
      console.log(idx);
    },
    // 服务详情
    getServiceInfo() {
      this.$api.service.getServiceInfo({serviceId: this.serviceId}).then((res) => {
        this.detailData = res || {};
        const filterItem = res.specificationVos.filter((item) => item.specificationType === 1);
        this.selectSpecification = filterItem[0];
      });
    },
    // 选择规格
    onCheckSpecification(item) {
      this.selectSpecification = item;
    },
    // 购买下单
    onBuy() {
      const {id} = this.selectSpecification;
      this.form.servicesList = [
        {
          isShopCard: 0,
          number: this.detailData.serviceNum,
          price: this.detailData.servicePrice,
          serviceId: this.detailData.serviceId,
          specificationsId: id,
        },
      ];
      this.$api.serviceOrder.makeSureOrder(this.form).then((res) => {
        this.navigateTo(
          `/pay?orderSn=${res.orderSn}&orderPrice=${res.orderPrice}&name=${res.name}`
        );
      });
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
      background: #fff;
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
          padding: 14px 0;
          flex: 1;
          color: #666;
          font-size: 16px;
        }
        .oper {
          .price {
            font-size: 24px;
            color: #333;
            font-weight: bold;
          }
          .summary {
            padding-top: 20px;
            .li {
              display: flex;
              margin-bottom: 10px;
              .dt {
                width: 90px;
                color: #999;
                line-height: 40px;
                font-size: 14px;
              }
              .dd {
                width: 750px;
                .sku {
                  display: flex;
                  .item {
                    margin-right: 10px;
                    height: 40px;
                    padding: 0 20px;
                    line-height: 40px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 14px;
                    color: #333;
                    text-align: center;
                    cursor: pointer;
                  }
                  .active {
                    background: #e11321;
                    color: #fff;
                  }
                }
              }
            }
          }
          .buy {
            margin-top: 50px;
            width: 128px;
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
  }
}
</style>
