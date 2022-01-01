<template>
  <div class="row my-5">
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="signUp">
        <div class="card">
          <div class="card-body">
            <h3 class="text-center my-4">Signup</h3>
            <div class="form-group">
              <input
                v-bind:class="{
                  'is-invalid': errors.name,
                  'is-valid': !errors.name && this.submitted,
                }"
                v-model="form.name"
                type="text"
                placeholder="Name"
                class="form-control"
              />
              <ul class="errors list-unstyled" v-if="errors.name">
                <li
                  class="text-danger small"
                  :key="error"
                  v-for="error in errors.name"
                >
                  {{ error }}
                </li>
              </ul>
            </div>
            <div class="form-group">
              <input
                v-bind:class="{
                  'is-invalid': errors.email,
                  'is-valid': !errors.email && this.submitted,
                }"
                v-model="form.email"
                type="text"
                placeholder="Email"
                class="form-control"
              />
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
                  'is-invalid': errors.password,
                  'is-valid': !errors.password && this.submitted,
                }"
                v-model="form.password"
                type="password"
                placeholder="Password"
                class="form-control"
              />
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
            <div class="form-group">
              <input
                v-bind:class="{
                  'is-invalid': errors.password_confirmation,
                  'is-valid': !errors.password_confirmation && this.submitted,
                }"
                v-model="form.password_confirmation"
                type="password"
                placeholder="Confirm Password"
                class="form-control"
              />
              <ul
                class="errors list-unstyled"
                v-if="errors.password_confirmation"
              >
                <li
                  class="text-danger small"
                  :key="error"
                  v-for="error in errors.password_confirmation"
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
                {{ loading ? "" : "Signup" }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      errors: {},
      submitted: false,
      loading: false,
    };
  },
  methods: {
    signUp() {
      this.loading = true;
      this.$axios
        .post("auth/signup", this.form)
        .then((response) => {
          this.loading = false;
          this.submitted = true;
          this.$noty.success(response.data.message);
          this.$router.push("login");
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