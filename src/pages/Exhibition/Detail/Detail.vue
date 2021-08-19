<template>
  <div class="container">
    <HeaderBar />
    <div class="main">
      <div class="w">
        <div class="position">首页 > 展会服务 > 详情</div>
      </div>
      <div class="box">
        <div class="box-center">
          <div class="exhibition">
            <div class="cover">
              <el-image class="banner" :src="detailData.exhibitionUrl" />
            </div>
            <div class="info">
              <div class="name">{{ detailData.exhibitionName }}</div>
              <div class="desc">{{ detailData.exhibitionHallName }}</div>
              <div class="date">{{ detailData.exhibitionTime }}<span></span></div>
              <div class="address">举办地点：{{ detailData.cityName }}</div>
              <div class="other">
                <div class="price" v-if="detailData.exhibitionPrice">
                  ¥{{ detailData.exhibitionPrice.split('.')[0] || '' }}.<span
                    style="font-size: 16px"
                    >{{ detailData.exhibitionPrice.split('.')[1] || '' }}{{ detailData.unit }}</span
                  >
                </div>
                <div class="booking" @click="showExhibitorDialog">订购展位</div>
                <div class="message">
                  <el-checkbox
                    v-model="checked"
                    class="checkbox"
                    @change="onSubscribe(exhibitionId)"
                  ></el-checkbox
                  >订阅展会动态通知
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w content">
        <div class="tabs">
          <div
            :class="['item', current === item.id ? 'active' : '']"
            :key="item.id"
            v-for="item in tabs"
            @click="onClickTab(item.id)"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="inner">
          <!-- 展会介绍 -->
          <div class="bodyer" v-if="current === 1">
            <div v-html="detailData.exhibitionDesc"></div>
          </div>
          <!-- 展馆平面图 -->
          <div class="bodyer" v-if="current === 2">
            <div>
              <button class="btn" @click="download(detailData.exhibitionHallEnclosure, current)">
                下载展馆平面图
              </button>
            </div>
            <hr class="hr" />
            <div class="img">
              <el-image v-for="item in detailData.exhibitionHallPics" :key="item" :src="item" />
            </div>
          </div>
          <!-- 展位配置 -->
          <div class="bodyer" v-if="current === 3">
            <div>
              <button class="btn" @click="download(detailData.boothDeployEnclosure, current)">
                下载展位配置图
              </button>
            </div>
            <hr class="hr" />
            <div v-html="detailData.boothDeploy"></div>
          </div>
          <!-- 招展函 -->
          <div class="bodyer" v-if="current === 4">
            <div>
              <button class="btn" @click="download(detailData.invitationLetterEnclosure, current)">
                下载招展函
              </button>
            </div>
            <hr class="hr" />
            <div v-html="detailData.invitationLetter"></div>
          </div>
          <!-- 订购条件 -->
          <div class="bodyer" v-if="current === 5">
            <div v-html="detailData.exhibitionCondition"></div>
          </div>
        </div>
      </div>
    </div>
    <FooterBar />
    <!-- 提交参展信息 -->
    <exhibitor-dialog ref="exhibitorDialog" :detailData="detailData" />
  </div>
</template>
<script>
import ExhibitorDialog from '../components/ExhibitorDialog';

export default {
  components: {ExhibitorDialog},
  props: {},
  data() {
    return {
      current: 1,
      detailData: {},
      checked: false,
      tabs: [
        {
          id: 1,
          name: '展会介绍',
        },
        {
          id: 2,
          name: '展馆平面图',
        },
        {
          id: 3,
          name: '展位配置',
        },
        {
          id: 4,
          name: '招展函',
        },
        {
          id: 5,
          name: '订购条件',
        },
      ],
    };
  },
  methods: {
    pageLoad({exhibitionId}) {
      if (!this.$token) {
        this.navigateTo('/login');
        return;
      }
      this.exhibitionId = exhibitionId;
      this.loadData();
      this.subscribeNotice(this.exhibitionId);
    },
    loadData() {
      this.$api.exhibition.getExhibition({exhibitionId: this.exhibitionId}).then((res) => {
        this.detailData = res;
      });
    },
    //获取订阅状态
    subscribeNotice(exhibitionId) {
      this.$api.exhibition.subscribeNotice({exhibitionId}).then((res) => {
        if (res == 1) {
          this.checked = true;
        }
      });
    },
    // 订阅展会动态通知
    onSubscribe(exhibitionId) {
      this.$api.exhibition.subscribe({exhibitionId}).then((res) => {
        this.$dialog.toast(res);
      });
    },
    // 订购展位
    showExhibitorDialog() {
      if (!this.detailData.exhibitionSpecifications[0]?.id) {
        this.$dialog.toast('数据入录不完整，无法订购！');
        return;
      }
      this.$refs.exhibitorDialog.show();
    },
    //下载图片
    download(url, current) {
      let link = document.createElement('a');
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          link.href = URL.createObjectURL(blob);
          link.download = this.detailData.exhibitionName + '-' + this.tabs[current - 1].name;
          document.body.appendChild(link);
          link.click();
        });
    },
    // 点击导航
    onClickTab(id) {
      this.current = id;
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  .main {
    .position {
      margin: 20px 0 30px 0;
      color: #666;
    }
  }
  .box {
    height: 355px;
    background: url(../../../assets/images/exhibition_bg.png) no-repeat center center / cover;
    .box-center {
      width: 1440px;
      height: 355px;
      margin: auto;
      display: flex;
      align-items: center;

      .exhibition {
        display: flex;
        align-items: center;
        .cover {
          height: 206px;
          .banner {
            width: 335px;
            height: 100%;
          }
        }

        .info {
          padding-left: 31px;
          color: #fff;
          .name {
            font-size: 30px;
          }
          .desc {
            margin: 14px 0 20px 0;
            font-size: 20px;
          }
          .date {
            padding-left: 40px;
            font-size: 20px;
            background: url(../../../assets/images/icon_date.png) no-repeat left center;
            span {
              font-size: 16px;
            }
          }
          .address {
            margin: 12px 0;
            padding-left: 40px;
            font-size: 16px;
            background: url(../../../assets/images/icon_address.png) no-repeat 3px center;
          }
          .other {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .price {
              margin-right: 50px;
              font-size: 24px;
              span {
                font-size: 16px;
              }
            }
            .booking {
              margin: 0 40px 0 0;
              width: 128px;
              height: 40px;
              background: #e11321;
              border-radius: 4px;
              text-align: center;
              line-height: 40px;
              color: #fff;
              font-size: 16px;
              cursor: pointer;
            }
            .message {
              font-size: 14px;
              .el-checkbox {
                margin-right: 10px;
                display: inline-block;
                border-radius: 4px;
                border: none;
              }
            }
          }
        }
      }
    }
  }
  .content {
    margin-top: 21px;
    background-color: #fff;
    .tabs {
      height: 54px;
      display: flex;
      border-bottom: 1px solid #f30213;
      .item {
        padding: 0 30px;
        color: #333;
        font-size: 20px;
        line-height: 54px;
        cursor: pointer;
      }
      .active {
        background: #e11321;
        color: #fff;
      }
    }
    .inner {
      min-height: 400px;
      padding: 25px;
      .hr {
        border: 2px solid #ccc;
        border-bottom: none;
        margin-bottom: 20px;
      }
      .btn {
        padding: 12px 20px;
        color: #e11321;
        background-color: #fff;
        border: 2px solid #e11321;
        margin: 18px 0 22px;
      }
      .bodyer {
        .img {
          text-align: center;
        }
      }
    }
  }
}
</style>
