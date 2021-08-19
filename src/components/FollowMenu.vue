<template>
  <div class="follow">
    <div class="follow-head">我关注的展会行业</div>
    <div class="follow-body">
      <ul class="flex ul">
        <li
          v-for="item in categoryVos"
          :key="item.categoryId"
          class="li"
          @click="goExhibition(item.categoryId)"
        >
          {{ item.industryName }}
        </li>
      </ul>
      <button class="follow-add" @click="btnAdd">
        <div class="follow-add-icon"></div>
        添加关注行业
      </button>
    </div>
    <div :class="[isCover ? 'popContainer' : 'hiddenContainer']">
      <div class="content-container">
        <button class="btn-close" @click="stopChooseIndustry"><i class="el-icon-close"></i></button>
        <ul class="list">
          <li class="li" v-for="item in cateList" :key="item.parentId">
            <ul class="flex sub-ul">
              <li
                class="sub-li"
                v-for="p in item.categoryVos"
                :key="p.categoryId"
                @click="onChangeCate(p.categoryId, item.parentId)"
                :class="{ active: p.checked }"
              >
                {{ p.categoryName }}
              </li>
            </ul>
            <hr />
          </li>
          <button class="btn-save" @click="onSubmit">保存</button>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      //关注行业列表
      categoryVos: [
        {
          categoryId: '',
          categoryName: '',
        },
      ],
      //选定的暂存行业
      isCover: false,
      //行业列表
      cateList: [],
    };
  },
  methods: {
    pageLoad() {
      this.getUserIndustry();
      this.getAllCategory();
    },
    // 获取关注的行业
    getUserIndustry() {
      this.$api.personalCenter.getUserIndustry().then((res) => {
        console.log(res);
        this.categoryVos = res || [];
      });
    },
    //查看相关展览
    goExhibition(categoryId) {
      this.navigateTo(`/exhibition?categoryId=${categoryId}`);
    },
    // 获取全部分类
    getAllCategory() {
      this.$api.exhibition.getAllCategory({isDomestic: 1}).then((res) => {
        this.cateList = res || [];
      });
    },
    //新增关注行业
    onSubmit() {
      const industryLists = this.checkIndustry();
      this.$api.personalCenter.addIndustry(industryLists).then((msg) => {
        this.$dialog.toast(msg);
        this.isCover = false;
        this.getUserIndustry();
      });
    },
    // 选择子行业
    onChangeCate(categoryId, parentId) {   
      this.cateList.forEach((item) => {
        if (item.parentId === parentId) {
          item.categoryVos.forEach((iItem) => {
            if (categoryId === iItem.categoryId) {
              this.$set(iItem, 'checked', !iItem.checked);
              if(!iItem.checked){
                const deleteId = this.categoryVos.filter((fItem) => {
                 return fItem.categoryId == iItem.categoryId;
                })[0].industryId;
                console.log('deleteId',deleteId);
                //this.$api.personalCenter.deleteIndustry({industryId:deleteCategory,token:window.$token})
                //.then((res) => {})
              } 
              
            }
          });
        }
      });
    },
    // 把选中的行业取出来
    checkIndustry() {
      const industryLists = [];
      this.cateList.forEach((item) => {
        const filterItem = item?.categoryVos.filter((Iitem) => Iitem.checked);
        if (!Array.isEmpty(filterItem)) {
          const childrenId = filterItem.map((fItem) => fItem.categoryId);
          industryLists.push({
            childrenId,
            parentId: item.parentId,
          });
        }
      });
      return industryLists;
    },
    //添加行业
    btnAdd() {
      this.cateList.forEach((item) =>{
        item?.categoryVos.forEach((iItem) => {
          if(!Array.isEmpty(this.categoryVos.filter((fItem) => fItem.categoryId === iItem.categoryId))){
            this.$set(iItem, 'checked', true);
          }
        });
      });
      this.isCover = true;
    },

    //取消选择
    stopChooseIndustry() {
      this.isCover = false;
    },
  },
};
</script>

<style lang="less" scoped>
.follow {
  &-head {
    font: 500 16px SourceHanSansCN-Medium;
    margin-bottom: 20px;
  }
  &-body {
    position: relative;
    margin-bottom: 70px;
    ul {
      flex-wrap: wrap;
      margin-right: 120px;
      .li {
        font-size: 12px;
        border: 1px solid #cccccc;
        border-radius: 2px;
        padding: 6px 9px;
        color: #999999;
        line-height: 12px;
        margin: 0 5px 10px 0;
        cursor: pointer;
        &:hover {
          border: 1px solid transparent;
          color: #fff;
          background-color: #e11321;
          transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
      }
    }
  }
  &-add {
    width: 111px;
    height: 24px;
    position: absolute;
    right: 0;
    top: 0;
    background: #e11321;
    color: #ffffff;
    font-size: 12px;
    text-align: right;
    padding-right: 9px;
    cursor: pointer;
    border-radius: 2px;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 1;
    }
    &-icon {
      position: absolute;
      top: 5px;
      left: 12px;
      width: 12px;
      height: 14px;
      background: url('../assets/images/user/follow-add.png') no-repeat center center / cover;
    }
  }
  .popContainer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.3);
    .content-container {
      z-index: 998;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .btn-close {
        top: -21px;
        right: -21px;
        z-index: 1000;
        position: absolute;
        border-radius: 50%;
        width: 42px;
        height: 42px;
        background: #666;
        color: #fff;
        cursor: pointer;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        &:hover {
          color: #e11321;
        }
      }
      .list {
        margin: auto;
        max-height: 756px;
        width: 1105px;
        overflow: auto;
        position: relative;
        background: #fff;
        .sub-ul {
          padding: 30px;
          flex-wrap: wrap;
          .sub-li {
            width: 103px;
            height: 37px;
            margin: 5px 13px;
            color: #666666;
            text-align: center;
            line-height: 37px;
            cursor: pointer;
            &:hover {
              color: #e11321;
            }
          }
          .active {
            color: #e11321;
            background-color: #f1f1f1;
          }
        }
        hr {
          border: 1px solid rgba(204, 204, 204, 0.7);
          border-bottom: none;
        }
        .btn-save {
          background: #e11321;
          border-radius: 2px;
          margin: 60px 504px;
          color: #fff;
          width: 97px;
          height: 32px;
          font-size: 12px;
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
    }
  }
  .hiddenContainer {
    display: none;
  }
}
</style>
