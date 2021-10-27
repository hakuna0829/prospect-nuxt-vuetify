<template>
  <v-container fluid class="down-top-padding" id="verify">
    <v-row>
      <v-col cols="12" md="4">
       
      </v-col>
      <v-col cols="12" sm="12">
        <BaseCard>
          <DataTable @changeOpen="handleNewDlg($event)"></DataTable>
        </BaseCard>
      </v-col>
      <v-col cols="12" sm="12" lg="6">
        <!-- <BaseCard heading="Dialogs - Form"> -->
        <DialogsForm
          :open="newDlg"
          @changeOpen="handleNewDlg($event)"
          @handleSnackBar="handleSnackBar($event)"
        ></DialogsForm>

        <!-- </BaseCard> -->
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" absolute top right color="success">
      New List Item has been successfully created
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "Lists",

  data: () => ({
    extension: true,
    newDlg: false,
    snackbar: false,
    page: {
      title: "LISTS"
    },
    breadcrumbs: [
      {
        text: "LISTS",
        disabled: false,
        to: "/lists"
      }
    ]
  }),
  methods: {
    handleNewDlg() {
      this.newDlg = !this.newDlg;
    },
    handleSnackBar(val) {
      this.snackbar = val;
    }
  },
  components: {
    DataTable: () => import("./table-data/DataTableDetail"),
    DialogsForm: () => import("./DialogsForm")
  }
};
</script>
<style scoped lang="scss">
.avatar {
  margin-right: 10px;
}
.v-btn {
  max-width: 150px;
}
.tooltip {
    position: relative;
    // top: -70px;
    border: solid 2px white;
    background-color: #e5f1fc;
    color: #1e88e5;
    padding: 12px;
    margin-bottom: 16px;
}
</style>
