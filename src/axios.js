import Vue from "vue";
import axios from "axios";
import store from "./store";
import router from "./router";
import createAuthRefreshInterceptor from "axios-auth-refresh";

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.request.use((request) => {
  if (store.getters["auth/isAuthenticated"]) {
    request.headers[
      "Authorization"
    ] = `${store.getters["auth/accessType"]} ${store.getters["auth/accessToken"]}`;
  }
  return request;
});

const refreshTokenLogic = (failedRequest) =>
  new Promise((resolve, reject) => {
    store.dispatch("app/setLoading", true);
    axios
      .post("auth/token/refresh", { token: store.getters["auth/refreshToken"] })
      .then(
        (response) => {
          store.dispatch("app/setLoading", false);
          const { data } = response.data;
          store.dispatch("auth/saveAuthToken", data).then(() => {
            failedRequest.response.config.headers[
              "Authorization"
            ] = `${store.getters["auth/accessType"]} ${store.getters["auth/accessToken"]}`;
            return Promise.resolve();
          });
          resolve(response);
        },
        (error) => {
          store.dispatch("app/setLoading", false);
          store.dispatch("auth/logout");
          Vue.noty.error("Session expired!");
          router.push("login");
          reject(error);
        }
      );
  });
createAuthRefreshInterceptor(axios, refreshTokenLogic);
Vue.prototype.$axios = axios;
