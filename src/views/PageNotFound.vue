<template>
  <v-app inspire>
    <v-container>
      <v-layout>
        <v-flex>
          <v-flex column cols="4" offset="4">
            <v-card>
              <v-card-title class="info white--text subheading" primary-title>
                <span class="title">Oops!</span>
              </v-card-title>
              <v-card-text class="display-1 ma-7 text-center">404. No tenemos esa página :'(.</v-card-text>
              <v-card-actions>
                <v-btn text block class="info darken-3 white--text" to="/">
                  <v-icon left v-text="'mdi-arrow-left'" />Back
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>

<style scoped>
</style>
