<template>
  <div class="content">
    <el-form class="form-style">
      <el-form-item label="下单时间">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          size="small"
          style="width: 300px"
          start-placeholder="请选择开始时间"
          end-placeholder="请选择结束时间"
          range-separator="-"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
        <button class="btn-search" @click.prevent="btnSearch">搜索</button>
      </el-form-item>
    </el-form>
    <div class="order">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-order"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item
          v-for="(item, index) in navList"
          :key="index"
          :index="item.type"
          >{{ item.name }}
        </el-menu-item>
      </el-menu>
      <div class="order-list">
        <ul class="ul">
          <li
            class="li"
            v-for="(orderList, index) in resOrderLists.slice(
              (currentpage - 1) * pagesize,
              currentpage * pagesize
            )"
            :key="index"
            @click="
              goOrderdetail(orderList.orderSn, { label: 'servicesdetail' })
            "
          >
            <div class="order-id">
              <span>订单号：</span>{{ orderList.orderSn }}
            </div>
            <div class="time">
              <span>下单时间：</span>{{ orderList.orderTime }}
            </div>
            <div class="orderStatus" :style="stateColor(orderList.orderStatus)">
              {{ getStatus(orderList.orderStatus) }}
            </div>
            <div class="exhibition flex">
              <div class="image">
                <img
                  :src="orderList.ordersGoodsVos[0].serviceUrl"
                  :alt="orderList.serviceName"
                />
              </div>
              <div class="msg">
                <div class="title">
                  {{ orderList.ordersGoodsVos[0].serviceName }}
                </div>
                <div class="service-describe">
                  描述：{{ orderList.ordersGoodsVos[0].serviceDescribe }}
                </div>
                <div class="sp">
                  规格：{{ orderList.ordersGoodsVos[0].specificationName }}
                </div>
                <div class="flex">
                  <div class="num">
                    数量：{{ orderList.ordersGoodsVos[0].servicesNum }}
                  </div>
                  <div class="price">
                    ￥<span>{{
                      orderList.ordersGoodsVos[0].servicePrice
                    }}</span>
                  </div>
                </div>
              </div>
              <button v-if="orderList.orderStatus == 1" class="btn-pay" @click="onPay(orderList)" >去支付</button>
            </div>
            <hr class="hr" />
          </li>
        </ul>
      </div>
    </div>
    <el-pagination
      class="pagination"
      background
      @size-change="handleSizeChange"
      :page-sizes="[1, 3, 5, 7, 9]"
      :page-size="pagesize"
      :current-page.sync="currentpage"
      layout="sizes, prev, pager, next"
      :total="resOrderLists.length"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "UserExhibition",
  components: {},
  props: {},
  data() {
    return {
      //筛选时间段
      dateRange: [],
      //时间段筛选后的订单列表
      dateOrderLists: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      activeIndex: "4",
      navList: [
        {
          name: "全部",
          type: "4",
        },
        {
          name: "待付款",
          type: "1",
        },
        {
          name: "待处理",
          type: "2",
        },
        {
          name: "已完成",
          type: "3",
        },
        {
          name: "系统取消",
          type: "0",
        },
      ],
      //订单列表
      orderLists: [
        {
          orderSn: "11111111111",
          orderTime: "2021-05-31 10:00:00",
          orderStatus: 0,
          ordersGoodsVos: [
            {
              serviceId: 0,
              serviceUrl:
                "https://images.pexels.com/photos/714258/pexels-photo-714258.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              serviceDescribe: "费用包含：签证费，表格填写，资料审核",
              serviceName: "美国商务签证",
              specificationName: "xxx",
              servicesNum: 1,
              servicePrice: 10000,
            },
          ],
          linkMan: "李三三",
          linkMobile: "13523456789",
          companyName: "深圳市哞哞科技有限公司",
          email: "shenzhen@163.com",
          remarks:
            "队头看持公素每些身或用格科特却往布题经统关级满成马万世达亲何高与准完安改状结增影最前间片农研资时价。素段况委家期照要走各直海了听思学展火算车任山表引正识保者先领的真用况高平装每二中计标型族众温种飞同说此生话象约教区。",
        },
      ],
      currentpage: 1,
      pagesize: 3,
    };
  },
  watch: {
    dateRange: {
      handler(val) {
        console.log("val", val);
        this.dateOrderLists = this.orderLists;
      },
      immediate: true,
    },
  },
  computed: {
    //最终的筛选订单列表
    resOrderLists() {
      if (this.activeIndex == "4") {
        return this.dateOrderLists;
      } else {
        
        return this.dateOrderLists.filter(
          (item) => item.orderStatus == this.activeIndex
        );
      }
    },
  },
  methods: {
    pageLoad() {
      this.getServiceOrders();
    },
    getServiceOrders() {
      this.orderLists = [];
      for (let i = 0; i < 4; i++) {
        this.$api.serviceOrder.getServiceOrders({
          limit: "100",
          page: "1",
          token: window.$token,
          orderStatus: i,
        })
        .then((res) => {
          this.orderLists.push.apply(this.orderLists, res.result);
        });
      }
      this.dateOrderLists = this.orderLists;
      console.log("orderservice list", this.dateOrderLists);
    },
    onPay(orderList) {
      this.navigateTo(
          `/pay?orderSn=${orderList.orderSn}&orderPrice=${orderList.orderPrice}&name=${orderList.ordersGoodsVos[0].serviceName}`
        );
    },
    goOrderdetail(orderSn, name) {
      let orderObj = {};
      this.$api.serviceOrder
        .getServiceOrderByCode({ orderSn: orderSn, token: window.$token })
        .then((res) => {
          orderObj = res || {};
          console.log(orderObj);
          let valList = [orderObj, name];
          this.$emit("go-detail", valList);
        });
    },
    handleSelect(key) {
      this.activeIndex = key;
      console.log("activeIndex:", key);
    },
    getStatus(status) {
      if (status === '1') {
        return "待付款";
      } else if (status === '2') {
        return "待处理";
      } else if (status === '3') {
        return "已完成";
      } else {
        return "系统取消";
      }
    },
    stateColor(status) {
      if (status === '1') {
        return "color: #e11321";
      } else if (status === '2') {
        return "color: #0b8b1a";
      } else {
        return "color: #999";
      }
    },
    handleSizeChange(val) {
      this.pagesize = parseInt(`${val}`);
    },
    btnSearch() {
      //时间段筛选
      if (this.dateRange != null && this.dateRange != "") {
        // console.log((Date.parse(this.dateRange[0])>=Date.parse(this.resOrderLists[0].orderTime.split(" ")[0])));
        this.dateOrderLists = this.orderLists.filter(
          item =>
            Date.parse(item.orderTime.split(" ")[0]) >= Date.parse(this.dateRange[0]) &&
            Date.parse(item.orderTime.split(" ")[0]) <= Date.parse(this.dateRange[1])
        );
      }
    },
  },
  mounted() {},
  created() {},
};
</script>

