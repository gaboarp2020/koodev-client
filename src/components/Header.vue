<template>
  <div>
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
          <img class="elevation-6" src="https://api.adorable.io/avatars/40/abott@adorable.png"/>
        </v-list-tile-avatar>
        <router-link to="/home" class="subheading links">{{me.firstName}}&nbsp;{{me.lastName}}</router-link>
        <v-btn color="primary" @click="logout">logout</v-btn>
      </div>
      <div v-show="!hasLogged" class="hidden-xs-only">
        <div>
          <register-modal></register-modal>
          <login-modal @logged="logged"></login-modal>
        </div>
      </div>
      <v-menu offset-y button transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-toolbar-side-icon v-on="on" class="hidden-sm-and-up"></v-toolbar-side-icon>
        </template>
        <v-list v-show="hasLogged" class="column">
          <img class="elevation-6" src="https://api.adorable.io/avatars/40/abott@adorable.png" style="border-radius: 50%"/>
          <v-list-tile>
            <router-link to="/home" class="subheading links">{{me.firstName}}&nbsp;{{me.lastName}}</router-link>
          </v-list-tile>
          <v-list-tile>
            <v-btn color="primary" @click="logout">logout</v-btn>
          </v-list-tile>
        </v-list>
        <v-list v-show="!hasLogged">
          <v-list-tile>
            <register-modal></register-modal>
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
import jwt from 'jsonwebtoken'
import LoginModal from '@/components/LoginModal.vue'
import RegisterModal from '@/components/RegisterModal.vue'
import CURRENT_USER_QUERY from '@/graphql/Me.gql'

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
      // Reactive variables
      variables () {
        return {
          id: this.payloadId
        }
      },
      update: data => data.me,
      // Disable the query
      skip () {
        return this.skipQuery
      }
    }
  },
  data () {
    return {
      token: '',
      decoded: '',
      payloadId: '',
      me: {
        firstName: '',
        lastName: ''
      },
      skipQuery: true,
      hasLogged: false
    }
  },
  mounted () {
    this.init()
  },
  updated () {
    this.init()
  },
  methods: {
    logged (value) {
      this.hasLogged = value
    },
    logout () {
      localStorage.clear()
      this.hasLogged = false
      this.$router.push('/')
    },
    init () {
      if (!this.token) {
        this.token = localStorage.getItem('authorization')
        this.decoded = jwt.decode(this.token)
        if (this.decoded) {
          this.payloadId = this.decoded.user.id
          console.log(this.payloadId, typeof this.payloadId)
          this.skipQuery = false
        }
      }
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
</style>
