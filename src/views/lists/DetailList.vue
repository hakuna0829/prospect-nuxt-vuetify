<template>
  <v-container fluid class="down-top-padding" id="verify">
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" md="4">
       
      </v-col>
      <v-col cols="12" sm="12">
        <BaseCard>
          <DataTable @changeOpen="handleNewDlg($event)" @handleAddSnackBar="handleSnackBar($event)"></DataTable>
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
    <v-snackbar v-model="snackbar" absolute top right color="black">
      A new row had been added. Click in the cell to start adding data.
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
      title: "All Extension Prospects"
    },
    breadcrumbs: [
      {
        text: "LISTS",
        disabled: false,
        to: "/lists",
        
      },
      {
        text: "All Extension Prospects",
        disabled: true,
        to: "",
        
      }
    ]
  }),
  methods: {
    handleNewDlg() {
      this.newDlg = !this.newDlg;
    },
    handleSnackBar(val) {
      console.log('handle add snackbar', val)
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
