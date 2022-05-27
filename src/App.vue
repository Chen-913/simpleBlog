<template>
  <div id="app">
    <Layout>
      <template v-slot:sidebar>
        <MenuBar />
      </template>
      <template #main>
        <keep-alive>
          <router-view />
        </keep-alive>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout.vue';
import MenuBar from './views/MenuBar.vue';

export default {
  components: {
    Layout,
    MenuBar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding:0 250px;
  height: 100%;
  overflow: auto;
}
</style>
