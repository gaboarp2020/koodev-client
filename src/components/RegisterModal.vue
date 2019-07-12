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
            <v-form v-model="valid">
              <v-container>
                <div class="title">Datos personales</div>
                <v-layout column class="mb-4">
                  <v-flex>
                    <v-text-field
                      v-model="firstname"
                      :rules="nameRules"
                      :counter="10"
                      label="First name"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex>
                    <v-text-field
                      v-model="lastname"
                      :rules="nameRules"
                      :counter="10"
                      label="Last name"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex>
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                  </v-flex>
                </v-layout>
                <div class="title">Datos de la Cuenta</div>
                <v-layout column>
                  <v-flex>
                    <v-text-field
                      v-model="firstname"
                      :rules="usernameRules"
                      :counter="6"
                      label="Username"
                      hint="At least 6 characters"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex>
                    <v-text-field
                      :append-icon="show1 ? 'visibility' : 'visibility_off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-2"
                      label="Password"
                      hint="At least 7 characters"
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-flex>

                  <v-flex>
                    <v-text-field
                      :append-icon="show2 ? 'visibility' : 'visibility_off'"
                      :rules="[rules.required, rules.min]"
                      :type="show2 ? 'text' : 'password'"
                      name="input-10-2"
                      label="Repeat password"
                      hint="At least 7 characters"
                      @click:append="show2 = !show2"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary">sign up</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'RegisterModal',
  data () {
    return {
      show1: false,
      show2: false,
      valid: false,
      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      usernameRules: [
        v => !!v || 'Username is required',
        v => v.length <= 6 || 'Username must be less than 6 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 7 || 'Min 7 characters',
        emailMatch: () => "The email and password you entered don't match"
      }
    }
  }
}
</script>

<style lang="stylus" scoped></style>
