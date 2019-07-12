<template>
  <v-dialog max-width="420">
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
                v-model="form.username"
                prepend-icon="person"
                name="login"
                label="Login"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary">Login</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: "LoginModal",
  apollo: {

  },
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  }
};
</script>

<style lang="stylus" scoped></style>
