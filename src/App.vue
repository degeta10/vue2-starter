 <template>
  <div id="app">
    <Header />
    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
    <div class="container py-4"><router-view /></div>
    <Footer />
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Loading from "vue-loading-overlay";

export default {
  name: "App",
  components: {
    Header,
    Footer,
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