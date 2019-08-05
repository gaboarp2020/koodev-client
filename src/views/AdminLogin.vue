<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Admin Login</v-toolbar-title>
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
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="alerts.admin.hasError"
      color="error"
      :multi-line="true"
      :timeout="3000"
      :vertical="true"
    >
      {{ alerts.admin.message }}
      <v-btn dark flat @click="alerts.admin.hasError = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import VALIDATE_ADMIN_QUERY from '@/graphql/ValidateAdmin.gql'
import VALIDATE_USER_MUTATION from '../graphql/ValidateUser.gql'

export default {
  data () {
    return {
      valid: true,
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
        admin: {
          hasError: false,
          message: 'El usuario no es admin'
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
    ...mapState(['isLoading'])
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
        .query({
          query: VALIDATE_ADMIN_QUERY,
          variables: {
            username,
            password
          },
          error (error) {
            console.log(error)
          }
        })
        .then(data => {
          console.log(data)

          const user = data.data.getAdmin
          this.$store.commit('setCurrentUser', user)
          console.log(user)
          if (user.isAdmin) {
            this.$apollo
              .mutate({
                mutation: VALIDATE_USER_MUTATION,
                variables: { username, password }
              })
              .then(data => {
                // Result
                let token = data.data.validateUser

                this.$store.commit('done')

                localStorage.setItem('Authorization', 'Bearer ' + token)

                this.$store.commit('setToken', token)

                this.$store.commit('login')
                this.dialog = false
                this.$emit('logged')
                this.$router.push('/admin')
              })
              .catch(error => {
                // Error
                console.log(error)
                this.$store.commit('done')

                // We restore the initial user input
                this.$data.form = {
                  username,
                  password
                }
              })
          } else {
            this.alerts.admin.hasError = true
          }
          // Apollo GraphQl Mutations (return token)
        })
        .catch(error => {
          // Error
          console.log(error)
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
  mounted () {
    this.$refs.form.resetValidation()
    this.$nextTick(() => this.$refs.username.focus())
  }
}
</script>

<style scoped>
</style>
