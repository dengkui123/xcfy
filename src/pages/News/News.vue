<template>
  <div class="container">
    <HeaderBar />
    <div class="w main flex">
      <div class="aside">
        <nav class="nav">
        <h1 class="nav-title">查看更多行业资讯</h1>
        <ul
          class="nav-list"
          v-for="(parentItem, parentIndex) in cateList"
          :key="parentIndex"
        >
          <li>
            <h2 class="category">{{ parentItem.categoryName }}</h2>
            <ul class="activeCategoryId flex">
              <li
                v-for="(sonItem, sonIndex) in parentItem.categoryVos"
                :class="{ active: activeCategoryId == sonItem.categoryId }"
                :key="sonIndex"
                @click="chooseCategory"
              >
                {{ sonItem.categoryName }}
              </li>
            </ul>
            <hr v-if="parentIndex < cateList.length - 1" />
          </li>
        </ul>
      </nav>
      </div>
      
      <main class="news">
        <el-menu
          :default-active="activeIndex"
         
          mode="horizontal"
          @select="handleSelect"
          ><el-menu-item
            style="height: 50px"
            v-for="(item, index) in navList"
            :key="index"
            :index="item.id + ''"
            :style="menuBorder"
            >{{ item.title }}
          </el-menu-item>
        </el-menu>
        <ul class="news-article">
          <li 
            v-for="item in articleList.slice((currentpage-1)*pagesize,currentpage*pagesize)" 
            :key="item.articleId"
            @click="onTapDetail(item.articleId)"
          >
          <div class="news-article-content flex">
            <div class="pic">
              <img
              :src="item.articlePic"
              :alt="item.title"
              style="width: 223px; height: 167px"
              />
            </div>
            <div class="article">
              <h1 class="title">{{ item.articleTitle }}</h1>
              <p class="content">{{ item.articleDescription }}</p>
              <p class="time">{{ item.articleTime }}</p>
            </div>
          </div>
          <hr style="border: 1px solid #cccccc; border-bottom: none" /></li>
        </ul>
        <el-pagination
          class="pagination news-pagination"
          popper-class="select-page"
          background
          @size-change="handleSizeChange"
          :page-sizes="[5, 10, 15, 20, 30]"
          :page-size="pagesize"
          :current-page.sync="currentpage"
          layout="sizes, prev, pager, next"
          :total="articleList.length"
        >
        </el-pagination>
      </main>
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
      //首次选定菜单
      activeIndex: "1",
      //隐藏选中菜单边框
      menuBorder: "",
      //点击的子行业
      activeCategoryId: "",
      //菜单列表
      navList: [],
      //行业列表
      cateList: [],
      //文章列表
      articleList: [],
      //当前页码
      currentpage: 1,
      //每页文章数
      pagesize: 10,
    };
  },
  watch: {
    currentpage() {
      console.log(this.currentpage);
    },
  },
  computed: {},
  methods: {
    pageLoad() {
      this.getColumByParentId();
      this.getAllCategory();
      this.getArticleList();
    },
    //获取顶部资讯栏目
    getColumByParentId() {
      this.$api.column
        .getColumByParentId({ columnType: 0, parentId: 47 })
        .then((res) => {
          console.log(res);
          this.navList = res || [];
        });
    },
    // 获取全部分类
    getAllCategory() {
      this.$api.exhibition.getAllCategory({ isDomestic: 1 }).then((res) => {
        this.cateList = res || [];
      });
    },
    // 获取文章列表
    getArticleList() {
      this.$api.article.getArticleList({
          articleColumn: this.activeIndex,
          categoryId: this.activeCategoryId,
          field: "article_time",
          order: "desc",
          limit: 100000,
        })
        .then((res) => {
          this.articleList = res.result || [];
        });
    },
    //获取属于当前点击的栏目的文章
    handleSelect(key) {
      // console.log(key, keyPath);
      console.log(key);
      this.activeIndex = key;
      this.activeCategoryId = "";
      this.menuBorder = "";
      this.getArticleList();
    },
    //获取属于当前点击的行业的文章
    chooseCategory(event) {
      let activeCategory = {};
      this.cateList.find((item) => {
       return activeCategory = item.categoryVos.find((item2) => {
          return item2.categoryName.trim() == event.target.innerText;
        });
      });
      this.activeCategoryId = activeCategory.categoryId;
      this.activeIndex = "";
      this.menuBorder = "border-color:transparent";
      this.getArticleList();
    },
    handleSizeChange(val) {
      this.pagesize = parseInt(`${val}`);
      console.log(this.pagesize);
      this.getArticleList();
    },
    //跳转文章详情
    onTapDetail(articleId){
      this.navigateTo(`/news/detail?articleId=${articleId}`);
    }
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
    margin: 40px auto;
    font: 14px SourceHanSansCN;
    .nav {
      width: 326px;
      background-color: #ffffff;
      box-shadow: 0px 0px 5px 0px rgba(152, 152, 152, 0.4);
      margin-right: 20px;
      padding:0 0 20px 15px;
      &-title {
        font: 20px SourceHanSansCN-Medium;
        font-weight: 500;
        color: #666666;
        line-height: 30px;
        padding: 25px 30px 20px 0;
      }
      &-list {
        .category {
          font-size: 18px;
          font-family: SourceHanSansCN-Medium;
          font-weight: 500;
          color: #333333;
          height: 20px;
          line-height: 20px;
          margin: 15px 0 15px;
          padding-left: 10px;
          border-left: 5px solid #e11321;
        }
        .activeCategoryId {
          flex-wrap: wrap;
          .active {
            color: #e11321;
          }
          li {
            font-weight: 400;
            width: 33%;
            padding: 0 0 10px 10px;
            line-height: 20px;
            color: #666666;
            &:hover {
              color: #e11321;
              cursor: pointer;
            }
            &:active {
              opacity: 0.6;
            }
          }
        }
        hr {
          margin-left: -15px;
          border: 1px solid #cccccc;
          border-bottom: 0;
        }
      }
    }
    .news {
      width: 1094px;
      background-color: #ffffff;
      box-shadow: 0px 0px 5px 0px rgba(152, 152, 152, 0.4);
      .el-menu{
        padding: 30px 0 0 20px;
        border-bottom-color: #cccccc;
        .el-menu-item {
          margin-right: 40px;
          color: #666666;
          font-size: 16px;
        }
        .el-menu-item.is-active {
          border-bottom: 2px solid #e11321;
          color: #333333;
        }
      }
      &-article {
        a {
          text-decoration: none;
        }
        &-content {
          margin: 20px 30px;
          cursor: pointer;
          .pic{
            width: 223px;
            height: 167px;
            margin-right: 20px;
            img {
              object-fit: cover;
            }
          }
          .title {
            padding: 20px 0; 
            font: 18px SourceHanSansCN-Medium;
            font-weight: 500;
            color: #333333;
            line-height: 20px;
            height:60px;
            width:783px;
            text-overflow: ellipsis;
            overflow:hidden;
            white-space:nowrap;
            &:hover {
              opacity: 0.8;
            }
          }
          .content {
            height: 50px;
            width: 800px;
            color: #666666;
            line-height: 25px;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .time {
            margin-top: 25px;
            font-size: 12px;
            color: #999999;
            line-height: 18px;
          }
          hr {
            border: 1px solid #cccccc;
            border-bottom: 0;
            margin: -30px;
          }
        }
      }
      .pagination {
        margin: 50px auto;
        text-align: center;
        padding-right: 100px;
      }
    }
  }
}
</style>
<style lang="less">
.news-pagination {
  .el-input.is-focus,
  .el-input__inner:hover,
  .el-input__inner:focus {
    border-color: #e11321 !important;
  }
}
.news-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #e11321 !important;
}
.select-page .el-select-dropdown__item.selected {
  color: #e11321;
}
</style>
