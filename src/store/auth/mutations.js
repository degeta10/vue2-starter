import axios from "axios";
import Vue from "vue";
import router from "../../router";

export default {
  loadAuthToken(state) {
    let data = JSON.parse(localStorage.getItem("auth"));
    if (data !== null) {
      state.accessType = data.token_type;
      state.accessToken = data.access_token;
      state.refreshToken = data.refresh_token;
      state.expiresAt = data.expires_at;
    }
  },
  saveAuthToken(state, payload) {
    localStorage.setItem("auth", JSON.stringify(payload));
    state.accessType = payload.token_type;
    state.accessToken = payload.access_token;
    state.refreshToken = payload.refresh_token;
    state.expiresAt = payload.expires_at;
  },
  refreshAuthToken(state, payload) {
    this.dispatch("app/setLoading", true);
    axios
      .post("auth/token/refresh", { token: payload })
      .then((response) => {
        this.dispatch("app/setLoading", false);
        this.state.app.isLoading = false;
        const { data } = response.data;
        localStorage.setItem("auth", JSON.stringify(data));
        state.accessToken = data.access_token;
        state.refreshToken = data.refresh_token;
        state.expiresAt = data.expires_at;
        console.log("completed mutation");
      })
      .catch((error) => {
        this.dispatch("app/setLoading", false);
        this.dispatch("auth/logout");
        Vue.noty.error("Session expired!");
        router.push("login");
      });
  },
  logout(state) {
    localStorage.removeItem("auth");
    state.accessType =
      state.accessToken =
      state.refreshToken =
      state.expiresAt =
        "";
  },
};
