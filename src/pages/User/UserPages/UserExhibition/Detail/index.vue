<template>
  <div class="content">
    <div>
      <button 
      class="btn-back" 
      @click="backToUserExhi">
      <i class="el-icon-arrow-left" style="font-weight:800"></i> 返回上一页
      </button>
    </div>
    <div class="exhi-info flex">
      <div class="image">
        <img :src="orderList.exhibitionUrl" :alt="orderList.exhibitionName">
      </div>
      <div class="msg">
        <div class="title">{{orderList.exhibitionName }}</div>
        <div>
          <svg-icon 
            icon-class="time" 
            class-name="icon" 
            style="color:#999990;margin-right:10px"
          ></svg-icon>
          {{orderList.exhibitionTime }}
          <!-- <span style="margin-left: 10px;">开放时间：{{orderList.openTime }}</span> -->
        </div>
        <div class="site">
          <i class="el-icon-location" style="color:#999990;margin-right:10px"></i>
          举办地点：{{orderList.cityName}} - {{orderList.exhibitionHallName }}
        </div>
        <div class="flex">
          <div class="area">展会面积：{{orderList.exhibitionArea }}<span>{{ orderList.unit }}</span></div>
          <div class="price"><span>{{orderList.exhibitionPrice }}</span></div>
        </div>
      </div>
    </div>
    <div class="main-info">
      <div class="order-info">
        <div class="title">订单信息</div>
        <hr class="hr">
        <p class="state">订单状态：<span :style="stateColor(orderList.orderStatus)">{{ getStatus(orderList.orderStatus) }}</span></p>
        <p class="order-id">订单号：{{ orderList.orderSn }}</p>
        <p class="orderTime">下单时间：{{ orderList.orderTime }}</p>
         <button v-if="orderList.orderStatus == 0" class="btn-pay" @click="onPay(orderList)">去支付</button>
      </div>
      <div class="personal-info">
        <div class="title">联系人信息</div>
        <hr class="hr">
        <p class="contact">联系人：{{ orderList.linkMan }}</p>
        <p class="tel">联系电话：{{ orderList.linkMobile }}</p>
        <p class="company">公司名称：{{ orderList.companyName }}</p>
        <!-- <p class="orderEmail">电子邮箱：{{ orderList.email }}</p> -->
      </div>
      <div class="remarks">
        <div class="title">备注信息</div>
        <hr class="hr">
        <div class="remarks-content">{{orderList.remark }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserExhibitiondetail',
  components:{},
  props: {
   orderList: {
    },
  },
  data(){
    return{
    }
  },
  watch: {},
  computed: {},
  methods: {
    onPay(orderList) {
      this.navigateTo(
        `/pay?orderSn=${orderList.orderSn}&orderPrice=${orderList.exhibitionPrice}&name=${orderList.exhibitionName}`
      );
    },
    getStatus(status) {
      if (status === 0) {
        return '待支付'
      }else if(status === 1) {
        return '已支付'
      }else if(status === 2) {
        return '已完成'
      }else if(status === 3) {
        return '无效'
      }else {
        return '确认支付'
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
    backToUserExhi(){
      this.$emit('back-exhibition');
    },
  },
  mounted() {},
  created() {
  },
}
</script>

<style lang="less" scoped>
.content{
  padding: 20px 26px;
  font-size: 14px;
  line-height: 14px;
  color: #666;
  .btn-back{
    font-size: 14px;
    background: #fff;
    margin-bottom: 10px;
    color: #666;
    cursor: pointer;
    line-height:40px;
    &:hover{
      color: #e11321;
      transition: color 0.15s ease-in-out;
    }
  }
  .exhi-info{
    background: #f9f9f9;
    padding:20px;
    .image{      
      margin: 5px 26px 0 0;       
      overflow:hidden;         
      img{
        border: 1px solid rgba(204, 204, 204, 0.4);
        width: 227px;
        height: 140px;
        object-fit:cover;
      }
    }
    .msg{
      margin-top: 10px;
      .title{
        font: 500 16px SourceHanSansCN-Medium;
        line-height: 16px;
        margin-bottom: 20px;
        color: #333; 
        &:hover{
          color: #e11321;
        }
      }
      .site{
        margin:8px 0 15px 0;
        color: #999;
        
      }
      .area{
        line-height: 30px;
      }
      .price{
        margin-left: 100px;
        color: #e11321;
        span{
          font:500 20px SourceHanSansCN-Medium;
        }
      }
    }
  }
  .main-info{
    margin-left:19px;
    .title{ 
      font-family: SourceHanSansCN-Medium;
      margin: 40px 0 10px;
      color: #333;
    }
    .hr{
      border: 1px dashed #ccc;
      border-bottom: none;
    }
    .order-info{
      position: relative;
      .state{
        margin-top: 19px;
      }
      .order-id{
        margin: 16px 0;
      }
      .btn-pay {
        right:20px;
        bottom:-30px;
        position: absolute;
        background: #e11321;
        border-radius: 4px;
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
    }
    .personal-info{
      .contact{
        margin-top: 19px;
      }
      .tel,
      .company, 
      .orderEmail{
        margin-top: 16px;
      }
    }
    .remarks{
      margin-bottom: 20px;
      &-content{
        margin-top: 15px;
        line-height: 24px;
      }
    }
  }
}
</style>