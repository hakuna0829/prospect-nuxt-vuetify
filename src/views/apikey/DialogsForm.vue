<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Form -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <div class="mt-4 text-center">
      <v-dialog v-model="open" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">New API Key</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation v-model="valid">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      v-model="keyname"
                      :rules="nameRules"
                      label="Name"
                      required
                      outlined
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="toggleOpen()">Cancel</v-btn>
            <v-btn color="success" @click="submit">Create key</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "DialogsForm",
  props: ["open"],

  data: () => ({
    dialog: false,
    keyname: "",
    valid: true,
    nameRules: [
      v => !!v || "Name is required"
      //   v => v && v.length < 3 && "Password must be longer than 3 characters"
    ]
  }),
  methods: {
    toggleOpen() {
      this.$emit("changeOpen");
    },
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.$emit("changeOpen");
        this.$emit("handleSnackBar", true);
      }
    }
  }
};
</script>
