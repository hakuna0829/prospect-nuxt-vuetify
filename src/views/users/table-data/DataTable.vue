<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- DatatablesSearch -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <div class="">
      <v-card>
        <v-row align="center">
          <v-col class="grow">Company users</v-col>
          <v-col class="shrink">
            <v-btn color="primary" to="/new-user">Add new user</v-btn>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="data"
          item-key="createdDate"
          class="border"
          :footer-props="{
            'items-per-page-options': [10, 50, 200, -1]
          }"
        >
          <template v-slot:item.avartar="{ item }">
            <img :src="item.avartar" alt="" width="30px" />
          </template>
          <template v-slot:item.email="{ item }">
            <p class="email">{{ item.email }}</p>
          </template>

          <template v-slot:item.enabled="{ item }">
            <div class="d-flex justify-center">
              <v-checkbox v-model="item.enabled"></v-checkbox>
            </div>
          </template>
          <template v-slot:item.remove="{ item }">
            <v-icon class="error--text" @click="confirmDelete(item)"
              >mdi-delete</v-icon
            >
            <!-- <v-btn color="primary" depressed @click="confirmDelete(item)">
              <v-icon left>
                {{ icons.mdiDelete }}
              </v-icon>
            </v-btn> -->
          </template>
        </v-data-table>
        <DeleteDialog
          :open="showAlert"
          @changeOpen="handleDeleteDlg($event)"
          @removeItem="removeItem($event)"
          @handleSnackBar="handleSnackBar($event)"
        ></DeleteDialog>
        <v-snackbar
          v-model="snackbar"
          top
          right
          color="success"
          style="padding-top:125px"
        >
          The user has been successfully deleted
        </v-snackbar>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mdiDelete } from "@mdi/js";

export default {
  name: "DataTable",

  data: () => ({
    showAlert: false,
    selectedName: "",
    snackbar: false,
    headers: [
      { text: "", value: "avartar", filterable: false },
      { text: "User email", sortable: true, value: "email" },
      { text: "First Name", value: "firstName", filterable: false },
      { text: "Last Name", value: "lastName", filterable: false },
      { text: "Type", value: "type", filterable: false },
      { text: "Access to credits", value: "access", filterable: false },
      { text: "Credits used", value: "credits_used", filterable: false },
      { text: "", value: "remove", filterable: false, sortable: false }
    ],
    icons: { mdiDelete },
    data: [
      {
        avartar:
          "https://ca.slack-edge.com/TGUK83BPA-U01KTG7MK34-g19920895070-512",
        firstName: "Martin",
        lastName: "Knapic",
        email: "knapicm@gmail.com",
        type: "Administrator",
        access: "1323424232342",
        credits_used: "32423423423"
      },
      {
        avartar:
          "https://ca.slack-edge.com/TN86UQ97H-US929HJSE-g28806d23364-512",
        firstName: "Visitor",
        lastName: "101",
        email: "visitorRandomeCreated101@gmail.com",
        type: "Viewer",
        access: "3234242323425",
        credits_used: "73242342342"
      }
    ]
  }),
  methods: {
    closeAlert() {
      this.selectedName = "";
      this.showAlert = false;
    },
    toggleOpen() {
      this.$emit("changeOpen");
    },
    confirmDelete(item) {
      this.showAlert = true;
      this.selectedName = item;
    },
    removeItem() {
      const index = this.data.indexOf(this.selectedName);
      this.data.splice(index, 1);
      this.selectedName = null;
    },
    handleDeleteDlg() {
      this.showAlert = false;
    },
    handleSnackBar(val) {
      this.snackbar = val;
    }
  },
  components: {
    DeleteDialog: () => import("../DeleteDialog")
  }
};
</script>
<style scoped lang="scss">
@import "~vuetify/src/styles/settings/_variables";

@media #{map-get($display-breakpoints, 'md-and-down')} {
  .custom-class {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 300px;
  }
}
@media #{map-get($display-breakpoints, 'sm-and-down')} {
  .custom-class {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100px;
  }
}

.email {
  margin: 0px;
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (min-width: 1904px) {
    max-width: 180px;
    margin: 0px;
  }
}
</style>
