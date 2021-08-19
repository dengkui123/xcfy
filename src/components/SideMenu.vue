<template>
  <div class="menus">
    <div
      class="li"
      v-for="item in list"
      :key="item[val]"
      :class="{active: item[val] === activeId}"
      @click="onClick(item)"
    >
      <div>{{ item[name] }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  components: {},
  props: {
    name: {
      type: String,
      default: 'name',
    },
    val: {
      type: [String, Number],
      default: 'id',
    },
    list: {
      type: Array,
      default: () => [],
    },
    current: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      activeId: 0,
    };
  },
  watch: {
    list: {
      handler(arr) {
        if (!Array.isEmpty(arr)) {
          this.activeId = arr[this.current][this.val];
        }
      },
      immediate: true,
    },
  },
  computed: {},
  methods: {
    onClick(item) {
      this.activeId = item[this.val];
      this.$emit('on-click', item);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.menus {
  background: #fff;
  .li {
    display: flex;
    align-items: center;
    justify-items: center;
    padding-left: 32px;
    height: 56px;
    box-shadow: 0px 0px 5px 0px rgba(152, 152, 152, 0.4);
    color: #333333;
    font-size: 14px;
    font-weight: bold;
    position: relative;
    cursor: pointer;
  }
  .active {
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 5px;
      background: #f30213;
    }
  }
}
</style>
