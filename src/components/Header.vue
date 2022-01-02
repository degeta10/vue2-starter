<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link to="/home" class="navbar-brand">
          <img src="../assets/logo.png" width="30" height="30" alt=""
        /></router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" v-if="!isAuthenticated">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item" v-if="!isAuthenticated">
              <router-link class="nav-link" to="/signup">Signup</router-link>
            </li>
            <li class="nav-item dropdown" v-if="isAuthenticated">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <font-awesome-icon icon="user-circle" class="mr-2" />{{
                  userName
                }}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link to="profile" class="dropdown-item">Profile</router-link>
                <button class="dropdown-item" @click="logout">Logout</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
export default {
  name: "Header",
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    userName() {
      return this.$store.getters["auth/user"].name;
    },
  },
  methods: {
    logout() {
      this.$axios.post("auth/logout").then((response) => {
        this.$store.dispatch("auth/logout").then((store) => {
          this.$router.push({ name: "login" });
        });
      });
    },
  },
};
</script>