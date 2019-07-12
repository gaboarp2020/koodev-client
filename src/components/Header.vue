<template>
  <div>
    <v-toolbar app>
      <img src="../assets/logo.png" height="130" alt />
      <v-toolbar-title class="headline text-uppercase hidden-sm-and-down">
        <span>KooDev</span>
        <span class="font-weight-light ml-2">Warehouse</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-xs-only">
        <span class="font-weight-light mr-2">Latest Release</span>
        <register-modal></register-modal>
        <login-modal></login-modal>
      </div>
      <v-toolbar-side-icon class="hidden-sm-and-up"></v-toolbar-side-icon>
    </v-toolbar>
  </div>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue'
import RegisterModal from '@/components/RegisterModal.vue'

export default {
  name: 'Header',
  components: {
    LoginModal,
    RegisterModal
  }
}
</script>

<style scoped>
</style>
