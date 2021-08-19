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
            <th class="th4">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in remindList" :key="index">
            <td class="td1">{{ index + 1 }}</td>
            <td class="td2">{{ item.exhibitionName }}</td>
            <td class="td3">{{ item.subscriptionTime }}</td>
            <td class="td4">
              <span @click="subscribe(item.exhibitionId)">取消</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserRemindsetting",
  components: {},
  props: {},
  data() {
    return {
      remindList: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    pageLoad() {
      this.getSubscribeList();
    },
    //获取订阅
    getSubscribeList() {
      this.$api.personalCenter
        .getSubscribeList({ limit: 100, page: 1 })
        .then((res) => {
          console.log(res.result);
          this.remindList = res.result;
        });
    },
    subscribe(id) {
      this.remindList.splice(
        this.remindList.findIndex((item) => item.exhibitionId == id),
        1
      );
      this.$api.exhibition.subscribe({ exhibitionId: id }).then((res) => {
        console.log(res);
      });
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
        width: 136px;
      }
      .th2,
      .td2 {
        width: 400px;
      }
      .th3,
      .td3 {
        width: 182px;
      }
      .td4 {
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