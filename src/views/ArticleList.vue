<template>
  <div class="article-container">
    <h1>文章列表</h1>
    <div class="date" v-if="baseInfoList.length">
      选择日期：
      <select  name="date" id="date" v-model="selectedTime" @change="handleSelectTime">
        <option value="all">全部</option>
        <option v-for="item in dateList" :key="item" :value="item" >{{item}}</option>
      </select>
    </div>
    <ul v-if="baseInfoList.length">
      <li v-for="item in articleList" :key="item.id">
        <div class="title">
          <router-link :to="{
            params:{
              articleId:item.id
            },
            name:'ArticleDetail'
          }"><h3>{{item.title}}</h3></router-link>
        </div>
        <div class="info">
          <!-- 显示日期 -->
          <span>{{ item.createTime | dateFormat("YYYY-MM-DD") }}</span>
        </div>
      </li>
    </ul>
    <div v-else>暂无文章记录</div>
    <!-- 分页组件 -->
    <Pager
    style="margin-top: 20px;"
    v-if="baseInfoList.length"
    :total="isTimeSelect?articleList.length:baseInfoList.length"
    :current="current"
    @page-change='handlePageChange' />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Pager from '@/components/Pager.vue';
import getArticleByPage from '@/utils/getArticleByPage';

export default {
  components: {
    Pager,
  },
  data() {
    return {
      articleList: [],
      current: 1,
      limit: 5,
      selectedTime: 'all',
      isTimeSelect: false,
    };
  },
  created() {
    if (this.current < 1) this.articleList = [];
    const startIndex = (this.current - 1) * this.limit;
    const endIndex = this.current * this.limit;
    this.articleList = this.$store.getters.baseInfoList.slice(startIndex, endIndex + 1);
  },
  computed: {
    ...mapGetters(['baseInfoList']),
    dateList() {
      return Object.keys(this.$store.state.screenedArticle);
    },
  },
  methods: {
    handlePageChange(pageIndex) {
      this.current = pageIndex;
      let tempList = null;
      if (this.isTimeSelect) {
        tempList = this.$store.state.screenedArticle[this.selectedTime];
        this.articleList = getArticleByPage(pageIndex, 5, tempList);
      } else {
        tempList = this.$store.getters.baseInfoList;
        this.articleList = getArticleByPage(pageIndex, 5, tempList);
      }
    },
    handleSelectTime() {
      this.current = 1;
      this.isTimeSelect = true;
      if (this.selectedTime === 'all') {
        this.isTimeSelect = false;
        this.articleList = getArticleByPage(this.current, 5, this.$store.getters.baseInfoList);
        return;
      }
      const tempList = this.$store.state.screenedArticle[this.selectedTime];
      this.articleList = getArticleByPage(this.current, 5, tempList);
    },
  },
};
</script>

<style lang='less' scoped>
.article-container{
  ul{
    li{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right:20px;
      border-bottom: 1px solid #eee;
      .title{
        width: 300px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
      }
    }
  }
}
</style>
