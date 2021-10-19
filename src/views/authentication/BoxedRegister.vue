<template>
  <v-container id="register" class="fill-height justify-center" tag="section">
    <v-row justify="center">
      <v-col lg="5" sm="8" xl="4">
        <v-card class="elevation-4">
          
              <div class="pa-7 pa-sm-12">
                <!-- <img src="@/assets/images/logo-icon.png" /> -->
                <h2
                  class="font-weight-bold mt-4 text-center text--darken-2"
                >
                  REGISTRATION
                </h2>
                <h6 class="subtitle-1 text-center">
                  Do you already have your account?
                  <a href="/authentication/BoxedLogin/" class>Login</a>
                </h6>
                <div class="text-center mt-6">
                  <v-chip label class="mr-2 sigupButton" color="primary" text-color="white">
                    <v-avatar left>
                      <v-btn color="primary" class="white--text">
                        <v-icon>mdi-google</v-icon>
                      </v-btn> 
                    </v-avatar>
                    Sign up with Google
                  </v-chip>
                </div>
                <div class="text-center mt-4">
                  <v-chip label class="mr-2 sigupButton" color="primary" text-color="white">
                    <v-avatar left>
                      <v-btn color="primary" class="white--text">
                        <v-icon>mdi-linkedin</v-icon>
                      </v-btn> 
                    </v-avatar>
                    Sign up with LinkedIn
                  </v-chip>
                </div>

                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  action="/authentication/BoxedLogin/"
                >
                  <v-text-field
                    v-model="fname"
                    :rules="fnameRules"
                    label="Full Name"
                    class="mt-4"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :counter="10"
                    :rules="passwordRules"
                    label="Password"
                    required
                    outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                  ></v-text-field>
                  <v-text-field
                    v-model="confirm_password"
                    :counter="10"
                    :rules="[(password === confirm_password) || 'Password must match']"
                    label="Repeat password"
                    required
                    outlined
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                  ></v-text-field>

                  <!-- <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
                    <v-checkbox
                      v-model="checkbox"
                      :rules="[v => !!v || 'You must agree to continue!']"
                      label="I agree to the terms and privacy"
                      required
                    ></v-checkbox>
                  </div> -->
                  <v-btn
                    :disabled="!valid"
                    color="primary"
                    block
                    class="mr-4"
                    submit
                    @click="submit"
                    >Register</v-btn
                  >
                </v-form>
              </div>
          
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "BoxedRegister",
  data: () => ({
    valid: true,
    password: "",
    confirm_password: "",
    show1: false,
    show2: false,
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length <= 10) || "Password must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    checkbox: false,
    fname: "",
    fnameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ]
  }),
  beforeMount(){
    this.setLoginStatus(false);
  },
  methods: {
    ...mapMutations({
      setLoginStatus: "SET_LOGINSTATUS"
    }),
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.$router.push({ path: "/authentication/BoxedLogin/" });
      }
    }
  }
};
</script>
<style scoped>
#register .info {
  background-color: #21c1d6 !important;
}

.sigupButton {
  cursor: pointer;
}
</style>