<style lang="less" scoped>
.content {
  padding: 40px;
  .btn-search {
    height: 32px;
    width: 70px;
    line-height: 32px;
    margin-left: 20px;
    border-radius: 2px;
    color: #fff;
    background: #037aff;
    cursor: pointer;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 1;
    }
  }
  .order {
    .el-menu-order {
      border-bottom-color: #cccccc;
      .el-menu-item {
        height: 50px;
        margin-right: 50px;
        color: #666666;
      }
      .el-menu-item.is-active {
        font-family: SourceHanSansCN-Medium;
        border-bottom: 2px solid #e11321;
        color: #333333;
      }
    }
    &-list {
      font-size: 14px;
      margin-top: 30px;
      color: #666;
      .ul {
        .li {
          position: relative;
          cursor: pointer;
          .orderStatus {
            position: absolute;
            top: 0;
            right: 0;
            color: #e11321;
          }
          .image {
            margin: 5px 26px 0 0;
            overflow: hidden;
            img {
              border: 1px solid rgba(204, 204, 204, 0.4);
              width: 227px;
              height: 140px;
              object-fit: cover;
            }
          }
          .msg {
            margin-top: 5px;
            width: 530px;
            .title {
              font: 500 16px SourceHanSansCN-Medium;
              color: #333;
              margin-bottom: 10px;
              &:hover {
                color: #e11321;
              }
            }
            .service-describe {
              font: 14px SourceHanSansCN;
              line-height: 16px;
              height: 35px;
              color: #666;
            }
            .sp {
              margin-bottom: 15px;
            }
            .num {
              line-height: 30px;
            }
            .price {
              margin-left: 100px;
              color: #e11321;
              span {
                font: 500 20px SourceHanSansCN-Medium;
              }
            }
          }
          .btn-pay {
            background: #e11321;
            border-radius: 4px;
            margin-left: 100px;
            margin-top: 110px;
            color: #ffffff;
            width: 86px;
            height: 36px;
            font-size: 14px;
            cursor: pointer;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
            &:hover {
              opacity: 0.8;
            }
            &:active {
              opacity: 1;
            }
          }
          .hr {
            margin: 30px 0;
            border: 1px dashed #cccccc;
            border-bottom: none;
          }
        }
      }
    }
  }
  .pagination {
    text-align: center;
    margin-right: 100px;
  }
}
</style>