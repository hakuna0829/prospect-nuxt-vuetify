<template>
  <v-container fluid class="down-top-padding" id="verify">
      <!-- icon background #c6e0f9 -->
    <div class="tooltip d-block d-md-flex justify-space-between" :style="top" v-if="extension">
        <div class="d-flex ">
            <v-icon large color="#1e88e5" class="mr-2">mdi-shield-lock-outline  </v-icon>
            You won't be able to leverage the full potential of Prospect Role without the Extension. Please install the extension and refresh the site.
        </div>
        <template >
            <v-btn light class="mr-2 align-self-center text-capitalize white--text" color="#F1C40F" href="https://chrome.google.com/webstore/detail/prospect-role-find-email/dalaacnaanmifofialpomlklmnkknmkk?hl=en" target="blank">
                <v-icon>mdi mdi-google-chrome  </v-icon>
                Get Extension
            </v-btn>
            <v-btn light class="align-self-center text-capitalize white--black " color="#FFF" @click="extension=false">
                Close
            </v-btn>
        </template>
    </div>
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
  computed: {
    top () {
        switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 'top: 0'
            case 'sm': return 'top: 0'
            // case 'md': return 'top: 0'
            default: return 'top: -70px'
        }
    },
  },
  methods: {
    handleNewDlg() {
      this.newDlg = !this.newDlg;
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
