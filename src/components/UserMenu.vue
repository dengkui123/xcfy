<template>
  <div class="user-menu">
    <div class="user-info">
      <div class="pic">
        <img :src='userInfo.avatarUrl' alt="头像" style="width:48px;height:48px;" />
      </div>
      <div class="msg flex">
        <div class="name">{{userInfo.userName}}</div>
        <div class="sex">性别：{{sex}}</div>
      </div>
      <div class="company">{{userInfo.corporationName}} {{userInfo.position}}</div>
      <div class="title">
        <p class="cn">个人中心</p>
        <p class="en">Personal Center</p>
      </div>
    </div>  
    <div class="menus">
      <div 
        class="li"
        v-for="item in list"
        :key="item.id"
        :class="{active: item.id === activeId}"
        @click="onClick(item)"
      >
        <div>{{ item.name }}</div>
        <i style="color: #e11321;fontWeight: 800;" class="el-icon-d-arrow-right" v-show = "item.id === activeId"></i>
      </div>
      <div class="li" @click="logout()">注销登录</div>
    </div>     
    <div :class="[isCover?'popContainer':'hiddenContainer']">
      <div class="content-container">
        <button class="btn-close" @click="cancel">
          <i class="el-icon-close"></i>
        </button>
        <div class="box">
          <p class="title">退出确认</p>
          <hr class="hr">
          <p class="text">您确定要退出登录吗？</p>
          <button class="btn-1" @click="cancel">取消</button>
          <button class="btn-2" @click="onLoginOut">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserMenu',
  components: {},
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    current: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      activeId: 0,
      //遮罩层
      isCover:false,
      userInfo: {
      },
    };
  },
  watch: {
    current: {
      handler(val) {
        this.activeId = val;
      },
      immediate:true,
    },
  },
  computed: {
    sex(){
      if(this.userInfo.sex == 0){
        return '保密'
      }else if(this.userInfo.sex == 1){
        return '男'
      }
      return '女'
    }
  },
  methods: {
    pageLoad() {
      this.getPersonalData();
    },
    //获取用户资料
    getPersonalData() {
      this.$api.personalCenter.getPersonalData().then((res) => {
        this.userInfo = res;
      });
    },
    onClick(item) {
      this.activeId = item.id;
      this.$emit('on-click', item);
      console.log(this.userInfo);
    },
    logout(){
      this.isCover = true;
    },
    //取消退出
    cancel(){
      this.isCover = false;
      console.log('取消');
    },
    onLoginOut() {
      this.$api.auth.loginOut().then(() => {
        this.refreshToken('');
        this.refreshHasLogin(false);
        this.navigateTo('/');
        window.location.reload();
      });
    },
    //   this.$router.push({
    //     path:'/',
    //   })
    // }
  },
  created() {},
  mounted() {}, 
};
</script>

<style lang="less" scoped>
.user-menu{
  height: 647px;
  width: 367px;
  box-shadow: 0px 0px 5px 0px rgba(152, 152, 152, 0.4);
  background: #ffffff;
  margin-right: 20px;
  .user-info{
    color: #333333;
    text-align: center;
    line-height:16px;
    .pic{
      padding: 47px 0 18px;
      img{
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .msg{
      justify-content: center;
      align-items: baseline;
      margin-bottom: 9px;
      .name{
        font: 16px SourceHanSansCN-Medium;
        margin-right: 20px;
      }
      .sex{
        color: #999999;
        font: 14px SourceHanSansCN;
      }
    }
    .company{
      color: #333333;
      font-size: 16px;
      margin-bottom:40px;
      
    }
    .title{
      .cn{
        font: 400 20px SourceHanSansCN; 
        color: #F30213;
        margin-bottom:9px;
        line-height:20px;
      }
      .en{
        font: 14px SourceHanSansCN;
        color: #999999;
        margin-bottom:45px;
      }
    }
  }
  .menus{
    flex:1;
    background: #ffffff;
    .li{
      text-align: center;
      height: 50px;
      line-height:50px;
      cursor: pointer;
      color: #999999;
      font-size: 16px;
      position: relative;
      .el-icon-d-arrow-right{
        position:absolute;
        right:80px;
        top:18px;
        bottom:18px;
      } 
    }
    .active {
      box-shadow: 0px 0px 5px 0px rgba(152, 152, 152, 0.4);
      color:#f30213;
    }
  }
  .popContainer{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0,0,0,0.3);
    .content-container{
      z-index:998;
      position:absolute;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
      .btn-close{
        top:-21px;
        right:-21px;
        z-index:1000;
        position:absolute;
        border-radius: 50%;
        width:42px;
        height:42px;
        background: #666;
        color:#fff;
        cursor: pointer;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        &:hover{
          color:#e11321;
        }
      }
      .box{
        margin:auto;
        height: 426px; 
        width: 488px;
        background: #fff;
        overflow: auto;
        position: relative;
        .title{
          margin: 42.5px 0 8px 21px;
          color: #333;
          font-size: 20px;
        }
        .hr{
          border: 1px solid rgba(204, 204, 204, 0.5);
          border-bottom: none;
        }
        .text{
          margin:100px 163px 86px 163px;
          font-size: 16px;
          color: #666;
        }
        .btn-1{
          width: 97px;
          height: 34px;
          background: rgba(3, 122, 255);
          color: #fff;
          font-size: 12px;
          cursor: pointer;
          border-radius: 4px;
          margin:0 33px 0 130px;
          &:hover{
            opacity: 0.8;
          }
          &:active{
            opacity: 1;
          }
        }
        .btn-2{
          width: 97px;
          height: 34px;
          background: rgba(3, 122, 255, 0.2);
          color: #037aff;
          font-size: 12px;
          cursor: pointer;
          border-radius: 4px;
          margin-right:130px;
          &:hover{
            opacity: 0.8;
          }
          &:active{
            opacity: 1;
          }
        }
      }
    }
  }
  .hiddenContainer{
    display:none;
  }

}
</style>