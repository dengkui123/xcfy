<template>
  <div class="container">
    <HeaderBar />
    <div class="w information-detail">
      <nav class="breadcrumbs">
        <router-link to="/">首页</router-link>
        <i class="el-icon-arrow-right"></i
        ><router-link to="/news">展会资讯</router-link>
        <i class="el-icon-arrow-right"></i>资讯
      </nav>
      <aside class="aside">
        <h1 class="aside-title">相关展会</h1>
        <ul class="aside-exhibition">
          <li
            v-for="item in relatedExhibition"
            :key="item.exhibitionId"
            @click="goAsideExhibition(item.exhibitionId)"
          >
            <div class="aside-exhibition-pic">
              <img :src="item.exhibitionUrl" :alt="item.exhibitionName" />
            </div>
            <p class="aside-exhibition-title">{{ item.exhibitionName }}</p>
            <p class="aside-exhibition-time">{{ item.exhibitionTime }}</p>
          </li>
        </ul>
      </aside>
      <main class="information-article">
        <h1 class="information-title">{{ article.articleTitle }}</h1>
        <div class="information-subtitle">
          <span>浏览：{{ article.articleVisitors }}</span>
          <span>来源：{{ article.articleSource }}</span>
          <span>{{ article.articleTime }}</span>
        </div>
        <div
          v-if="article.articleExhibition"
          class="insert-exhibition flex"
          @click="goInsertExhibition"
        >
          <img
            :src="article.articleExhibition.exhibitionUrl"
            :alt="article.articleExhibition.exhibitionName"
          />
          <div>
            <h1 class="insert-exhibition-title">
              {{ article.articleExhibition.exhibitionName }}
            </h1>
            <div>
              <svg-icon icon-class="time" class-name="icon"></svg-icon>
              <span style="margin-right: 20px; margin-left: 5px">{{
                article.articleExhibition.exhibitionTime
              }}</span>
              <span style="color: #04ac18">{{leftTime}}</span>
            </div>
          </div>
        </div>
        <div class="rich-text">
          <div v-html="article.articleContent"></div>
        </div>
      </main>
      <p style="clear: both"></p>
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
      articleId: undefined,
      article: {
        //文章内部关联展会
        articleExhibition: {
          exhibitionId: undefined,
          exhibitionUrl: "",
          exhibitionTime: "",
          articleVisitors: undefined,
        },
      },
      //文章左侧关联展会
      relatedExhibition: [
        {
          exhibitionId: undefined,
        },
      ],
    };
  },
  watch: {},
  computed: {
    leftTime: function () {
      let time = this.article.articleExhibition.exhibitionTime;
      let startDate = Date.parse(time.split("~")[0]);
      let endDate;
      if(time && time.split("~")[0].split(".")[1] < time.split("~")[1].split(".")[0]){
        endDate = Date.parse(time.split("~")[0].split(".")[0].concat('.' + time.split("~")[1]));
      }else{
        endDate = Date.parse((parseInt(time.split("~")[0].split(".")[0])+1).toString().concat('.' + time.split("~")[1]));
      }
      let newDate = Date.parse(new Date());
      if (startDate > newDate){
        return `距离开展 ${parseInt((startDate - newDate) / (1000 * 60 * 60 * 24))+1} 天`;
      }else if(endDate < newDate){
        return '已结束';
      }
      return  '开展中…';
    },
  },
  methods: {
    pageLoad({ articleId }) {
      this.articleId = articleId;
      this.getRelatedExhibition();
      this.visitor();
    },
    //增加文章浏览数量
    visitor() {
      this.$api.article.visitor({ articleId: this.articleId, num: 1 });
      this.getArticleById();
    },
    //获取文章详情
    getArticleById() {
      this.$api.article
        .getArticleById({ articleId: this.articleId })
        .then((res) => {
          this.article = res || {};
        });
    },
    // 获取文章关联展会
    getRelatedExhibition() {
      this.$api.article
        .getRelatedExhibition({ articleId: this.articleId })
        .then((res) => {
          this.relatedExhibition = res || [];
        });
    },
    //跳转到关联展会详情页面
    goAsideExhibition(exhibitionId) {
      this.navigateTo(`/exhibition/detail?exhibitionId=${exhibitionId}`);
    },
    //跳转到内嵌展会详情页面
    goInsertExhibition() {
      this.navigateTo(`/exhibition/detail?exhibitionId=${this.article.articleExhibition.exhibitionId}`);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  .information-detail {
    margin-bottom: 40px;
    color: #666666;
    a {
      text-decoration: none;
      color: #666666;
      display: inline-block;
      &:hover {
        color: #e11321;
      }
    }
    .breadcrumbs {
      font: 14px SourceHanSansCN;
      height: 40px;
      line-height: 40px;
      margin: 10px 0;
    }
    .aside {
      float: left;
      width: 330px;
      background-color: #ffffff;
      box-shadow: 0px 0px 5px 0px rgba(152, 152, 152, 0.4);
      &-title {
        margin: 20px 10px;
        height: 20px;
        line-height: 20px;
        font-size: 20px;
        font-weight: 400;
        color: #666666;
      }
      &-exhibition {
        margin: 5px;
        display: flex;
        flex-wrap: wrap;
        li {
          cursor: pointer;
          box-shadow: 0px 0px 5px 0px rgba(152, 152, 152, 0.4);
          margin: 5px;
          width: 148px;
          height: 180px;
        }
        &-pic,
        img {
          width: 100%;
          height: 90px;
        }
        &-title {
          color: #333333;
          height: 48px;
          margin-bottom: 10px;
          &:hover {
            color: #e11321;
          }
        }
        &-time {
          font-size: 12px;
          color: #666666;
          line-height: 18px;
        }
      }
    }
    .information-article {
      float: right;
      width: 1090px;
      padding: 40px 30px;
      font: 16px SourceHanSansCN;
      background-color: #ffffff;
      box-shadow: 0px 0px 5px 0px rgba(152, 152, 152, 0.4);
      text-align: center;
      .information-title {
        font-size: 28px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #333333;
        line-height: 50px;
      }
      .information-subtitle {
        margin-bottom: 30px;
        span {
          margin: 15px;
          font-size: 12px;
          font-weight: 400;
          color: #999999;
          line-height: 18px;
        }
      }
      .insert-exhibition {
        text-align: left;
        padding: 15px;
        background-color: #f9f9f9;
        cursor: pointer;
        img {
          width: 150px;
          height: 90px;
          margin-right: 10px;
        }
        &-title {
          font-size: 16px;
          font-family: SourceHanSansCN-Medium, SourceHanSansCN;
          font-weight: 500;
          color: #333333;
          line-height: 24px;
          margin: 10px 0;
        }
      }
      .rich-text {
        text-align: left;
        margin-top: 20px;
        font-size: 14px;
      }
    }
  }
}
</style>