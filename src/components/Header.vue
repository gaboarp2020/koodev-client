<template>
  <div>
    <span class="alert">
      <v-alert
        v-model="alerts.success.hasSucceed"
        dismissible
        type="success"
        transition="scale-transition"
      >
        {{alerts.success.message}}
      </v-alert>
    </span>
    <v-toolbar app>
      <router-link to="/">
        <img src="../assets/logo.png" height="130" alt />
      </router-link>
      <v-toolbar-title class="headline text-uppercase hidden-sm-and-down">
        <span>KooDev</span>
        <span class="font-weight-light ml-2">Warehouse</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-show="hasLogged" class="row hidden-xs-only">
        <v-list-tile-avatar>
          <img class="elevation-6" :src="'https://api.adorable.io/avatars/40/' + email +'png'"/>
        </v-list-tile-avatar>
        <router-link to="/home" class="subheading links">{{firstName}}&nbsp;{{lastName}}</router-link>
        <v-btn color="primary" @click="logout">logout</v-btn>
      </div>
      <div v-show="!hasLogged" class="hidden-xs-only">
        <div>
          <register-modal @success="registerSucceed"></register-modal>
          <login-modal @logged="logged"></login-modal>
        </div>
      </div>
      <v-menu offset-y button transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-toolbar-side-icon v-on="on" class="hidden-sm-and-up"></v-toolbar-side-icon>
        </template>
        <v-list v-show="hasLogged" class="column">
          <img class="elevation-6" :src="'https://api.adorable.io/avatars/40/' + email +'png'" style="border-radius: 50%"/>
          <v-list-tile>
            <router-link to="/home" class="subheading links">{{firstName}}&nbsp;{{lastName}}</router-link>
          </v-list-tile>
          <v-list-tile>
            <v-btn color="primary" @click="logout">logout</v-btn>
          </v-list-tile>
        </v-list>
        <v-list v-show="!hasLogged">
          <v-list-tile>
            <register-modal @success="registerSucceed"></register-modal>
          </v-list-tile>
          <v-list-tile>
            <login-modal @logged="logged"></login-modal>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import LoginModal from '@/components/LoginModal.vue'
import RegisterModal from '@/components/RegisterModal.vue'
import CURRENT_USER_QUERY from '@/graphql/Me.gql'
import { onLogout } from '../apollo'

export default {
  name: 'Header',
  components: {
    LoginModal,
    RegisterModal
  },
  apollo: {
    me: {
      // GraphQL Query
      query: CURRENT_USER_QUERY,
      update: data => data.me,
      // Disable the query
      skip () {
        return this.skipQuery
      }
    }
  },
  data () {
    return {
      me: null,
      skipQuery: true,
      alerts: {
        success: {
          hasSucceed: false,
          message: ''
        },
        error: {
          hasError: false,
          message: ''
        }
      }
    }
  },
  computed: {
    ...mapState([
      'currentUser',
      'hasLogged',
      'isLoading',
      'token'
    ]),
    ...mapGetters([
      'firstName',
      'lastName',
      'email'
    ])
  },
  methods: {
    logged () {
      this.skipQuery = false
    },
    logout () {
      localStorage.clear()
      const apolloClient = this.$apollo.provider.defaultClient
      onLogout(apolloClient)
      this.$store.commit('logout')
      this.skipQuery = true
      this.$router.push('/')
    },
    registerSucceed (value) {
      this.alerts.success.hasSucceed = value
      if (value) {
        this.alerts.success.message = '¡Usuario registrado con éxito!'
      }
    },
    setCurrentUser () {
      if (this.token && this.me) {
        console.log('Setting currentUser: ', this.me)
        this.$store.commit('setCurrentUser', this.me)
      }
    }
  },
  mounted () {
    const vuexToken = this.token
    const localToken = localStorage.getItem('Authorization')
    const currentUser = this.me > 0

    if (vuexToken !== localToken && localToken) {
      const tokenWithBearer = localToken
      const token = tokenWithBearer.split(' ')[1]
      vuexToken > localToken ? localStorage.setItem('Authorization', 'Bearer ' + vuexToken)
        : this.$store.commit('setToken', token)
    }

    if ((vuexToken || localToken) && !currentUser) {
      this.skipQuery = false
      console.log('Setting user...')
      this.setCurrentUser()
      this.$store.commit('login')
    }
  },
  watch: {
    me: function () {
      this.setCurrentUser()
    }
  }
}
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
}
.column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.links {
  text-decoration: none;
  color: #2d2d2d;
}
.alert {
  position: fixed;
  right: 4%;
  top: 4%;
  z-index: 9999
}
</style>
