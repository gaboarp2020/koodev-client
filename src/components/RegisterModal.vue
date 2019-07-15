<template>
  <v-dialog max-width="420">
    <v-btn outline color="primary" slot="activator">sign up</v-btn>
    <div id="login-modal">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Register</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <v-btn icon>
              <v-icon medium>close</v-icon>
            </v-btn>
            <span>Cerrar</span>
          </v-tooltip>
        </v-toolbar>
        <div class="pa-4">
          <v-card-text>
            <v-form>
              <v-container>
                <div class="title">Datos personales</div>
                <v-layout column class="mb-4">
                  <v-flex>
                    <v-text-field
                      v-model="firstname"
                      :counter="10"
                      :error-messages="firstnameErrors"
                      required
                      label="First name"
                      hint="At least 2 characters"
                      @change="$v.firstname.$touch()"
                      @blur="$v.firstname.$touch()"
                    ></v-text-field>
                  </v-flex>

                  <v-flex>
                    <v-text-field
                      v-model="lastname"
                      :counter="10"
                      :error-messages="lastnameErrors"
                      required
                      label="Last name"
                      hint="At least 2 characters"
                      @change="$v.lastname.$touch()"
                      @blur="$v.lastname.$touch()"
                    ></v-text-field>
                  </v-flex>

                  <v-flex>
                    <v-text-field
                      v-model="email"
                      :counter="25"
                      :error-messages="emailErrors"
                      required
                      label="E-mail"
                      @change="$v.email.$touch()"
                      @blur="$v.email.$touch()"></v-text-field>
                  </v-flex>
                </v-layout>
                <div class="title">Datos de la Cuenta</div>
                <v-layout column>
                  <v-flex>
                    <v-text-field
                      v-model="username"
                      :counter="10"
                      :error-messages="usernameErrors"
                      required
                      label="Username"
                      hint="At least 6 characters"
                      @change="$v.username.$touch()"
                      @blur="$v.username.$touch()"
                    ></v-text-field>
                  </v-flex>

                  <v-flex>
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'visibility' : 'visibility_off'"
                      :counter="10"
                      :error-messages="passwordErrors"
                      :type="show1 ? 'text' : 'password'"
                      required
                      label="Password"
                      hint="At least 6 characters"
                      @change="$v.password.$touch()"
                      @blur="$v.password.$touch()"
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-flex>

                  <v-flex>
                    <v-text-field
                      v-model="repeatPassword"
                      :append-icon="show2 ? 'visibility' : 'visibility_off'"
                      :counter="10"
                      :error-messages="repeatPasswordErrors"
                      :type="show2 ? 'text' : 'password'"
                      required
                      label="Repeat assword"
                      hint="Must be the same password"
                      @change="$v.repeatPassword.$touch()"
                      @blur="$v.repeatPassword.$touch()"
                      @click:append="show2 = !show2"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submit">sign up</v-btn>
            <v-btn color="secundary" @click="clear">Clear</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, sameAs, minLength, maxLength, email } from 'vuelidate/lib/validators'
import CREATE_USER_MUTATION from '../graphql/CreateUser.gql'

export default {
  mixins: [validationMixin],

  data () {
    return {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      repeatPassword: '',
      show1: false,
      show2: false
    }
  },
  validations: {
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
      maxLength: maxLength(25)
    },
    username: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(10)
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
  },
  computed: {
    firstnameErrors () {
      const errors = []
      if (!this.$v.firstname.$dirty) return errors
      !this.$v.firstname.minLength && errors.push('First name must have at least 2 letters.')
      !this.$v.firstname.maxLength && errors.push('First name must be at most 10 characters long')
      !this.$v.firstname.required && errors.push('First name is required.')
      return errors
    },
    lastnameErrors () {
      const errors = []
      if (!this.$v.lastname.$dirty) return errors
      !this.$v.lastname.minLength && errors.push('Last name must have at least 2 letters.')
      !this.$v.lastname.maxLength && errors.push('Last name must be at most 10 characters long')
      !this.$v.lastname.required && errors.push('Last name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.maxLength && errors.push('Last name must be at most 25 characters long')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.minLength && errors.push('Username must have at least 6 characters.')
      !this.$v.username.maxLength && errors.push('Username must be at most 10 characters long')
      !this.$v.username.required && errors.push('Username is required.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password must have at least 6 characters.')
      !this.$v.password.maxLength && errors.push('Password must be at most 10 characters long')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
    repeatPasswordErrors () {
      const errors = []
      if (!this.$v.repeatPassword.$dirty) return errors
      !this.$v.repeatPassword.sameAsPassword && errors.push('Passwords must be identical.')
      !this.$v.repeatPassword.required && errors.push('Confirm the password')
      return errors
    },
    formValid () {
      return !this.$v.$invalid
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
      if (this.formValid) {

      }
    },
    clear () {
      this.$v.$reset()
      this.firstname = ''
      this.lastname = ''
      this.email = ''
      this.username = ''
      this.password = ''
      this.repeatPassword = ''
    }
  }
}
</script>

<style lang="stylus" scoped></style>
