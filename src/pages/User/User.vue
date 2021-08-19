<template>
  <div class="container">
    <HeaderBar />
    <div class="main">
      <div class="w inner">
        <div class="user-menu">
          <user-menu :current="1" :list="userMenu" @on-click="onClickMenus" />
        </div>
        <keep-alive>
          <component
            :is="currentUserComponent"
            :order-list="orderList"
            @go-detail="goDetail"
            @back-exhibition="goBackExhi"
            @back-services="goBackServices"
          ></component>
        </keep-alive>
      </div>
    </div>
    <FooterBar />
  </div>
</template>

<script>
import UserPersonal from './UserPages/UserPersonal/index';
import UserExhibition from './UserPages/UserExhibition/UserExhibition';
import UserExhibitiondetail from './UserPages/UserExhibition/Detail/index';
import UserServises from './UserPages/UserServices/UserServices';
import UserServicesdetail from './UserPages/UserServices/Detail/index';
import UserRemind from './UserPages/UserRemind/index';
import UserSafe from './UserPages/UserSafe/UserSafe';
import UserRemindsetting from './UserPages/UserRemindsetting/index';

export default {
  components: {
    'user-personal': UserPersonal,
    'user-exhibition': UserExhibition,
    'user-exhibitiondetail': UserExhibitiondetail,
    'user-servises': UserServises,
    'user-servicesdetail': UserServicesdetail,
    'user-remind': UserRemind,
    'user-safe': UserSafe,
    'user-remindsetting': UserRemindsetting,
  },
  props: {},
  data() {
    return {
      activeMenu: {},
      userMenu: [
        {
          id: 1,
          name: '个人中心',
          label: 'personal',
        },
        {
          id: 2,
          name: '展会订单',
          label: 'exhibition',
        },
        {
          id: 3,
          name: '服务订单',
          label: 'servises',
        },
        {
          id: 4,
          name: '展会提醒',
          label: 'remind',
        },
        {
          id: 5,
          name: '账号安全',
          label: 'safe',
        },
        {
          id: 6,
          name: '订阅提醒设置',
          label: 'remindsetting',
        },
      ],
      //展会/服务订单详情信息
      orderList:'',
    };
  },
  watch: {
    userMenu: {
      handler(val) {
        console.log('val', val);
        this.activeMenu = val[0];
      },
      immediate: true,
    },
  },
  computed: {
    currentUserComponent() {
      return 'user-' + this.activeMenu.label;
    },
  },
  methods: {
    onClickMenus(item) {
      this.activeMenu = item;
      console.log(item);
    },
    goDetail(valList) {
      console.log('valList:',valList);
      this.orderList = valList[0];
      this.activeMenu = '';
      this.activeMenu = valList[1];
    },
    goBackExhi() {
      this.activeMenu = this.userMenu[1];
    },
    goBackServices() {
      this.activeMenu = this.userMenu[2];
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  .inner {
    margin: 30px auto;
    display: flex;
    .content {
      flex: 1;
      background: #ffffff;
      box-shadow: 0px 0px 5px 0px rgba(152, 152, 152, 0.4);
    }
  }
}
</style>
