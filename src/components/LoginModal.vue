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
            <v-form>
              <v-text-field
                @keyup.enter="login"
                v-model="form.username"
                :rules="usernameRules"
                prepend-icon="person"
                name="login"
                label="Login"
                type="text"
              ></v-text-field>
              <v-text-field
                @keyup.enter="login"
                v-model="form.password"
                :rules="passwordRules"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
import VALIDATE_USER_MUTATION from '../graphql/ValidateUser.gql'

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
      alerts: {
        success: {
          hasSucceed: false,
          message: ''
        },
        error: {
          hasError: false,
          message: ''
        }
      },
      show1: false,
      usernameRules: [
        v => !(this.graphQLErrors.username.hasError) || this.graphQLErrors.message
      ],
      passwordRules: [
        v => !(this.graphQLErrors.password.hasError) || this.graphQLErrors.message
      ]
    }
  },

  methods: {
    login () {
      const {
        username,
        password
      } = this.$data.form
      this.clear()

      this.$apollo
        .mutate({
          mutation: VALIDATE_USER_MUTATION,
          variables: { username, password }
        })
        .then(data => {
        // // Result
          console.log(data.data.validateUser)
          let token = data.data.validateUser
          localStorage.setItem('authorization', token)

          this.$emit('hasLogged')
          console.log('Emitiendo...')
          this.dialog = false
          this.$emit('logged', true)
          this.$router.push('/home')
        })
        .catch(error => {
        // Error

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
  }
}
</script>

<style scoped>
.alert {
  position: fixed;
  right: 4%;
  top: 4%;
  z-index: 9999
}
</style>
