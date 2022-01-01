export default {
  loadAuthToken({ state, commit }) {
    commit("loadAuthToken");
  },
  saveAuthToken({ state, commit }, payload) {
    commit("saveAuthToken", payload);
  },
  refreshAuthToken({ state, commit }, payload) {
    commit("refreshAuthToken", payload);
  },
  logout({ state, commit }) {
    commit("logout");
  },
};
