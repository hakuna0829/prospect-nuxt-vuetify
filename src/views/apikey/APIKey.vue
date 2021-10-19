<template>
  <v-container fluid class="down-top-padding" id="verify">
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>
    <v-row>
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
      New API key has been successfully created
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "APIKey",

  data: () => ({
    page: {
      title: "API Key"
    },
    newDlg: false,
    snackbar: false,
    breadcrumbs: [
      {
        text: "API Key",
        disabled: false,
        to: "/api-key"
      }
    ]
  }),
  methods: {
    handleNewDlg() {
      this.newDlg = !this.newDlg;
    },
    handleDeleteDlg() {
      this.deleteDlg = !this.deleteDlg;
    },
    handleSnackBar(val) {
      this.snackbar = val;
    }
  },
  components: {
    DataTable: () => import("./table-data/DataTable"),
    DialogsForm: () => import("./DialogsForm")
  }
};
</script>
