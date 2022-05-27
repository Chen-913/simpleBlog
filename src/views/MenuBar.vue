<template>
  <div class="menu-container">
    <ul>
      <li :class="{
        active:currentPage==='/'
      }">
        <router-link to="/">首页</router-link>
      </li>
      <li :class="{
        active:currentPage==='/article'
      }">
        <router-link to="/article">文章列表</router-link>
      </li>
      <li :class="{
        active:currentPage==='/add-article'
      }">
        <router-link to="/add-article">添加文章</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    currentPage() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped lang="less">
.menu-container{
  position:sticky;
  top: 20px;
  width: inherit;
  ul{
    border: 1px solid;
    padding: 10px;
    li{
      height: 30px;
      line-height: 30px;
      transition:all 0.5s;
      cursor: pointer;
      &.active{
        color:#6b9eee;
        background: #eee;
      }
      &:hover{
        background-color: #eee;
      }
      a{
        display: block;
        height: 100%;
      }
    }
  }
}
</style>
