<template>
  <div class="content">
    <FollowMenu />
    <div class="remind">
      <div class="remind-title">展会提醒</div>
      <hr class="hr" />
      <table class="tb">
        <thead>
          <tr>
            <th class="th1">序号</th>
            <th class="th2">展会名称</th>
            <th class="th3">订阅时间</th>
            <th class="th4">状态</th>
            <th class="th5">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in remindList" :key="index">
            <td class="td1">{{ index + 1 }}</td>
            <td class="td2">{{ item.exhibitionName }}</td>
            <td class="td3">{{ item.subscriptionTime }}</td>
            <td class="td4" :style="stateColor(item.readingState)">
              {{ state(item.readingState) }}
            </td>
            <td class="td5">
              <span @click="read(item.exhibitionId, item.remindId)">阅读</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserRemind",
  components: {},
  props: {},
  data() {
    return {
      remindList: [
        {
          exhibitionId: 111,
          exhibitionName: "上海国际调味酱料产品及包装技术展览",
          readingState: "0",
          remindId: 0,
        },
        {
          exhibitionId: 222,
          exhibitionName: "上海国际调味酱料产品及包装技术展览",
          readingState: "0",
        },
        {
          exhibitionId: 333,
          exhibitionName: "上海国际调味酱料产品及包装技术展览",
          readingState: "1",
        },
        {
          exhibitionId: 444,
          exhibitionName: "上海国际调味酱料产品及包装技术展览",
          readingState: "1",
        },
      ],
    };
  },
  watch: {
    remindList: {
      handler(val) {
        console.log(val);
      },
      immediate: true,
    },
  },
  computed: {},
  methods: {
    pageLoad() {
      this.getRemindList();
    },
    getRemindList() {
      this.$api.subscribe
        .getRemindList({ limit: 100, page: 1, token: window.$token })
        .then((res) => {
          console.log("remindlist", res.result);
          this.remindList = res.result;
        });
    },
    read(exhibitionId, remindId) {
      this.$api.subscribe
        .read({ remindId: remindId, token: window.$token })
        .then((res) => {
          console.log(res);
        });
      this.navigateTo(`/exhibition/detail?exhibitionId=${exhibitionId}`);
    },
    stateColor(val) {
      if (val == "0") {
        return "color: #e11321";
      } else {
        return "";
      }
    },
    state(val) {
      if (val == "0") {
        return "未读";
      } else {
        return "已读";
      }
    },
  },
  mounted() {},
  created() {},
};
</script>

<style lang="less" scoped>
.content {
  padding: 47px 100px 90px 100px;
  font-size: 12px;
  .remind {
    &-title {
      color: #333;
      font: 500 14px SourceHanSansCN-Medium;
      margin-bottom: 9.5px;
    }
    .hr {
      border: 1px dashed #ccc;
      border-bottom: none;
    }
    .tb {
      color: #666;
      margin-top: 16.5px;
      width: 853px;
      border-collapse: collapse;
      border: 1px solid #ccc;
      th {
        border: 1px solid rgba(204, 204, 204, 0.4);
        background-color: #f3f3f3;
        height: 40px;
      }
      td {
        border: 1px solid rgba(204, 204, 204, 0.4);
        text-align: center;
        height: 40px;
      }
      .th1,
      .td1 {
        width: 100px;
      }
      .th2,
      .td2 {
        width: 400px;
      }
      .th3,
      .td3 {
        width: 150px;
      }
      .th4,
      .td4 {
        width: 100px;
      }
      .td5 {
        color: #037aff;
        &:hover {
          opacity: 0.6;
        }
        span {
          padding: 10px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>