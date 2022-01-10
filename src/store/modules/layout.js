export default {
  namespaced: true,
  state: {
    tagsList: [],
    collapse: false,
  },
  mutations: {
    clearTags(state) {
      state.tagsList = [];
    },
    // 侧边栏折叠
    hadndleCollapse(state, data) {
      state.collapse = data;
    },
  },
  actions: {},
  getters: {},
};
