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
              goOrderdetail(orderList.orderSn, { label: 'exhibitiondetail' })
            "
          >
            <div class="order-id">
              <span>订单号：</span>{{ orderList.orderSn }}
            </div>
            <div class="time">
              <span>下单时间：</span>{{ orderList.orderTime }}
            </div>
            <div class="status" :style="stateColor(orderList.orderStatus)">
              {{ getStatus(orderList.orderStatus) }}
            </div>
            <div class="exhibition flex">
              <div class="image">
                <img
                  :src="orderList.exhibitionUrl"
                  :alt="orderList.exhibitionName"
                />
              </div>
              <div class="msg">
                <div class="title">{{ orderList.exhibitionName }}</div>
                <div>
                  <svg-icon
                    icon-class="time"
                    class-name="icon"
                    style="color: #999990; margin-right: 10px"
                  ></svg-icon
                  >{{ orderList.exhibitionTime }}
                  <!-- <span style="margin-left: 10px"
                    >开放时间：{{ orderList.openTime }}</span
                  > -->
                </div>
                <div class="site">
                  <i
                    class="el-icon-location"
                    style="color: #999990; margin-right: 10px"
                  ></i>
                  举办地点：{{ orderList.cityName }} -
                  {{ orderList.exhibitionHallName }}
                </div>
                <div class="flex">
                  <div class="area">
                    展会面积：{{ orderList.exhibitionArea }}{{ orderList.unit }}
                  </div>
                  <div class="price">
                    ￥<span>{{ orderList.exhibitionPrice.split('.')[0] }}</span>.<span style="font-size:10px">{{ orderList.exhibitionPrice.split('.')[1] }}</span>
                  </div>
                </div>
              </div>
              <button v-if="orderList.orderStatus == 0" class="btn-pay" @click="onPay(orderList)">去支付</button>
            </div>
            <hr class="divider" />
          </li>
        </ul>
      </div>
    </div>
    <el-pagination
      class="pagination order-pagination"
      popper-class="select-order"
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
      activeIndex: "5",
      navList: [
        {
          name: "全部",
          type: "5",
        },
        {
          name: "待支付",
          type: "0",
        },
        {
          name: "已支付",
          type: "1",
        },
        {
          name: "确认支付",
          type: "4",
        },
        {
          name: "已完成",
          type: "2",
        },
        {
          name: "无效",
          type: "3",
        },
      ],
      //订单列表
      orderLists: [
        {
          orderSn: "11111111111",
          orderTime: "2021-05-31 10:00:00",
          orderStatus: 0, //0:待支付，1:已支付，2:已完成,3:无效,4:确认支付
          exhibitionUrl:
            "https://images.pexels.com/photos/714258/pexels-photo-714258.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          exhibitionName: "福州国际渔业展览会Fisheries Expo",
          exhibitionTime: "2021-06-03~2021-06-06",
          // openTime: "09:00-18:00",
          cityName: "福建",
          exhibitionHallName: "福州海峡国际会展中心",
          exhibitionArea:'50',
          unit:'/平米',
          exhibitionPrice: "10000",
          linkMan: "李三三",
          linkMobile: "13523456789",
          companyName: "深圳市哞哞科技有限公司",
          email: "shenzhen@163.com",
          remark:
            "队头看持公素每些身或用格科特却往布题经统关级满成马万世达亲何高与准完安改状结增影最前间片农研资时价。素段况委家期照要走各直海了听思学展火算车任山表引正识保者先领的真用况高平装每二中计标型族众温种飞同说此生话象约教区。",
        },
        {
          orderSn: "2222222222",
          orderTime: "2021-06-01 10:00:00",
          orderStatus: 1,
          exhibitionUrl:
            "https://images.pexels.com/photos/714258/pexels-photo-714258.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          exhibitionName: "福州国际渔业展览会Fisheries Expo",
          exhibitionTime: "2021-06-03~2021-06-06",
          // openTime: "09:00-18:00",
          cityName: "福建",
          exhibitionHallName: "福州海峡国际会展中心",
         
          exhibitionPrice: "10000",
          linkMan: "李三三",
          linkMobile: "13523456789",
          companyName: "深圳市哞哞科技有限公司",
          email: "shenzhen@163.com",
          remark:
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
        console.log("dateRange", val);
        this.dateOrderLists = this.orderLists;
      },
      immediate: true,
    },
  },
  computed: {
    //最终的筛选订单列表
    resOrderLists() {
      if (this.activeIndex == "5") {
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
      this.getExhibitionOrders();
    },
    getExhibitionOrders() {
      this.orderLists = [];
      for (let i = 0; i < 5; i++) {
        this.$api.exhibitionOrder
          .getExhibitionOrders({
            limit: "100",
            page: "1",
            token: window.$token,
            orderStatus: i,
          })
          .then((res) => {
            this.orderLists.push.apply(this.orderLists, res.result);
          });
      }
      console.log("orderlist", this.orderLists);
    },
     //跳转到订单详情
    goOrderdetail(orderSn, name) {
      let orderList = {};
      this.$api.exhibitionOrder.getExhibitionOrderByCode({ orderSn: orderSn, token: window.$token })
      .then((res) => {
        orderList = res || {};
        let valList = [orderList, name];
        this.$emit("go-detail", valList);
      });
    },
    onPay(orderList) {
      this.navigateTo(
        `/pay?orderSn=${orderList.orderSn}&orderPrice=${orderList.exhibitionPrice}&name=${orderList.exhibitionName}`
      );
    },
    handleSelect(key) {
      this.activeIndex = key;
      console.log("activeIndex:", key);
    },
    getStatus(status) {
      if (status === 0) {
        return "待支付";
      } else if (status === 1) {
        return "已支付";
      } else if (status === 2) {
        return "已完成";
      } else if (status === 3) {
        return "无效";
      } else {
        return "确认支付";
      }
    },
    stateColor(orderStatus) {
      if (orderStatus === 0) {
        return "color: #e11321";
      } else if (orderStatus === 1) {
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
      if (this.dateRange) {
        this.dateOrderLists = this.orderLists.filter(
          (item) =>
            Date.parse(item.orderTime.split(" ")[0]) >=
              Date.parse(this.dateRange[0]) &&
            Date.parse(item.orderTime.split(" ")[0]) <=
              Date.parse(this.dateRange[1])
        );
      }
    },
  },
  mounted() {},
  created() {
    this.dateOrderLists = this.orderLists;
  },
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
      border-bottom-color: #ccc;
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
          .status {
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
            margin-top: 10px;
            width: 350px;
            .title {
              font: 500 16px SourceHanSansCN-Medium;
              line-height: 16px;
              margin-bottom: 20px;
              color: #333;
              &:hover {
                color: #e11321;
              }
            }
            .site {
              margin: 8px 0 15px 0;
              color: #999;
            }
            .area {
              line-height: 30px;
            }
            .price {
              margin-left: 120px;
              color: #e11321;
              span {
                font: 500 20px SourceHanSansCN-Medium;
              }
            }
          }
          .btn-pay {
            background: #e11321;
            border-radius: 4px;
            margin-left: 350px;
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
          .divider {
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