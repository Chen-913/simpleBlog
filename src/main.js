import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css';
import './style/common.less';
import './filters/index';

// 一开始需要加载数据
store.dispatch('loadData');

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
