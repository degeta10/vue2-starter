<template>
  <div class="row my-5">
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="handleSubmit">
        <div class="card">
          <div class="card-body">
            <h3 class="text-center my-4">Profile</h3>

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
                v-model="email"
                type="text"
                placeholder="Email"
                class="form-control"
                disabled
              />
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
                {{ loading ? "" : "Update" }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  required,
  requiredIf,
  minLength,
  sameAs,
} from "vuelidate/lib/validators";
export default {
  name: "Profile",
  data() {
    return {
      email: "",
      form: {
        name: "",
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
      password: { minLength: minLength(8) },
      password_confirmation: {
        required: requiredIf(function (form) {
          return form.password !== "";
        }),
        sameAsPassword: sameAs("password"),
      },
    },
  },
  mounted() {
    this.getUserDetails();
  },
  methods: {
    getUserDetails() {
      this.$axios.get("auth/me").then((response) => {
        const { data } = response.data;
        this.form.name = data.name;
        this.email = data.email;
      });
    },
    handleSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$nextTick(() => {
          this.scrollToError();
        });
        return;
      }
      this.updateProfile();
    },
    scrollToError() {
      let dom = document.querySelector(".is-invalid");
      let top = dom.offsetTop;
      window.scrollTo(0, top);
    },
    updateProfile() {
      this.loading = true;
      this.$axios
        .patch("auth/profile", this.form)
        .then((response) => {
          this.loading = false;
          this.submitted = true;
          this.form.password = this.form.password_confirmation = "";
          this.$store
            .dispatch("auth/updateUser", {
              name: this.form.name,
              email: this.email,
            })
            .then((store) => {
              this.$noty.success(response.data.message);
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