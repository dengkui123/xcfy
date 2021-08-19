<template>
  <div class="container">
    <HeaderBar />
    <div class="main">
      <div class="w inner">
        <div class="side-menu">
          <side-menu
            :current="1"
            :list="sideMenu"
            name="categoryName"
            val="categoryId"
            @on-click="onClickMenus"
          />
        </div>
        <div class="content">
          <div class="cells content-between flex-wrap">
            <div
              class="cell"
              v-for="item in resList"
              :key="item.serviceId"
              @click="onTapDetail(item.serviceId)"
            >
              <div class="cell-hd">
                <el-image fit="cover" style="height: 165px" :src="item.serviceUrl" />
              </div>
              <div class="cell-bd">
                <p class="title">{{ item.serviceTitle }}</p>
                <p class="desc ellipsis">{{ item.serviceDescribe }}</p>
              </div>
              <div class="cell-ft">
                <div class="price">¥{{ item.servicePrice }}</div>
                <div class="booking">订购</div>
              </div>
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
      activeMenu: {},
      list: [],
      query: {
        limit: 30,
        page: 1,
      },
      sideMenu: [],
    };
  },
  watch: {
    sideMenu: {
      handler(val) {
        this.activeMenu = val[0];
      },
      immediate: true,
    },
  },
  computed: {
    resList() {
      return this.list.filter( item => {
        return item.serviceCategory === this.activeMenu.categoryId;
      })
    }
  },
  methods: {
    pageLoad() {
      this.getServiceCategory();
    },
    // 获取左侧分类菜单列表
    getServiceCategory() {
      this.$api.service.getServiceCategory({limit: 30, page: 1}).then((res) => {
        this.sideMenu = res.result || [];
        if (!Array.isEmpty(res.result)) {
          this.activeMenu = res.result[0];
          this.getServiceList();
        }
      });
    },
    // 获取list
    getServiceList() {
      this.$api.service
        .getServiceList({...this.query})
        .then((res) => {
          this.list = res.result || [];
        });
    },
    onClickMenus(item) {
      this.activeMenu = item;
      this.getServiceList();
    },
    // 去详情
    onTapDetail(serviceId) {
      this.navigateTo(`/services/detail?serviceId=${serviceId}`);
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
    display: flex;
    margin-top: 30px;
    .side-menu {
      width: 200px;
    }
    .content {
      flex: 1;
      padding: 18px 38px 38px 38px;
      background: #fff;
      .cells {
        align-items: center;
        justify-content: unset;
        .cell {
          margin:20px 7px;
          width: 276px;
          height: 290px;
          padding: 4px 6px;
          background: #ffffff;
          box-shadow: 0px 3px 8px 0px rgba(204, 204, 204, 0.36),
            0px -3px 8px 0px rgba(204, 204, 204, 0.18);
          &-hd {
            height: 165px;
          }
          &-bd {
            margin-top: 10px;
            .title {
              font-size: 16px;
              color: #333;
            }
            .desc {
              height: 34px;
              color: #999;
              font-size: 14px;
            }
          }
          &-ft {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .price {
              color: #e11321;
              font-weight: bold;
            }
            .booking {
              width: 74px;
              height: 34px;
              background: #e11321;
              border-radius: 4px;
              text-align: center;
              line-height: 34px;
              color: #fff;
              font-size: 16px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
