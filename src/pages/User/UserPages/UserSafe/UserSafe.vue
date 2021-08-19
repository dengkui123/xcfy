<template>
  <div class="content">
    <FollowMenu />
    <el-menu 
      :default-active="activeIndex" 
      class="el-menu-order" 
      mode="horizontal" 
      @select="handleSelect" 
      >
      <el-menu-item 
        v-for="item in navList" 
        :key="item.type" 
        :index="item.type" 
        >{{item.name}}
      </el-menu-item>
    </el-menu>
    <keep-alive>
      <components :is='currentComponent'></components>
    </keep-alive>
    
  </div>
</template>

<script>
import Wechat from './Wechat/index'
import Tel from './Tel/index'
export default {
  name: 'UserSafe',
  components: {
    'safe-wechat': Wechat,
    'safe-tel': Tel
  },
  props: {},
  data(){
    return{
      activeIndex:"1",
      navList:[
      {
        name: '修改绑定微信',
        label: 'wechat',
        type: '1'
      },
      {
        name: '修改手机号码',
        label: 'tel',
        type: '2'
      },
      ],
    }
  },
  watch: {
    
  },
  computed: {
    currentComponent(){
      let currentTab = this.navList.filter(item => item.type == this.activeIndex)[0].label;
      console.log(currentTab);
      return "safe-" +  currentTab;
    },
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key;
      console.log('activeIndex:',key);
    },
  },
  mounted() {},
  created() {},
}
</script>

<style lang="less" scoped>
  .content{
    padding: 47px 100px 90px 100px;
    font-size: 14px;
    .el-menu-order{
      margin-top: -20px;
      border-bottom-color:#ccc;
      .el-menu-item{
        padding:0 10px;
        height: 50px;
        margin-right:50px;
        color:#999;
      }
      .el-menu-item.is-active{
        font-family: SourceHanSansCN-Medium;
        border-bottom: 2px solid #e11321;
        color: #333;
      }   
    }
  }
</style>