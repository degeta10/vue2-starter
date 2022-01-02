<template>
  <div class="row my-5">
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="handleSubmit">
        <div class="card">
          <div class="card-body">
            <h3 class="text-center my-4">Login</h3>

            <div class="form-group">
              <input
                v-bind:class="{
                  'is-invalid': errors.email || $v.form.email.$error,
                  'is-valid': !errors.email && submitted,
                }"
                v-model="form.email"
                type="text"
                placeholder="Email"
                class="form-control"
              />
              <div v-if="!$v.form.email.email" class="invalid-feedback">
                Please enter a valid email!
              </div>
              <div v-if="!$v.form.email.required" class="invalid-feedback">
                Email is required!
              </div>
              <ul class="errors list-unstyled" v-if="errors.email">
                <li
                  class="text-danger small"
                  :key="error"
                  v-for="error in errors.email"
                >
                  {{ error }}
                </li>
              </ul>
            </div>
            <div class="form-group">
              <input
                v-bind:class="{
                  'is-invalid': errors.password || $v.form.password.$error,
                  'is-valid': !errors.password && submitted,
                }"
                v-model="form.password"
                type="password"
                placeholder="Password"
                class="form-control"
              />
              <div v-if="!$v.form.password.required" class="invalid-feedback">
                Password is required!
              </div>
              <ul class="errors list-unstyled" v-if="errors.password">
                <li
                  class="text-danger small"
                  :key="error"
                  v-for="error in errors.password"
                >
                  {{ error }}
                </li>
              </ul>
            </div>
            <div class="form-group text-center">
              <button
                type="submit"
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
      </form>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: {},
      submitted: false,
      loading: false,
    };
  },
  validations: {
    form: {
      email: { required, email },
      password: { required },
    },
  },
  methods: {
    handleSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$nextTick(() => {
          this.scrollToError();
        });
        return;
      }
      this.login();
    },
    scrollToError() {
      let dom = document.querySelector(".is-invalid");
      let top = dom.offsetTop;
      window.scrollTo(0, top);
    },
    login() {
      this.loading = true;
      this.$axios
        .post("auth/login", this.form)
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