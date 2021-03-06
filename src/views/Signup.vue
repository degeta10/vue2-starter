<template>
  <div class="row my-5">
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="handleSubmit">
        <div class="card">
          <div class="card-body">
            <h3 class="text-center my-4">Signup</h3>
            <div class="form-group">
              <input
                v-bind:class="{
                  'is-invalid': errors.name || $v.form.name.$error,
                  'is-valid': !errors.name && submitted,
                }"
                v-model="form.name"
                type="text"
                placeholder="Name"
                class="form-control"
              />
              <div v-if="!$v.form.name.required" class="invalid-feedback">
                Name is required!
              </div>
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
              <div v-if="!$v.form.password.minLength" class="invalid-feedback">
                Password must have minimum 8 characters!
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
            <div class="form-group">
              <input
                v-bind:class="{
                  'is-invalid':
                    errors.password_confirmation ||
                    $v.form.password_confirmation.$error,
                  'is-valid': !errors.password_confirmation && submitted,
                }"
                v-model="form.password_confirmation"
                type="password"
                placeholder="Confirm Password"
                class="form-control"
              />
              <div
                v-if="!$v.form.password_confirmation.required"
                class="invalid-feedback"
              >
                Confirmation password is required!
              </div>
              <div
                v-if="!$v.form.password_confirmation.sameAsPassword"
                class="invalid-feedback"
              >
                Confirmation password doesn't match!
              </div>
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
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
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
  validations: {
    form: {
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(8) },
      password_confirmation: { required, sameAsPassword: sameAs("password") },
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
      this.signUp();
    },
    scrollToError() {
      let dom = document.querySelector(".is-invalid");
      let top = dom.offsetTop;
      window.scrollTo(0, top);
    },
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