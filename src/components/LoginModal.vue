<template>
  <v-dialog max-width="420" v-model="dialog">
    <v-btn color="primary" slot="activator">log in</v-btn>
    <div id="login-modal">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <v-btn icon medium>
              <i class="material-icons">close</i>
            </v-btn>
            <span>Cerrar</span>
          </v-tooltip>
        </v-toolbar>
        <div class="pa-4">
          <v-card-text>
            <v-form lazy-validation ref="form">
              <v-text-field
                @keyup.enter="login"
                v-model="form.username"
                :rules="usernameRules"
                required
                prepend-icon="person"
                label="Login"
                ref="username"
                type="text"
              ></v-text-field>
              <v-text-field
                @keyup.enter="login"
                v-model="form.password"
                :append-icon="show ? 'visibility' : 'visibility_off'"
                :rules="passwordRules"
                :type="show ? 'text' : 'password'"
                required
                @click:append="show = !show"
                prepend-icon="lock"
                label="Password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="!valid" color="primary" @click="login" :loading="isLoading">Login</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import VALIDATE_USER_MUTATION from '../graphql/ValidateUser.gql'
import { onLogin } from '../apollo'

export default {
  data () {
    return {
      valid: true,
      dialog: false,
      form: {
        username: '',
        password: ''
      },
      graphQLErrors: {
        message: '',
        username: {
          hasError: false
        },
        password: {
          hasError: false
        }
      },
      show: false,
      usernameRules: [
        v => !!v || 'Falta el usuario',
        v => !this.graphQLErrors.username.hasError || this.graphQLErrors.message
      ],
      passwordRules: [
        v => !!v || 'Falta la contraseña',
        v => !this.graphQLErrors.password.hasError || this.graphQLErrors.message
      ]
    }
  },
  computed: {
    ...mapState([
      'isLoading'
    ])
  },
  methods: {
    login () {
      if (this.$refs.form.validate()) {
        this.$refs.form.resetValidation()
        this.$store.commit('loading')
        this.loginValidationQuery()
      }

      this.graphQLErrors.username.hasError = false
      this.graphQLErrors.password.hasError = false
    },
    loginValidationQuery () {
      const { username, password } = this.$data.form

      this.clear()

      // Apollo GraphQl Query
      this.$apollo
        .mutate({
          mutation: VALIDATE_USER_MUTATION,
          variables: { username, password }
        })
        .then(data => {
          // Result
          onLogin()
          this.$store.commit('done')

          let token = data.data.validateUser
          localStorage.setItem('Authorization', 'Bearer ' + token)

          this.$store.commit('setToken', token)

          this.$store.commit('login')
          this.dialog = false
          this.$emit('logged')
          this.$router.push('/home')
        })
        .catch(error => {
          // Error

          this.$store.commit('done')
          if (error.graphQLErrors) {
            this.graphQLErrors.message = error.graphQLErrors[0].message
            if (error.graphQLErrors[0].message === 'Usuario incorrecto') {
              // Usuario no existe
              this.graphQLErrors.username.hasError = true
              this.graphQLErrors.password.hasError = false
            } else {
              // El password no coincide
              this.graphQLErrors.password.hasError = true
              this.graphQLErrors.username.hasError = false
            }
          } else {
            // Server Error
          }
          // We restore the initial user input
          this.$data.form = {
            username,
            password
          }
        })
    },
    clear () {
      this.form.username = ''
      this.form.password = ''
      this.graphQLErrors.username.hasError = false
      this.graphQLErrors.password.hasError = false
    }
  },
  watch: {
    dialog: function () {
      this.$refs.form.resetValidation()
      this.$nextTick(() => this.$refs.username.focus())
    }
  }
}
</script>

<style scoped>
.alert {
  position: fixed;
  right: 4%;
  top: 4%;
  z-index: 9999;
}
</style>
