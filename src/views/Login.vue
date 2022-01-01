<template>
  <div class="row my-5">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-body">
          <h3 class="text-center my-4">Login</h3>
          <div class="form-group">
            <input
              v-bind:class="{
                'is-invalid': errors.email,
                'is-valid': !errors.email && this.submitted,
              }"
              v-model="email"
              type="text"
              placeholder="Email"
              class="form-control"
            />
            <div class="errors" v-if="errors.email">
              <small
                class="text-danger"
                :key="error"
                v-for="error in errors.email"
                >{{ error }}</small
              >
            </div>
          </div>
          <div class="form-group">
            <input
              v-bind:class="{
                'is-invalid': errors.password,
                'is-valid': !errors.password && this.submitted,
              }"
              v-model="password"
              type="password"
              placeholder="Password"
              class="form-control"
            />
            <div class="errors" v-if="errors.password">
              <small
                class="text-danger"
                :key="error"
                v-for="error in errors.password"
                >{{ error }}</small
              >
            </div>
          </div>
          <div class="form-group text-center">
            <button
              @click="login()"
              :disabled="loading"
              class="btn form-control primary-el"
            >
              <font-awesome-icon
                icon="spinner"
                class="fa-spin"
                v-if="loading"
              />
              {{ loading ? "" : "Login" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errors: {},
      submitted: false,
      loading: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$axios
        .post("auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.loading = false;
          this.submitted = true;
          const { data } = response.data;
          this.$store.dispatch("auth/saveAuthToken", data).then((store) => {
            this.$router.push({ name: "home" });
            this.$noty.success("Welcome back!");
          });
        })
        .catch(({ response }) => {
          this.loading = false;
          this.submitted = true;
          this.errors = response.data;
        });
    },
  },
};
</script>