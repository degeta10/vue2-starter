 <template>
  <div id="app">
    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
    <navbar />
    <div class="container py-4"><router-view /></div>
  </div>
</template>
<script>
import Navbar from "./components/Navbar.vue";
import Loading from "vue-loading-overlay";

export default {
  name: "App",
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      fullPage: true,
    };
  },
  created() {
    this.$store.dispatch("auth/loadAuthToken");
  },
  computed: {
    isLoading() {
      return this.$store.getters["app/isLoading"];
    },
  },
};
</script>

<style lang="scss">
/* Global SCSSS */
</style>