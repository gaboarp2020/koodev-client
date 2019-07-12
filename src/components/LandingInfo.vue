<template>
  <v-app>
    <section class="bg-grey">
      <v-container>
        <v-layout justify-center align-center wrap>
          <v-flex xs12 md6>
            <v-card color="blue lighten-2" class="white--text">
              <v-card-title primary-title>
                <div>
                  <h1 text-sm-center class="display-2 font-weight-uppercase mb-3">Koodev Warehouse</h1>
                </div>
              </v-card-title>
              <v-card-text>
                <p class="display-1 font-weight-regular">
                  <v-icon large text-sm-left color="blue darken-1">check</v-icon>Conoce los datos
                </p>
                <p class="display-1 font-weight-regular">
                  <v-icon large text-sm-left color="blue darken-1">check</v-icon>Toma mejores decisiones
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn flat dark href="#how-to">Conoce más</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12 md6>
            <v-img :src="require('../assets/2085405.jpg')" contain></v-img>
          </v-flex>
        </v-layout>
      </v-container>
      <div id="how-to" class="mb-4"></div>
    </section>
    <section class="bg-white">
      <v-timeline class="pt-5 pb-4">
        <v-timeline-item color="red lighten-2" large>
          <template v-slot:opposite>
            <span class="headline font-weight-regular">1er Paso</span>
          </template>
          <v-card class="elevation-2">
            <v-card-title class="headline">Crea una cuenta</v-card-title>
            <v-card-text
              class="subheading"
            >Ingresa tus datos para registrarte en la app y empieza a utilizarla.</v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
      <v-timeline class="py-4">
        <v-timeline-item color="red lighten-2" right large>
          <template v-slot:opposite>
            <span class="headline font-weight-regular">2do Paso</span>
          </template>
          <v-card class="elevation-2">
            <v-card-title class="headline">Consulta los datos</v-card-title>
            <v-card-text
              class="subheading"
            >Informate de los precios de los productos catalogados y compara precios.</v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
      <v-timeline class="py-4">
        <v-timeline-item color="red lighten-2" large>
          <template v-slot:opposite>
            <span class="headline font-weight-regular">3er Paso</span>
          </template>
          <v-card class="elevation-2">
            <v-card-title class="headline">Analiza los datos</v-card-title>
            <v-card-text
              class="subheading"
            >Utiliza las gráficas para estudiar el cambio en los precios y haz un estudio del mercado para tomar decisiones.</v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
      <v-timeline class="pt-4 pb-5">
        <v-timeline-item color="red lighten-2" right large>
          <template v-slot:opposite>
            <span class="headline font-weight-regular">4to Paso</span>
          </template>
          <v-card class="elevation-2">
            <v-card-title class="headline">Cuentale a tus amigos</v-card-title>
            <v-card-text
              class="subheading"
            >Comparte la app con tus amigos y cuentales que te pareció esta herramienta.</v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </section>
    <section class="bg-grey">
      <v-container fluid pa-5>
        <v-flex xs-12>
          <v-layout align-center justify-space-around row fill-height wrap>
            <v-card class="mx-auto my-3" color="grey lighten-5" min-width="300" max-width="400">
              <v-card-title>
                <v-icon large left>mdi-twitter</v-icon>
                <span class="title font-weight-light">Twitter</span>
              </v-card-title>

              <v-card-text
                class="headline font-weight-bold"
              >"Excelente aplicación. Ya puedo comparar precios de los productos."</v-card-text>

              <v-card-actions>
                <v-list-tile class="grow">
                  <v-list-tile-avatar color="grey darken-3">
                    <v-img class="elevation-6" :src="require('@/assets/gabriel-avatar.jpg')"></v-img>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>G. Ron</v-list-tile-title>
                  </v-list-tile-content>

                  <v-layout align-center justify-end>
                    <v-icon class="mr-1">mdi-heart</v-icon>
                    <span class="subheading mr-2">999</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1">mdi-share-variant</v-icon>
                    <span class="subheading">27</span>
                  </v-layout>
                </v-list-tile>
              </v-card-actions>
            </v-card>

            <v-card class="mx-auto my-3" color="grey lighten-5" min-width="300" max-width="400">
              <v-card-title>
                <v-icon large left>mdi-twitter</v-icon>
                <span class="title font-weight-light">Twitter</span>
              </v-card-title>

              <v-card-text
                class="headline font-weight-bold"
              >"Con esta aplicación puedo tener un estimado de la inflación del país."</v-card-text>

              <v-card-actions>
                <v-list-tile class="grow">
                  <v-list-tile-avatar color="grey darken-3">
                    <v-img class="elevation-6" :src="require('@/assets/juan-avatar.jpg')"></v-img>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>J. Paiva</v-list-tile-title>
                  </v-list-tile-content>

                  <v-layout align-center justify-end>
                    <v-icon class="mr-1">mdi-heart</v-icon>
                    <span class="subheading mr-2">186</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1">mdi-share-variant</v-icon>
                    <span class="subheading">8</span>
                  </v-layout>
                </v-list-tile>
              </v-card-actions>
            </v-card>

            <v-card class="mx-auto my-3" color="grey lighten-5" min-width="300" max-width="400">
              <v-card-title>
                <v-icon large left>mdi-twitter</v-icon>
                <span class="title font-weight-light">Twitter</span>
              </v-card-title>

              <v-card-text
                class="headline font-weight-bold"
              >"Gracias a las gráficas, puedo diagnosticar ciclos de aumentos en los precios."</v-card-text>

              <v-card-actions>
                <v-list-tile class="grow">
                  <v-list-tile-avatar color="grey darken-3">
                    <v-img class="elevation-6" :src="require('@/assets/chirino-avatar.jpg')"></v-img>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>C. Chirino</v-list-tile-title>
                  </v-list-tile-content>

                  <v-layout align-center justify-end>
                    <v-icon class="mr-1">mdi-heart</v-icon>
                    <span class="subheading mr-2">256</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1">mdi-share-variant</v-icon>
                    <span class="subheading">13</span>
                  </v-layout>
                </v-list-tile>
              </v-card-actions>
            </v-card>
          </v-layout>
        </v-flex>
      </v-container>
    </section>
    <section class="bg-white">
      <v-container>
        <v-layout justify-center align-center wrap>
          <v-flex md6>
            <v-img :src="require('../assets/2085406.jpg')" contain></v-img>
            <div class="display-2 font-weight-light text-xs-center">
              Registrate
              <v-icon x-large color="black" class="material-icons">arrow_right_alt</v-icon>
            </div>
          </v-flex>
          <v-layout justify-center align-center md6>
            <register-form></register-form>
          </v-layout>
        </v-layout>
      </v-container>
    </section>
  </v-app>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue'

export default {
  name: 'LandingInfo',
  components: {
    RegisterForm
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.bg-grey {
  background-color: #e0e0e0;
}
.bg-white {
  background-color: white;
}
.card {
  background-color: white;
  max-width: 450px;
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
