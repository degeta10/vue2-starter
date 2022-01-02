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
      state.user = data.user;
    }
  },
  updateUser(state, payload) {
    localStorage.setItem("user", JSON.stringify(payload));
    state.user = payload;
  },
  saveAuthToken(state, payload) {
    let auth = Object.assign({}, payload);
    delete auth.message;
    delete auth.user;
    localStorage.setItem("auth", JSON.stringify(auth));
    localStorage.setItem("user", JSON.stringify(payload.user));
    state.accessType = payload.token_type;
    state.accessToken = payload.access_token;
    state.refreshToken = payload.refresh_token;
    state.expiresAt = payload.expires_at;
    state.user = payload.user;
  },
  refreshAuthToken(state, payload) {
    this.dispatch("app/setLoading", true);
    axios
      .post("auth/token/refresh", { token: payload })
      .then((response) => {
        this.dispatch("app/setLoading", false);
        this.state.app.isLoading = false;
        const { data } = response.data;
        let auth = Object.assign({}, data);
        delete auth.message;
        localStorage.setItem("auth", JSON.stringify(auth));
        state.accessType = data.token_type;
        state.accessToken = data.access_token;
        state.refreshToken = data.refresh_token;
        state.expiresAt = data.expires_at;
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
      state.user =
        "";
  },
};
