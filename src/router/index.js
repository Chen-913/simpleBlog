import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import(/* webpackChunkName: "article" */ '../views/ArticleList.vue'),
  },
  {
    path: '/article/detail/:articleId',
    name: 'ArticleDetail',
    component: () => import(/* webpackChunkName: "articleDetail" */ '../views/ArticleDetail.vue'),
  },
  {
    path: '/add-article',
    name: 'AddArticle',
    component: () => import(/* webpackChunkName: "article" */ '../views/CreateArticle.vue'),
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
