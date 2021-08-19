<template>
  <div class="container">
    <HeaderBar @search="onSearch" />
    <div class="w main">
      <div class="query">
        <div class="cell">
          <div class="cell-hd">大行业</div>
          <div class="cell-bd">
            <div class="cate">
              <div
                :class="['cate-item', query.parentId == item.parentId ? 'active' : '']"
                v-for="item in cateList"
                :key="item.parentId"
              >
                <span class="name">{{ item.categoryName }}</span>
                <div class="popover">
                  <div class="popover-content">
                    <span
                      class="category-name"
                      v-for="p in item.categoryVos"
                      :key="p.categoryId"
                      @click="onClickCate(item.parentId, p.categoryId)"
                    >
                      {{ p.categoryName }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cell">
          <div class="cell-hd">子行业</div>
          <div class="cell-bd">
            <div
              :class="['item', query.categoryId == item.categoryId ? 'active' : '']"
              v-for="item in categoryChildren"
              :key="item.categoryId"
              @click="onCheckCateChildren(item.categoryId)"
            >
              {{ item.categoryName }}<span v-if="item.productCount">({{ item.productCount }})</span>
            </div>
          </div>
        </div>
        <div class="cell">
          <div class="cell-hd">区域</div>
          <div class="cell-bd">
            <div
              :class="['item', query.isDomestic == item.isDomestic ? 'active' : '']"
              v-for="item in areaList"
              :key="item.categoryId"
              @click="onCheckArea(item)"
            >
              {{ item.categoryName }}<span v-if="item.productCount">({{ item.productCount }})</span>
            </div>
          </div>
        </div>
        <div class="cell">
          <div class="cell-hd">展会时间</div>
          <div class="cell-bd">
            <div class="date">
              <div class="year">
                <div
                  :class="['year-item', query.year == item ? 'active' : '']"
                  v-for="(item, index) in yearList"
                  :key="item"
                  @click="onCheckYear(item)"
                >
                  {{ item || '全部' }}<span v-if="index !== 0">年</span>
                </div>
              </div>
              <div class="month">
                <div
                  :class="['month-item', query.month == item ? 'active' : '']"
                  v-for="item in monthList"
                  :key="item"
                  @click="onCheckMonth(item)"
                >
                  {{ item }}月
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cell">
          <div class="cell-hd">热门地区</div>
          <div class="cell-bd">
            <div
              :class="['item', query.cityId == item.cityId ? 'active' : '']"
              v-for="item in cityList"
              :key="item.cityId"
              @click="onCheckCity(item.cityId)"
            >
              {{ item.cityName }}
            </div>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="list-hd content-between">
          <div class="title">
            首页 > {{ query.isDomestic == 1 ? '国内会展' : '国际会展' }} >
            <span>{{ areaActive.categoryName }}</span>
          </div>
          <div class="screen flex">
            <div
              :class="['screen-item', screenType == 'hot' ? 'active' : '']"
              @click="onScreen('hot_num', 'hot')"
            >
              热度
              <i :class="query.field == 'hot_num' ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
            </div>
            <div
              :class="['screen-item', screenType == 'date' ? 'active' : '']"
              @click="onScreen('start_time', 'date')"
            >
              时间
              <i
                :class="query.field == 'start_time' ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
              ></i>
            </div>
          </div>
        </div>
        <div class="cells" v-if="!Array.isEmpty(list)">
          <div class="cell" v-for="item in list" :key="item.exhibitionId">
            <Card :exhibition="item" />
          </div>
        </div>
        <NoData v-else />
      </div>
    </div>
    <FooterBar />
  </div>
</template>

<script>
import Card from '../Index/components/Card';

export default {
  components: {Card},
  data() {
    return {
      cateList: [],
      cityList: [],
      yearList: [],
      monthList: [],
      areaList: [],
      list: [],
      categoryChildren: [],
      areaActive: {},
      screenType: '',
      query: {
        categoryId: '',
        cityId: '',
        country: '', // 国家/地区
        exhibitionArea: '',
        exhibitionHallId: '',
        exhibitionPrice: '',
        field: '',
        id: '',
        isDomestic: 1, // 查询国内展会:1,查询国外展会:0,查询所有列表不传
        isNew: '', // 查询最新展会:1,其他填:0
        keyword: '',
        limit: 30,
        month: '',
        page: 1,
        parentId: '',
        year: '',
      },
    };
  },
  watch: {
    query: {
      handler(val) {
        console.log(val);
        this.getExhibitionList();
      },
      immediate: true,
      deep: true,
    },
    'query.categoryId': {
      handler(val) {
        if (!val) return;
        this.getCategoryRegion();
      },
    },
  },
  methods: {
    pageLoad({isDomestic = '', categoryId, keyword = ''}) {
      this.query = {
        ...this.query,
        isDomestic,
        keyword,
        categoryId,
      };
      this.loadData();
    },
    loadData() {
      this.getAllCategory();
      this.getCityList();
      this.getYears();
    },
    // 搜索查询
    onSearch(keyword) {
      this.query.keyword = keyword;
    },
    // 查询列表
    getExhibitionList() {
      this.$api.exhibition.exhibitionList(this.query).then((res) => {
        this.list = res.result || [];
      });
    },
    // 获取全部分类
    getAllCategory() {
      this.$api.exhibition.getAllCategory().then((res) => {
        this.cateList = res || [];
        const categoryId = res[0].categoryVos[0].categoryId;
        const parentId = this.getParentId(categoryId, res);
        this.query.parentId = parentId;
        this.onClickCate(parentId, categoryId);
      });
    },
    // 根据子行业ID获取父行业ID
    getParentId(categoryId, list) {
      let parentId = '';
      if (!categoryId) return parentId;
      list?.forEach((item) => {
        item?.categoryVos?.forEach((Iitem) => {
          if (Iitem.categoryId == categoryId) {
            parentId = item.parentId;
          }
        });
      });
      console.log('parentId', parentId);
      return parentId;
    },
    // 获取热门地区
    getCityList() {
      this.$api.exhibition.getCity({isHot: 1}).then((res = []) => {
        this.cityList = [
          {
            abbreviation: '全部',
            cityId: 0,
            cityName: '全部',
          },
          ...res,
        ];
      });
    },
    // 获取区域
    getCategoryRegion() {
      this.$api.exhibition.getCategoryRegion({categoryId: this.query.categoryId}).then((res) => {
        this.areaList = res;
      });
    },
    // 获取年份
    getYears() {
      this.$api.exhibition.getYears().then((res = []) => {
        this.yearList = ['', ...res];
      });
    },
    // 选择子行业
    onCheckCateChildren(categoryId) {
      this.query.categoryId = categoryId;
    },
    // 选择区域
    onCheckArea(item) {
      this.query.isDomestic = item.isDomestic;
      this.areaActive = item;
    },
    // 获取月份
    getMonths() {
      this.$api.exhibition.getMonths({year: this.query.year}).then((res) => {
        this.monthList = res || [];
      });
    },
    // 选择年份
    onCheckYear(year) {
      this.query.year = year;
      if (!year) {
        this.monthList = [];
        return;
      }
      this.getMonths();
    },
    // 选择月份
    onCheckMonth(month) {
      this.query.month = month;
    },
    // 选择热门地区
    onCheckCity(cityId) {
      this.query.cityId = cityId;
    },
    // 分类点击
    onClickCate(parentId, categoryId) {
      this.query = {
        ...this.query,
        parentId,
        categoryId,
      };
      const filterCate = this.cateList.filter((item) => item.parentId == parentId);
      this.categoryChildren = filterCate[0]?.categoryVos;
    },
    // 时间热度排序
    onScreen(id, type) {
      const {field} = this.query;
      this.screenType = type;
      this.query.field = type == field ? '' : id;
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  margin-top: 32px;
  .query {
    .cell {
      display: flex;
      &-hd {
        width: 182px;
        padding: 22px 14px 0 14px;
        background: #ececec;
        box-shadow: 0px 0px 5px 0px rgba(152, 152, 152, 0.08);
        font-size: 20px;
        color: #333333;
      }
      &-bd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 32px 22px 24px;
        background: #ffffff;
        box-shadow: 0px 3px 8px 0px rgba(204, 204, 204, 0.36),
          0px -3px 8px 0px rgba(204, 204, 204, 0.18);
        .item {
          padding: 12px 16px 12px 12px;
          color: #666;
          font-size: 14px;
          cursor: pointer;
          &:hover {
            color: #e11321;
          }
        }
        .active {
          background: #e11321;
          border-radius: 4px;
          color: #fff;
          .name {
            color: #fff !important;
          }
          &:hover {
            color: #fff;
          }
        }
        .cate {
          display: flex;
          flex-wrap: wrap;
          &-item {
            padding: 12px 16px 12px 12px;
            color: #666;
            font-size: 14px;
            position: relative;

            .popover {
              display: none;
              position: absolute;
              top: 44px;
              left: 0;
              z-index: 500;
              width: 420px;
              background: #fff;
              &-content {
                padding: 12px 7px 12px 12px;
                border: 1px solid #e9e9e9;
                box-shadow: 0 0 30px rgb(0 0 0 / 20%);
                background: #fff;
                border-radius: 5px;
                .category-name {
                  display: inline-block;
                  margin: 0 20px 10px 0;
                  cursor: pointer;
                  color: #666;
                  &:hover {
                    color: #e11321;
                  }
                }
              }
            }
            &:hover {
              .name {
                color: #e11321;
              }
              .popover {
                display: block;
              }
              &::after {
                content: '▲';
                position: absolute;
                top: 30px;
                color: #ddd;
                left: 50%;
                font-size: 16px;
              }
            }
          }
        }
        .date {
          width: 100%;
          padding: 0 12px 0 0;
          .year {
            display: flex;
            &-item {
              padding: 12px 16px;
              color: #666;
              font-size: 14px;
              cursor: pointer;
            }
            .active {
              color: #fff;
            }
          }
          .month {
            display: flex;
            margin-top: 10px;
            &-item {
              padding: 6px 16px;
              margin-right: 20px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .list {
    margin-top: 65px;
    &-hd {
      .title {
        color: #999;
        span {
          color: #f30213;
        }
      }
      .screen {
        color: #666;
        &-item {
          margin-right: 20px;
          cursor: pointer;
        }
        .active {
          color: #f30213;
        }
      }
    }
    .cells {
      margin-top: 30px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .cell {
        margin-right: 15px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
