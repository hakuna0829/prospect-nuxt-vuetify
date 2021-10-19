<template>
  <v-container id="login" class="fill-height justify-center" tag="section">
    <v-row justify="center">
      <v-col lg="11" sm="8" xl="7">
        <v-card class="elevation-4">
          <v-row>
            <v-col
              lg="7"
              class="info d-none d-md-flex align-center justify-center"
            >
              <div class="d-none d-sm-block">
                <div class="d-flex align-center pa-10">
                  <div>
                    <h2 class="display-1 white--text font-weight-medium">
                      Best Email Verifier
                    </h2>
                    <h6
                      class="subtitle-1 mt-4 white--text op-5 font-weight-regular"
                    >
                      Your ultimate tool to enhance email deliverability.
                    </h6>
                    <v-btn
                      class="mt-4 text-capitalize"
                      x-large
                      outlined
                      color="white"
                      @click="handleBack"
                      >Back To Main Page</v-btn
                    >
                  </div>
                </div>
              </div>
            </v-col>
            <v-col lg="5">
              <div class="pa-7 pa-sm-12">
                <h2
                  class="font-weight-bold mt-4 blue-grey--text text--darken-2"
                >
                  Password reset
                </h2>

                <h6 class="subtitle-1">
                  We'll email you instructions on how to reset your password.
                </h6>

                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  action="boxedlogin"
                >
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    class="mt-4"
                    required
                    outlined
                  ></v-text-field>

                  <div class="form-group row">
                    <!-- <label for="robot" class="col-sm-2 col-form-label"></label> -->
                    <div class="col-sm-10">
                      <vue-recaptcha
                        ref="recaptcha"
                        :loadRecaptchaScript="true"
                        @verify="onVerify"
                        sitekey="6LdFNNcUAAAAAGKsWDe9Xs2Fj_d29ywe2ae4nIsF"
                      >
                      </vue-recaptcha>
                    </div>
                  </div>

                  <v-btn
                    :disabled="!available"
                    color="info"
                    block
                    class="mr-4"
                    submit
                    @click="submit"
                    >Send</v-btn
                  >
                </v-form>
                <div class="ml-auto">
                  <v-btn
                    text
                    link
                    to="boxedlogin"
                    style="text-transform:none"
                    class="link"
                    >Go back
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
export default {
  name: "BoxedForgotPassword",

  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    robot: false
  }),
  computed: {
    available() {
      console.log("availa", this.valid, this.robot);
      return this.valid && this.robot;
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate(true) && this.robot) {
        this.$router.push({ path: "/authentication/boxedlogin" });
      }
    },
    handleBack() {
      this.$router.push({ path: "/" });
    },
    onVerify: function(response) {
      if (response) this.robot = true;
    }
  },
  mounted: function() {
    console.log("Mounted!", this.valid, this.robot);
  },
  components: {
    "vue-recaptcha": VueRecaptcha
  }
};
</script>
<style scoped>
#login .info {
  background-color: #21c1d6 !important;
}
</style>
