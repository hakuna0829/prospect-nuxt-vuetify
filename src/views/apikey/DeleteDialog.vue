<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Form -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <div class="mt-4 text-center">
      <v-dialog v-model="open" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Delete</span>
          </v-card-title>
          <v-card-text>
            Are you sure you want to delete the API key?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="submit">Delete</v-btn>
            <v-btn color="success" @click="toggleOpen()">Keep</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteDialog",
  props: ["open"],

  data: () => ({
    dialog: false
  }),
  methods: {
    toggleOpen() {
      this.$emit("changeOpen");
    },
    submit() {
      this.$emit("changeOpen");
      this.$emit("removeItem");
      this.$emit("handleSnackBar", true);
    }
  }
};
</script>
