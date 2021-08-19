<template>
  <div class="container">
    <HeaderBar />
    <div class="main">
      <div class="w">
        <div class="inner">
          <div class="cate">
            <div class="cate-title">展会行业分类</div>
            <ul class="cate-menu">
              <li
                class="cate-menu-item"
                v-for="item in cateList.slice(0, 15)"
                :key="item.parentId"
                @mouseenter="tag = item.parentId"
                @mouseleave="tag = -1"
              >
                <span class="list">{{ item.categoryName }}</span>
                <ul class="tag flex" v-show="tag == item.parentId">
                  <li
                    class="cate-vos"
                    v-for="(categoryVos, index) in item.categoryVos"
                    @click="onTapCate(item.parentId, categoryVos.categoryId)"
                    :key="index"
                  >
                    {{ categoryVos.categoryName }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="banner">
            <el-carousel height="664px">
              <el-carousel-item v-for="item in banner" :key="item.pictureUrl">
                <el-image
                  style="width: 100%; height: 664px"
                  :src="item.pictureUrl"
                />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="ad content-between flex-direction-column">
            <div
              class="item"
              v-for="(item, index) in headExhibition"
              :key="index"
              @click="onTapDetail(item.exhibitionId)"
            >
              <img
                style="width: 100%; height: 209px"
                :src="item.exhibitionUrl"
              />
            </div>
          </div>
        </div>
        <section class="section">
          <div class="section-hd">
            <div class="title">
              <span class="title-cn">推荐展会</span>
              <span class="title-en">Recommend Exhibition</span>
            </div>
          </div>
          <div class="section-bd">
            <div
              class="item"
              v-for="(item, index) in recommendExhibitions"
              :key="index"
            >
              <Card :exhibition="item" />
            </div>
          </div>
        </section>
        <section class="section">
          <div class="section-hd">
            <div class="title">
              <span class="title-cn">最新展会</span>
              <span class="title-en">Latest exhibition</span>
            </div>
            <div class="other">
              <span><router-link :to="{path:'exhibition', query: {isNew: 1,isDomestic:'1'}}">最新国内展会</router-link></span>
              <span><router-link :to="{path:'exhibition', query: {isNew: 1,isDomestic:'0'}}">最新国际展会</router-link></span>
            </div>
          </div>
          <div class="section-bd">
            <div
              class="item"
              v-for="(item, index) in newExhibitions"
              :key="index"
            >
              <Card :exhibition="item" />
            </div>
          </div>
        </section>
        <section class="section">
          <div class="section-hd">
            <div class="title">
              <span class="title-cn">国内展会</span>
              <span class="title-en">Domestic Exhibition</span>
            </div>
            <div class="other">
              <span
                v-for="(city, index) in domesticCities.slice(0,3)" 
                :key="index"
              >
                <router-link :to="{path:'exhibition', query: {cityId:city.cityId}}">
                  {{ city.cityName }}</router-link></span> 
              
            </div>
          </div>
          <div class="section-bd">
            <div
              class="item"
              v-for="(item, index) in domesticExhibitions"
              :key="index"
            >
              <Card :exhibition="item" />
            </div>
          </div>
        </section>
        <section class="section">
          <div class="section-hd">
            <div class="title">
              <span class="title-cn">国际展会</span>
              <span class="title-en">Internation Exhibition</span>
            </div>
            <div class="other">
             <span
                v-for="(city, index) in nationalCities.slice(0,3)" 
                :key="index"
              >
                <router-link :to="{path:'exhibition', query: {isDomestic: 0, cityId:city.cityId}}">
                  {{ city.cityName }}</router-link></span> 
              
            </div>
          </div>
          <div class="section-bd">
            <div
              class="item"
              v-for="(item, index) in internationalExhibitions"
              :key="index"
            >
              <Card :exhibition="item" />
            </div>
          </div>
        </section>
        <!-- 资讯 -->
        <div class="news content-between">
          <div class="news-card" v-for="(item, index) in news" :key="index">
            <div class="hd content-between">
              <div class="title">{{ item.name }}</div>
              <router-link to="/news"><div class="arrow">></div></router-link>
            </div>
            <div class="bd">
              <div
                class="item ellipsis"
                v-for="(article, index) in news[index].article"
                :key="index"
              >
                <router-link
                  :to="{
                    path: '/news/detail',
                    query: { articleId: article.articleId },
                  }"
                >
                  <em :class="['idx', index < 3 ? 'red' : '']">{{
                    index + 1
                  }}</em>
                  {{ article.articleTitle }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="w bottom">
          <div class="area">
            <div class="label">热门国家</div>
            <div class="items">
              <div
                class="item"
                v-for="item in hotCountries"
                :key="item.countryId"
              >
                <router-link :to="{path:'exhibition', query: {country:item.countryId}}">
                  {{ exhibitionName(item) }}</router-link>
              </div>
            </div>
          </div>
          <div class="area">
            <div class="label">热门城市</div>
            <div class="items">
              <div class="item" v-for="item in hotCities" :key="item.cityId">
                <router-link :to="{path:'exhibition', query: {cityId:item.cityId}}">
                  {{ exhibitionName(item) }}</router-link>
              </div>
            </div>
          </div>
          <div class="idea content-between">
            <div class="item" v-for="item in idea" :key="item.id">
              <div class="icon">
                <svg-icon
                  :icon-class="svgName(item.id)"
                  class-name="icon"
                ></svg-icon>
              </div>
              <div class="label">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterBar />
  </div>
</template>

<script>
import Card from "./components/Card";

export default {
  components: { Card },
  props: {},
  data() {
    return {
      //行业分类
      cateList: [],
      //子行业
      categoryVos: [],
      //鼠标移动到的子行业
      tag: undefined,
      //轮播图
      banner: [],
      //头条展会列表
      headExhibition: [],
      //推荐展会列表
      recommendExhibitions: [],
      //最新展会列表
      newExhibitions: [],
      //国内展会列表
      domesticExhibitions: [],
      //国际展会列表
      internationalExhibitions: [],
      //热门国家
      hotCountries: [],
      //热门城市
      hotCities: [],
      //国内城市
      domesticCities: [],
      //国际城市
      nationalCities: [],
      //资讯栏
      news: [
        {
          id: 32,
          name: "行业动态",
          article: [],
        },
        {
          id: 44,
          name: "市场与政策",
          article: [],
        },
        {
          id: 46,
          name: "展会问答",
          article: [],
        },
      ],
      idea: [
        {
          id: 1,
          name: "海量展会资源",
        },
        {
          id: 2,
          name: "专属客户顾问",
        },
        {
          id: 3,
          name: "一站式服务",
        },
        {
          id: 4,
          name: "精准匹配",
        },
        {
          id: 5,
          name: "覆盖范围广",
        },
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    show(val) {
      console.log(val);
    },
    pageLoad() {
      this.loadData();
    },
    loadData() {
      this.getAllCategory();
      this.getBanner();
      this.headilinesExhibition();
    },
    //获取全部行业分类
    getAllCategory() {
      this.$api.exhibition.getAllCategory({ isDomestic: 1 }).then((res) => {
        this.cateList = res || [];
      });
    },

    // 获取大banner
    getBanner() {
      this.$api.picture.getBanner().then((res) => {
        this.banner = res;
      });
    },

    //获取首页头条展会列表
    headilinesExhibition() {
      this.$api.exhibition.headilinesExhibition({ limit: 3 }).then((res) => {
        this.headExhibition = res || [];
      });
      //获取其他展会列表
      this.recommendExhibition();
      this.getNewExhibitionList();
      this.getDomesticExhibitionList();
      this.getInternationalExhibitionList();
    },
    // 跳转头条展会详情
    onTapDetail(id) {
      this.navigateTo(`/exhibition/detail?exhibitionId=${id}`);
    },
    //推荐展会列表
    recommendExhibition() {
      this.$api.exhibition.recommendExhibition({ limit: 5 }).then((res) => {
        this.recommendExhibitions = res || [];
      });
    },
    //获取展会列表
    exhibitionList(obj) {
      return this.$api.exhibition.exhibitionList(obj).then((res) => {
        return res.result || [];
      });
    },
    //最新展会列表
    getNewExhibitionList() {
      this.exhibitionList({ isNew: 1, limit: 5, page: 1 }).then((res) => {
        this.newExhibitions = res;
      });
    },
    //国内展会列表
    getDomesticExhibitionList() {
      this.exhibitionList({ isDomestic: 1, limit: 5, page: 1 }).then((res) => {
        this.domesticExhibitions = res;
      });
    },
    //国际展会列表
    getInternationalExhibitionList() {
      this.exhibitionList({ isDomestic: 0, limit: 5, page: 1 }).then((res) => {
        this.internationalExhibitions = res;
      });
      this.getCountry();
      this.getCity();
      this.getArticle();
    },
    //获取文章列表
    getArticleList(obj) {
      return this.$api.article.getArticleList(obj).then((res) => {
        return res.result || [];
      });
    },
    //获取每栏对应文章
    getArticle() {
      for (let item of this.news) {
        this.getArticleList({
          articleColumn: item.id,
          field: "article_sn",
          limit: 10,
          order: "asc",
          page: 1,
        }).then((res) => {
          item.article = res;
        });
      }
    },
    //获取国家列表
    getCountry() {
      this.$api.exhibition.getCountry({ isHot: 1 }).then((res) => {
        this.hotCountries = res || [];
      });
    },
    //获取城市列表
    getCity() {
      this.$api.exhibition.getCity({ isHot: 1 }).then((res) => {
        this.hotCities = res || [];
      });
      this.$api.exhibition.getCity({ countryId: 1 }).then((res) => {
        this.domesticCities = res || [];
         this.$api.exhibition.getCity().then((res2) => {
          this.nationalCities = res2.filter(city => {
            return !res.find( domesticCity => domesticCity.cityId === city.cityId )
          });
        });
      });
    },
    //热门展会国家和城市展会名
    exhibitionName(val) {
      if (val.abbreviation.length == 2) {
        return `${val.abbreviation}展会`;
      }
      return `${val.abbreviation}展`;
    },
    // 跳转国内展会列表
    // 跳转展会列表
    onTapCate(parentId, categoryId) {
      this.navigateTo(
        `/exhibition?parentId=${parentId}&categoryId=${categoryId}`
      );
    },
    svgName(val) {
      return "home-svg" + val;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;

  .banner {
    height: 500px;
  }
  .main {
    .inner {
      margin-top: 30px;
      display: flex;
      .cate {
        width: 198px;
        height: 664px;
        background: #ffffff;
        box-shadow: 0px 0px 5px 0px rgba(152, 152, 152, 0.08);
        &-title {
          margin: 20px 0 20px 20px;
          color: #333;
          font-weight: bold;
          font-size: 20px;
        }
        &-menu {
          &-item {
            position: relative;
            padding: 10px 20px;
            line-height: 20px;
            color: #666;
            &:hover {
              background: #d43e3e;
              .list {
                color: #fff;
                &:before {
                  content: "";
                  left: 0px;
                  top: 40px;
                  position: absolute;
                  width: 200px;
                  height: 20px;
                  background: transparent;
                  z-index: 998;
                }
              }
            }
          }
          .tag {
            position: absolute;
            flex-wrap: wrap;
            left: 0;
            top: 50px;
            width: 360px;
            height: auto;
            z-index: 999;
            background: #fff;
            box-shadow: 0px 0px 5px 0px rgba(152, 152, 152, 0.42);
            border-radius: 4px;
            &:before {
              position: absolute;
              content: "";
              left: 50px;
              top: -25px;
              font-size: 0;
              line-height: 0;
              border-width: 15px 8px;
              border-style: solid;
              border-color: transparent transparent #fff transparent;
            }
            .cate-vos {
              line-height: 20px;
              font-size: 12px;
              width: 90px;
              padding: 10px 10px;
              &:hover {
                cursor: pointer;
                color: #e11321;
              }
            }
          }
        }
      }
      .banner {
        margin: 0 20px;
        width: 800px;
        height: 664px;
        background: #fff;
      }
      .ad {
        .item {
          cursor: pointer;
          width: 403px;
          height: 209px;
          background: #ccc;
        }
      }
    }
    .section {
      margin-bottom: 90px;
      &-hd {
        padding: 20px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title {
          padding-left: 20px;
          position: relative;
          &-cn {
            color: #333;
            font-size: 20px;
            font-weight: bold;
          }
          &-en {
            margin-left: 10px;
            color: #999;
            font-size: 16px;
          }
          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 3px;
            width: 5px;
            height: 18px;
            background: #f30213;
          }
        }
        .other {
          font-size: 16px;
          span {
            margin-left: 10px;
            a{
              color: #666;
              &:hover {
              color: #e11321; 
            }
            }
            
          }
        }
      }
      &-bd {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .item:not(:last-child) {
          margin-right: 15px;
        }
      }
    }
    .news {
      &-card {
        height: 376px;
        padding: 20px;
        width: calc(33.3% - 47px);
        margin-right: 15px;
        box-sizing: content-box;
        background: #ffffff;
        box-shadow: 0px 0px 5px 0px rgba(152, 152, 152, 0.08);
        border-radius: 4px;
        .hd {
          .title {
            color: #333;
            font-weight: bold;
            font-size: 20px;
          }
          .arrow {
            width: 20px;
            text-align: center;
            line-height: 30px;
            &:hover {
              color: #e11321;
            } 
          }
        }
        .bd {
          margin-top: 20px;
          .item {
            margin-bottom: 10px;
            color: #666;
            .idx {
              display: inline-block;
              margin-right: 16px;
              width: 20px;
              height: 20px;
              text-align: center;
              line-height: 20px;
              border-radius: 2px;
              color: #666;
            }
            .red {
              background: #f30213;
              color: #fff;
            }
          }
        }
      }
    }
    .bottom {
      margin-top: 30px;
      padding: 0 32px;
      background: #fff;
      .area {
        padding-top: 30px;
        display: flex;
        border-bottom: 1px solid rgb(204, 204, 204, 0.7);
        .label {
          width: 90px;
          color: #999;
        }
        .items {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          .item {
            margin: 0 56px 22px 0;
            color: #333;
          }
        }
      }
      .idea {
        padding: 30px 238px;
        .item {
          .icon {
            width: 99px;
            height: 99px;
            border-radius: 50%;
            background: rgb(243, 243, 243, 0.79);
          }
          .label {
            text-align: center;
            color: #666;
          }
        }
      }
    }
  }
}
</style>
