<template>
  <div class="jumbotron">
    <h1 class="display-4">Welcome {{ name }}!</h1>
    <p class="lead">
      This is a simple hero unit, a simple jumbotron-style component for calling
      extra attention to featured content or information.
    </p>
    <hr class="my-4" />
    <p>
      It uses utility classes for typography and spacing to space content out
      within the larger container.
    </p>
    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      name: "",
      email: "",
    };
  },
  mounted() {
    this.getUserDetails();
  },
  methods: {
    getUserDetails() {
      this.$axios.get("auth/me").then((response) => {
        const { data } = response.data;
        this.name = data.name;
        this.email = data.email;
      });
    },
  },
};
</script>