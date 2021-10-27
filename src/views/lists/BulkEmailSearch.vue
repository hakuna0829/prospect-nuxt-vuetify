<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Form -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <div class="mt-4 text-center">
      <v-dialog v-model="dialog" persistent max-width="900px">
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            <span class="headline">Bulk Email Search</span>
            <div @click="toggleOpen" class="closeItem"><v-icon>mdi-close</v-icon></div>
          </v-card-title>
          <v-card-text>
            <v-progress-linear
              v-if="searching"
              color="light-blue"
              height="10"
              :value="percentValue"
              striped
            ></v-progress-linear>
           <div v-if="searching" class="text-body-1 font-weight-medium text--primary mt-1">{{progressing}}/{{total}} emails searched. {{verified}} verified emails found.</div>

          </v-card-text>
          <v-card-actions>
            <div class="d-flex justify-end w-full" style="width:100%">
              <v-btn plain class="me-2" @click="toggleOpen">Cancel</v-btn>
              <v-btn color="primary" @click="handleSearch">Search</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "BulkEmailSearch",
  props: ["open", "data", "changeOpen"],

  data: () => ({
    valid: true,
    searching: false,
    total: 87,
    progressing: 10,
    verified: 5,
    isBackgroundRunning: false
  }),
  computed:{
    dialog() {
      return this.open
    },
    percentValue() {
      return this.progressing / this.total * 100
    }
  },
  methods: {
    toggleOpen() {
      this.searching = false;
      this.$emit("changeOpen");
    },
    searchEmail() {
      const testValid = this.$refs.form.validate();
      console.log('testValid', testValid);
      if(testValid)  this.searching = true;
    },
    handleSearch() {
      this.searching = true;
    },
    submit() {
    //   this.$emit("changeOpen");
    //   this.$emit("removeItem");
    //   this.$emit("handleSnackBar", true);
    }
  }
};
</script>
<style scoped lang="scss">
.closeItem{
  cursor: pointer;
}

</style>
