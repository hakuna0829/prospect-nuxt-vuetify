<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-top">
      <h3 class="title font-weight-regular">
        Basic Information
      </h3>
    </v-card-text>
    <v-card-text>
      <v-text-field
        v-model="firstName"
        label="First Name"
        filled
        background-color="transparent"
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        label="Last Name"
        filled
        background-color="transparent"
      ></v-text-field>
    </v-card-text>
    <v-card-text class="pa-5 border-top">
      <h3 class="title font-weight-regular">
        Login details
      </h3>
    </v-card-text>
    <v-card-text>
      <v-text-field
        type="email"
        v-model="emailtext"
        label="Email"
        filled
        background-color="transparent"
      ></v-text-field>
      <v-text-field
        v-model="password"
        filled
        background-color="transparent"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>
      <div class="d-flex align-baseline">
        <v-btn class="text-capitalize mt-5 element-0" color="success"
          >Save</v-btn
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
  data: () => ({
    firstName: "Martine",
    lastName: "Knapic",
    emailtext: "knapic@gmail.com",
    password: "1234567889",
    show1: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    }
  })
};
</script>
