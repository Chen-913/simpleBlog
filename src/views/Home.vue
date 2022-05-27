<template>
  <div class="home-container">
    <h1>这是首页</h1>
    <div class="options">
        <button type="button" @click="generateArticle">首先点击这里生成30-60篇文章</button>
        <div class="tips">
          使用完不要忘记清理<b style="color:red;">localStorage</b>中的数据哦！
          <button type="button" @click="handleClearLocalStorage">点击这里清除</button>
        </div>
    </div>
  </div>
</template>

<script>
import Mock from 'mockjs';

export default {
  name: 'Home',
  methods: {
    generateArticle() {
      const dataTemplate = {
        'id|+1': 0,
        title: '@ctitle(3, 9)',
        content: '@cparagraph(1, 3)',
        // '2022-5-24' -- '2022-5-28'
        'createTime|1653321600000-1653667200000': 0,
      };
      // 生成多个数据后覆盖localStorage
      const { datas } = Mock.mock({
        'datas|30-60': [
          dataTemplate,
        ],
      });
      this.$store.dispatch('addArticles', datas);
      alert('生成文章成功！');
    },
    handleClearLocalStorage() {
      localStorage.removeItem('articleList');
      this.$store.commit('INIT_DATA');
      alert('清除成功！');
    },
  },
};
</script>
