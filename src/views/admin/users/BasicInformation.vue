<template>
  <v-card class="mb-7">
    <v-card-text class="pa-2">
      <h3 class="title font-weight-regular">
        Email address
      </h3>
      <span class="caption"
        >We'll send an invitation email with instructions.</span
      >
    </v-card-text>
    <v-card-text class="border-bottom">
      <v-text-field
        type="email"
        v-model="emailtext"
        label="Email"
        :rules="rules"
        filled
        background-color="transparent"
      ></v-text-field>
      <v-checkbox
        v-model="password60days"
        label="Require to change the password every 60 days"
        color="green darken-1"
        value="success2"
        hide-details
      ></v-checkbox>
    </v-card-text>
    <v-card-text>
      <h3 class="title font-weight-regular">
        User Type
      </h3>
      <span class="caption">Select a user type below or create a custom.</span>
      <v-radio-group v-model="userType" column>
        <v-radio
          label="Admin"
          color="green darken-1"
          value="admin"
          class="mb-0 success-text"
        ></v-radio>
        <p class="ml-8 text-body-2">
          Admin has full access and can perform all actions in the account.
        </p>
        <v-radio
          label="Manager"
          color="green darken-1"
          value="manager"
          class="mb-0 success-text"
        ></v-radio>
        <p class="ml-8 text-body-2">
          Manager has full access but can’t and access billing.
        </p>

        <v-radio
          label="User"
          color="green darken-1"
          value="user"
          class="mb-0 success-text"
        ></v-radio>
        <p class="ml-8 text-body-2">
          User can access full platform but can't set new API keys, add new
          users or see billing section.
        </p>
      </v-radio-group>
      <div class="d-flex align-baseline">
        <v-btn
          class="text-capitalize mt-5 element-0"
          @click="invite()"
          color="warning"
          >Invite user to join</v-btn
        >&nbsp; or &nbsp;
        <a
          href="#"
          @click="$router.go(-1)"
          class="text-decoration-underline grey--text text--darken-1"
          >Go back</a
        >
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "BasicInformation",
  props: {
    method: { type: Function }
  },
  data: () => ({
    emailtext: "knapic@gmail.com",
    userType: "",

    password60days: false,
    rules: [
      value => !!value || "Required.",
      value => (value || "").length <= 20 || "Max 20 characters",
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    ]
  }),
  methods: {
    invite() {
      if (this.userType !== "user") this.$emit("handleSuccessBar", true);
      else this.$emit("handleErrorBar", true);
    }
  }
};
</script>
<style scoped>
.success-text /deep/ label {
  color: rgba(0, 0, 0, 0.87);
}
</style>
