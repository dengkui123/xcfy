<template>
  <div class="card" @click="onTapDetail">
    <div class="cover">
      <el-image :src="cardData.exhibitionUrl" />
    </div>
    <div class="title">
      <span :style="labelStyle(item)" v-for="(item, index) in cardData.labelNames" :key="index"
        >{{ item }}
      </span>
      {{ cardData.exhibitionName }}
    </div>
    <div class="middle content-between">
      <div class="date">{{ time }}</div>
      <div class="status" :style="dayColor(leftTime())">{{ leftTime() }}</div>
    </div>
    <div class="ft content-between">
      <div class="hot">
        <p>
          <em class="light-grey">展会热度 </em>
          <em class="grey">{{ cardData.hotNum }}</em>
        </p>
        <p><el-rate :value="exhibition.exhibitionStar" disabled></el-rate></p>
      </div>
      <div
        :class="['booking', cardData.subscribeStatus == '1' ? 'booked' : '']"
        @click.stop="onSubscribe"
      >
        {{ cardData.subscribeStatus == '1' ? '已订阅' : '订阅' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    exhibition: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    exhibition: {
      handler(val) {
        this.cardData = val;
        this.getTime();
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      cardData: {},
      time: '',
    };
  },
  methods: {
    getTime() {
      let time = this.cardData.exhibitionTime;
      time = time
        .replace(/—/g, '-')
        .replace(/([年月])/g, '.')
        .replace(/日/g, '');
      if (time[5] < 10) {
        time = time.slice(0, 5) + '0' + time.slice(5);
      }
      if (time[11] < 10) {
        time = time.slice(0, 11) + '0' + time.slice(11);
      }
      this.time = time;
    },
    leftTime: function() {
      let time = this.time;
      let newDate = Date.parse(new Date());
      let startDate = Date.parse(time.split('-')[0]);
      let endDate;
      if (time && time.split('-')[0].split('.')[1] < time.split('-')[1].split('.')[0]) {
        endDate = Date.parse(
          time
            .split('-')[0]
            .split('.')[0]
            .concat('.' + time.split('-')[1])
        );
      } else {
        endDate = Date.parse(
          parseInt(time.split('-')[0].split('.')[0])
            .toString()
            .concat('.' + time.split('-')[1])
        );
      }
      if (startDate > newDate) {
        return `距离开展${parseInt((startDate - newDate) / (1000 * 60 * 60 * 24)) + 1}天`;
      } else if (endDate + 1000 * 60 * 60 * 24 < newDate) {
        return '已结束';
      }
      return '开展中…';
    },
    labelStyle(item) {
      if (item == '精选') {
        return 'background:rgba(255,188,120,0.2);color:#ffa346;';
      } else if (item == '推荐') {
        return 'background:rgba(4,172,24,0.2);color:#04AC18;';
      }
      return 'background:rgba(241,5,5,0.2);color:#F10505;';
    },
    dayColor(val) {
      if (val == '已结束') {
        return 'color: #999999';
      } else if (val == '开展中…') {
        return 'color: #FF6D28';
      }
    },
    // 订阅
    onSubscribe() {
      if (!this.$token) {
        this.navigateTo('/login');
        return;
      }
      const {exhibitionId} = this.cardData;
      this.$api.exhibition.subscribe({exhibitionId}).then((res) => {
        this.cardData.subscribeStatus = +!Number(this.cardData.subscribeStatus);
        this.$dialog.toast(res);
      });
    },
    // 跳转详情
    onTapDetail() {
      if (!this.$token) {
        this.navigateTo('/login');
        return;
      }
      this.navigateTo(`/exhibition/detail?exhibitionId=${this.exhibition.exhibitionId}`);
    },
  },
};
</script>
<style lang="less" scoped>
.card {
  width: 276px;
  height: 335px;
  background: #ffffff;
  cursor: pointer;
  box-shadow: 0px 3px 8px 0px rgba(204, 204, 204, 0.36), 0px -3px 8px 0px rgba(204, 204, 204, 0.18);
  filter: blur(0px);
  .cover {
    &:hover {
      cursor: pointer;
    }
    height: 165px;
    .el-image {
      height: 100%;
    }
  }
  .title {
    height: 50px;
    margin: 10px;
    color: #333;
    font-size: 14px;
    overflow: hidden;
    span {
      display: inline-block;
      width: 40px;
      margin-right: 2px;
      height: 22px;
      border-radius: 4px;
      text-align: center;
    }
  }
  .middle {
    padding: 0 10px;
    .date {
      color: #999;
    }
    .status {
      color: #04ac18;
    }
  }
  .ft {
    margin-top: 10px;
    padding: 0 10px;
    .booking {
      width: 74px;
      height: 32px;
      background: #e11321;
      border-radius: 4px;
      line-height: 32px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
    }
    .booked {
      background: #bbb;
      color: #fff;
    }
  }
}
</style>
