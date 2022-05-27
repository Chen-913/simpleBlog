<template>
  <div class="pager-container">
    <span
      :class="{
        disabled: current === 1,
      }"
      @click="PageChange(1)"
      >&lt;&lt;</span
    >
    <span
      :class="{
        disabled: current === 1,
      }"
      @click="PageChange(current - 1)"
      >&lt;</span
    >

    <span
      v-for="(item, i) in numbers"
      :key="i"
      :class="{ active: current === item }"
      @click="PageChange(item)"
      >{{ item }}</span
    >

    <span
      :class="{
        disabled: current === pageNumber,
      }"
      @click="PageChange(current + 1)"
      >&gt;</span
    >
    <span
      :class="{
        disabled: current === pageNumber,
      }"
      @click="PageChange(pageNumber)"
      >&gt;&gt;</span
    >
  </div>
</template>

<script>
export default {
  props: {
    current: {
      // 当前页码
      type: Number,
      default: 1,
    },
    total: {
      // 总的数据量
      type: Number,
      default: 0,
    },
    limit: {
      // 每页的容量
      type: Number,
      default: 5,
    },
    visibleNumber: {
      // 可见页码数
      type: Number,
      default: 5,
    },
  },

  computed: {
    pageNumber() {
      // 总页数
      return Math.ceil(this.total / this.limit);
    },
    minIndex() {
      // 显示的最小页码
      const min = this.current - Math.floor(this.visibleNumber / 2);
      return min < 1 ? 1 : min;
    },
    maxIndex() {
      // 显示的最大页码
      const max = this.minIndex + this.visibleNumber + 1;
      return max > this.pageNumber ? this.pageNumber : max;
    },
    numbers() {
      // 当前需要显示的页码数组
      const arr = [];
      for (let i = this.minIndex; i <= this.maxIndex; i += 1) {
        arr.push(i);
      }
      return arr;
    },
  },
  methods: {
    PageChange(pageIndex) {
      // 一个页码改变的处理函数，由于子组件不能改变props传入的数据
      // 所以需要使用this.$emit方法通知父组件改变传入的数据
      let pIndex = pageIndex;
      if (pIndex < 1) {
        pIndex = 1;
      }
      if (pIndex > this.pageNumber) {
        pIndex = this.pageNumber;
      }
      if (pIndex === this.current) {
        return;
      }

      // 抛出一个事件
      this.$emit('page-change', pIndex);
    },
  },
};
</script>

<style lang="less" scoped>
.pager-container {
  display: flex;
  justify-content: center;
  align-content: center;

  span {
    display: block;
    padding: 5px 8px;
    cursor: pointer;
    font-size: inherit;
    margin: 10px 5px;
    text-align: center;
    border: 1px solid #202020;
    color: #6b9eee;
    font-weight: bold;
    user-select: none;

    &.disabled {
      color: #999;
      cursor: not-allowed;
    }

    &.active {
      color:#202020;
    }
  }
}
</style>
