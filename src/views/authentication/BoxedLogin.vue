<template>
  <v-container id="login" class="fill-height justify-center" tag="section">
    <HorizontalHeader></HorizontalHeader>
    <v-row justify="center">
      <v-col lg="5" sm="8" xl="4">
        <v-card class="elevation-4">
          <v-row>
            <v-col lg="12">
              <div class="pa-7 pa-sm-12">
                <h2
                  class="font-weight-bold mt-4 text--darken-2 text-center"
                >
                  LOGIN
                </h2>
                <h6 class="subtitle-1 text-center">
                  Don't have an account?
                  <a href="/authentication/boxedregister" class>Register</a>
                </h6>
                <div class="text-center mt-6">
                  <v-chip label class="mr-2 loginButton" color="primary" text-color="white">
                    <v-avatar left>
                      <v-btn color="primary" class="white--text">
                        <v-icon>mdi-google</v-icon>
                      </v-btn> 
                    </v-avatar>
                    Sign in with Google
                  </v-chip>
                </div>
                <div class="text-center mt-4">
                  <v-chip label class="mr-2 loginButton" color="primary" text-color="white">
                    <v-avatar left>
                      <v-btn color="primary" class="white--text">
                        <v-icon>mdi-linkedin</v-icon>
                      </v-btn> 
                    </v-avatar>
                    Sign in with LinkedIn
                  </v-chip>
                </div>
                <!-- <img src="@/assets/images/logo-icon.png" />-->

                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  action="/dashboards/analytical"
                >
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    class="mt-4"
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

                  <!-- <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
                    <v-checkbox
                      v-model="checkbox"
                      :rules="[v => !!v || 'You must agree to continue!']"
                      label="Remember me?"
                      required
                    ></v-checkbox>
                    <div class="ml-auto">
                      <v-btn
                        text
                        to="boxedforgotpassword"
                        class="link"
                        style="text-transform:none"
                        >Forgot pwd?</v-btn
                      >
                    </div>
                  </div> -->
                  <!-- <div class="form-group row">
                    <div class="col-sm-10">
                      <vue-recaptcha
                        ref="recaptcha"
                        :loadRecaptchaScript="true"
                        @verify="onVerify"
                        sitekey="6LdFNNcUAAAAAGKsWDe9Xs2Fj_d29ywe2ae4nIsF"
                      >
                      </vue-recaptcha>
                    </div>
                  </div> -->
                  <v-btn
                    :disabled="!valid"
                    color="primary"
                    block
                    class="mr-4"
                    submit
                    @click="submit"
                    >Login
                  </v-btn>
                </v-form>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import VueRecaptcha from "vue-recaptcha";
import { mapState, mapMutations } from "vuex";
import HorizontalHeader from "../../layouts/full-layout/horizontal-header/HorizontalHeader";
export default {
  name: "BoxedLogin",

  data: () => ({
    valid: true,
    password: "",
    show1: false,
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
    // robot: false
  }),
  computed: {
    ...mapState(["loginStatus"])
  },
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
        this.$router.push({ path: "/lists" });
      }
    },
    handleBack() {
      this.$router.push({ path: "/" });
    },
    onVerify: function(response) {
      if (response) this.robot = true;
    }
  },
  components: {
     HorizontalHeader,
    // "vue-recaptcha": VueRecaptcha
  }
};
</script>
<style scoped>
#login .info {
  background-color: #21c1d6 !important;
}

.loginButton {
  cursor: pointer;
}
</style>
