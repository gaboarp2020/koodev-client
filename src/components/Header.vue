<template>
  <div>
    <v-toolbar app>
      <img src="../assets/logo.png" height="150" alt />
      <v-toolbar-title class="headline text-uppercase">
        <span>KooDev</span>
        <span class="font-weight-light ml-2">Warehouse</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="font-weight-light mr-2">Latest Release</span>
      <login-modal></login-modal>
    </v-toolbar>
  </div>
</template>

<script>
import LoginModal from "@/components/LoginModal.vue";

export default {
  name: "Header",
  components: {
    LoginModal
  }
};
</script>

<style scoped>
</style>