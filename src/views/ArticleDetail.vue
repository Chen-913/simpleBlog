<template>
  <div class="article-detail-container">
    <h1>{{ articleData.title }}</h1>
    <div class="info">
      <span>日期：{{ articleData.createTime | dateFormat("YYYY-MM-DD") }}</span>
    </div>
    <!-- 文章内容 -->
    <div class="content" v-html="articleData.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleData: null,
    };
  },
  methods: {
    getArticleById(articleId) {
      const id = +articleId;
      return this.$store.state.articleList.find((item) => {
        if (item.id === id) return true;
        return false;
      });
    },
  },
  created() {
    this.articleData = this.getArticleById(this.$route.params.articleId);
  },
  watch: {
    $route(newVal) {
      const { articleId } = newVal.params;
      if (articleId) {
        this.articleData = this.getArticleById(articleId);
      }
    },
  },
};
</script>

<style lang='less' scoped>
.article-detail-container{
  .info {
    font-size: 14px;
    color: #eee;
    margin-bottom: 20px;
    span {
      margin-left: 10px;
    }
  }
}
</style>
