<template>
  <v-app>
    <Header></Header>

    <v-content>
      <landing-info></landing-info>
    </v-content>

    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import LandingInfo from "./components/LandingInfo.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    LandingInfo,
    Footer
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.footer {
  margin-right: 10px;
  min-height: 5vh;
}
</style>

