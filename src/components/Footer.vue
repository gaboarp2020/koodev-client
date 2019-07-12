<template>
  <div>
      <v-footer height="auto" color="blue darken-1">
        <v-layout justify-center row wrap>
          <v-flex blue darken-1 py-3 text-xs-center white--text xs12>
            <strong class="subheading">Koodev Warehouse</strong>
            <span> - Todos los derechos reservados</span>
            &copy; {{today}}
          </v-flex>
        </v-layout>
      </v-footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    today() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="stylus" scoped></style>
