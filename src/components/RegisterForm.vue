<template>
  <v-card color="white" class="ma-4 pa-4" width="150%" min-width="280" max-width="500">

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

    <v-card-text>
      <v-form>
        <v-container>
          <div class="title">Datos personales</div>
          <v-layout column class="mb-4">
            <v-flex>
              <v-text-field
                v-model="form.firstname"
                :counter="10"
                :error-messages="firstnameErrors"
                required
                label="First name"
                hint="At least 2 characters"
                @change="$v.form.firstname.$touch()"
                @blur="$v.form.firstname.$touch()"
              ></v-text-field>
            </v-flex>

            <v-flex>
              <v-text-field
                v-model="form.lastname"
                :counter="10"
                :error-messages="lastnameErrors"
                required
                label="Last name"
                hint="At least 2 characters"
                @change="$v.form.lastname.$touch()"
                @blur="$v.form.lastname.$touch()"
              ></v-text-field>
            </v-flex>

            <v-flex>
              <v-text-field
                v-model="form.email"
                :counter="30"
                :error-messages="emailErrors"
                :rules="emailRules"
                required
                label="E-mail"
                @change="$v.form.email.$touch()"
                @blur="$v.form.email.$touch()"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <div class="title">Datos de la Cuenta</div>
          <v-layout column>
            <v-flex>
              <v-text-field
                v-model="form.username"
                :counter="12"
                :error-messages="usernameErrors"
                :rules="usernameRules"
                required
                label="Username"
                hint="At least 6 characters"
                @change="$v.form.username.$touch()"
                @blur="$v.form.username.$touch()"
              ></v-text-field>
            </v-flex>

            <v-flex>
              <v-text-field
                v-model="form.password"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                :counter="10"
                :error-messages="passwordErrors"
                :type="show1 ? 'text' : 'password'"
                required
                label="Password"
                hint="At least 6 characters"
                @change="$v.form.password.$touch()"
                @blur="$v.form.password.$touch()"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-flex>

            <v-flex>
              <v-text-field
                v-model="form.repeatPassword"
                :append-icon="show2 ? 'visibility' : 'visibility_off'"
                :counter="10"
                :error-messages="repeatPasswordErrors"
                :type="show2 ? 'text' : 'password'"
                required
                label="Repeat assword"
                hint="Must be the same password"
                @change="$v.form.repeatPassword.$touch()"
                @blur="$v.form.repeatPassword.$touch()"
                @click:append="show2 = !show2"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="createUser">sign up</v-btn>
      <v-btn color="secundary" @click="clear">Clear</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  sameAs,
  minLength,
  maxLength,
  email
} from 'vuelidate/lib/validators'
import CREATE_USER_MUTATION from '../graphql/CreateUser.gql'

export default {
  mixins: [validationMixin],

  data () {
    return {
      valid: true,
      dialog: false,
      form: {
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        repeatPassword: ''
      },
      graphQLErrors: {
        message: '',
        username: {
          hasError: false
        },
        email: {
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
      show2: false,
      usernameRules: [
        v => !this.graphQLErrors.username.hasError || this.graphQLErrors.message
      ],
      emailRules: [
        v => !this.graphQLErrors.email.hasError || this.graphQLErrors.message
      ]
    }
  },
  validations: {
    form: {
      firstname: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(10)
      },
      lastname: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(10)
      },
      email: {
        required,
        email,
        maxLength: maxLength(30)
      },
      username: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(12)
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(10)
      },
      repeatPassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  computed: {
    firstnameErrors () {
      const errors = []
      if (!this.$v.form.firstname.$dirty) return errors
      !this.$v.form.firstname.minLength &&
        errors.push('First name must have at least 2 letters.')
      !this.$v.form.firstname.maxLength &&
        errors.push('First name must be at most 10 characters long')
      !this.$v.form.firstname.required &&
        errors.push('First name is required.')
      return errors
    },
    lastnameErrors () {
      const errors = []
      if (!this.$v.form.lastname.$dirty) return errors
      !this.$v.form.lastname.minLength &&
        errors.push('Last name must have at least 2 letters.')
      !this.$v.form.lastname.maxLength &&
        errors.push('Last name must be at most 10 characters long')
      !this.$v.form.lastname.required && errors.push('Last name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.form.email.$dirty) return errors
      !this.$v.form.email.email && errors.push('Must be valid e-mail')
      !this.$v.form.email.maxLength &&
        errors.push('Last name must be at most 30 characters long')
      !this.$v.form.email.required && errors.push('E-mail is required')
      return errors
    },
    usernameErrors () {
      const errors = []
      if (!this.$v.form.username.$dirty) return errors
      !this.$v.form.username.minLength &&
        errors.push('Username must have at least 6 characters.')
      !this.$v.form.username.maxLength &&
        errors.push('Username must be at most 12 characters long')
      !this.$v.form.username.required && errors.push('Username is required.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.form.password.$dirty) return errors
      !this.$v.form.password.minLength &&
        errors.push('Password must have at least 6 characters.')
      !this.$v.form.password.maxLength &&
        errors.push('Password must be at most 10 characters long')
      !this.$v.form.password.required && errors.push('Password is required.')
      return errors
    },
    repeatPasswordErrors () {
      const errors = []
      if (!this.$v.form.repeatPassword.$dirty) return errors
      !this.$v.form.repeatPassword.sameAsPassword &&
        errors.push('Passwords must be identical.')
      !this.$v.form.repeatPassword.required &&
        errors.push('Confirm the password')
      return errors
    },
    formValid () {
      return !this.$v.$invalid
    }
  },

  methods: {
    createUser () {
      this.$v.$touch()
      if (this.formValid) {
        const {
          firstname,
          lastname,
          email,
          username,
          password
        } = this.$data.form
        this.clear()

        this.$apollo
          .mutate({
            mutation: CREATE_USER_MUTATION,
            variables: { firstname, lastname, email, username, password }
          })
          .then(data => {
            // Result
            this.alerts.success.hasSucceed = true
            this.alerts.success.message = '¡Usuario registrado con éxito!'
            this.dialog = false
          })
          .catch(error => {
            // Error

            if (error.graphQLErrors) {
              this.graphQLErrors.message = error.graphQLErrors[0].message
              if (error.graphQLErrors[0].message === 'El usuario ya existe') {
                // Usuario existe
                this.graphQLErrors.username.hasError = true
                this.graphQLErrors.email.hasError = false
              } else {
                // El email esta en uso
                this.graphQLErrors.email.hasError = true
                this.graphQLErrors.username.hasError = false
              }
            } else {
            }
            // We restore the initial user input
            this.$data.form = {
              firstname,
              lastname,
              email,
              username,
              password,
              repeatPassword: password
            }
          })
      }
    },
    clear () {
      this.$v.$reset()
      this.form.firstname = ''
      this.form.lastname = ''
      this.form.email = ''
      this.form.username = ''
      this.form.password = ''
      this.form.repeatPassword = ''
      this.graphQLErrors.username.hasError = false
      this.graphQLErrors.email.hasError = false
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
