<template>
  <div class="container">
    <HeaderBar />
    <div class="main">
      <div class="banner">
        <div class="name">国内展会行业分类目录</div>
        <div class="en-name">INDUSTRY CLASSIFICATION OF DOMESTIC EXHIBITIONS</div>
      </div>
      <div class="w category">
        <div class="cell" v-for="item in list" :key="item.parentId">
          <div class="cell-hd">
            <div class="item">{{ item.categoryName }}</div>
          </div>
          <div class="cell-bd">
            <div class="level">
              <div
                class="item"
                v-for="i in item.categoryVos"
                :key="i.categoryId"
                @click="onTapCate(i.categoryId)"
              >
                {{ i.categoryName }}<span v-if="i.productCount">({{ i.productCount }})</span>
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
      list: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
    pageLoad() {
      this.getAllCategory();
    },
    // 获取全部分类
    getAllCategory() {
      this.$api.exhibition.getAllCategory({isDomestic: 1}).then((res) => {
        this.list = res || [];
      });
    },
    // 跳转展会列表
    onTapCate(categoryId) {
      this.navigateTo(`/exhibition?isDomestic=1&categoryId=${categoryId}`);
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;

  .banner {
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    background: url('../../assets/images/service_banner.png') no-repeat center center / cover;
    color: #fff;
    .name {
      font-weight: bold;
      height: 70px;
      font-size: 50px;
    }
    .en-name {
      font-size: 30px;
    }
  }
  .category {
    background: #fff;
    .cell {
      display: flex;
      &-hd {
        width: 326px;
        padding: 0 14px;
        display: flex;
        align-items: center;
        position: relative;
        background: #ececec;
        box-shadow: 0px 0px 5px 0px rgba(152, 152, 152, 0.08);
        .item {
          padding-left: 15px;
        }
        &::before {
          content: '';
          width: 5px;
          height: 18px;
          background: #f30213;
          position: absolute;
          left: 14px;
          top: 50%;
          margin-top: -9px;
          font-size: 20px;
          color: #333;
          font-weight: bold;
        }
      }
      &-bd {
        flex: 1;
        .level {
          padding: 15px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .item {
            line-height: 14px;
            margin: 8px 0;
            min-width: 170px;
            font-size: 14px;
            color: #666;
            cursor: pointer;
            &:hover {
              color: #f30213;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
</style>
