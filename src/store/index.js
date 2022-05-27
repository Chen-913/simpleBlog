import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articleList: [],
    screenedArticle: {},
  },
  getters: {
    lastArticle(state) {
      const len = state.articleList.length;
      if (len >= 0) {
        return state.articleList[len - 1];
      }
      return null;
    },
    baseInfoList(state) {
      if (state.articleList.length !== 0) {
        return state.articleList.map((item) => ({
          id: item.id,
          title: item.title,
          createTime: item.createTime,
        }));
      }
      return [];
    },
    totalArticle(state) {
      return state.articleList.length;
    },
  },
  mutations: {
    SET_ARTICLELIST(state, payload) {
      state.articleList = payload;
    },
    STORE_DATA(state) {
      localStorage.setItem('articleList', JSON.stringify(state.articleList));
    },
    ADD_ARTICLE(state, payload) {
      state.articleList.push(payload);
      const timeStr = (new Date(payload.createTime)).toLocaleDateString();
      if (!state.screenedArticle[timeStr]) {
        // 如果没有该键，则直接创建
        state.screenedArticle[timeStr] = [];
      }
      state.screenedArticle[timeStr].push(Object.freeze(payload));
    },
    INIT_SCREENED_ARTICLE(state) {
      state.articleList.forEach((item) => {
        const timeStr = (new Date(item.createTime)).toLocaleDateString();
        if (!state.screenedArticle[timeStr]) {
          // 如果没有该键，则直接创建
          state.screenedArticle[timeStr] = [];
        }
        state.screenedArticle[timeStr].push(Object.freeze(item));
      });
    },
    INIT_DATA(state) {
      state.articleList = [];
      state.screenedArticle = { };
    },
  },
  actions: {
    loadData({ commit }) {
      const articleList = localStorage.getItem('articleList');
      if (articleList) {
        let payload = JSON.parse(articleList);
        payload = payload.map((item) => Object.freeze(item));
        commit('SET_ARTICLELIST', payload);
      } else {
        commit('SET_ARTICLELIST', []);
      }
      commit('INIT_SCREENED_ARTICLE');
    },
    addArticle({ commit }, payload) {
      commit('ADD_ARTICLE', Object.freeze(payload));
      commit('STORE_DATA');
    },
    addArticles({ commit }, payload) {
      commit('SET_ARTICLELIST', payload);
      commit('STORE_DATA');
      commit('INIT_SCREENED_ARTICLE');
    },
  },
});
