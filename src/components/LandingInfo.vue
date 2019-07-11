<template>
  <v-app class="bg-grey">
    <v-container>
      <v-layout text-xs-center wrap mt-5>
        <v-flex md6>
          <v-img :src="require('../assets/2085405.jpg')" contain height="440"></v-img>
        </v-flex>
        <v-layout justify-center align-center>
          <v-flex md6 pa-3 card>
            <h1 class="display-2 font-weight-uppercase mb-3">Koodev Warehouse</h1>
            <div class="division"></div>
            <p class="subheading font-weight-regular">
              Conoce los datos
              <br />Toma mejores decisiones
            </p>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "LandingInfo",
  data() {
    return {};
  }
};
</script>

<style scoped>
.bg-grey {
  background-color: #e0e0e0;
  margin-top: -64px;
}
.full-height {
  min-height: 100vh;
}
.card {
  background-color: white;
  border: solid white;
  border-radius: 2px;
  -webkit-box-shadow: 7px 8px 11px -5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 7px 8px 11px -5px rgba(0, 0, 0, 0.75);
  box-shadow: 7px 8px 11px -5px rgba(0, 0, 0, 0.75);
}
.division {
  border-bottom: solid grey;
  width: 60px;
  margin: auto;
  margin-bottom: 10px;
}
</style>
