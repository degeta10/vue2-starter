<template>
  <footer class="py-2 navbar fixed-bottom bg-light">
    <div class="container justify-content-center">
      <span
        >Place footer content here &copy;&nbsp;{{
          projectDate.getFullYear()
        }}</span
      >
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      projectDate: new Date(),
    };
  },
};
</script>