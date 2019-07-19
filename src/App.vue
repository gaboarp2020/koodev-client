<template>
  <v-app>
    <Header></Header>

    <v-content>
      <router-view></router-view>
    </v-content>

    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Footer
  },
  data () {
    return {}
  }
}
</script>

<style>

html {
  scroll-behavior: smooth;
}
</style>
