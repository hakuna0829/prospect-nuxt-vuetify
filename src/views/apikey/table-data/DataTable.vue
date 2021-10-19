<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- DatatablesSearch -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <div class="mt-4">
      <v-card>
        <v-row align="center">
          <v-col class="grow">
            <div>
              Available API keys
            </div>
          </v-col>
          <v-col class="shrink">
            <v-btn color="primary" @click="toggleOpen()">Add new key</v-btn>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="data"
          item-key="name"
          class="border"
          :footer-props="{
            'items-per-page-options': [10, 50, 200, -1]
          }"
        >
          <template v-slot:item.name="{ item }">
            {{ item.name }}
          </template>
          <template v-slot:item.key="{ item }">
            <div class="custom-class">
              {{ item.key }}
            </div>
          </template>
          <template v-slot:item.enabled="{ item }">
            <div class="d-flex justify-center">
              <v-checkbox v-model="item.enabled"></v-checkbox>
            </div>
          </template>
          <template v-slot:item.action="{ item }">
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
      </v-card>
      <DeleteDialog
        :open="showAlert"
        @changeOpen="handleDeleteDlg($event)"
        @removeItem="removeItem($event)"
        @handleSnackBar="handleSnackBar($event)"
      ></DeleteDialog>
      <v-snackbar v-model="snackbar" top right color="success">
        The API key has been successfully deleted
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { mdiDelete } from "@mdi/js";

export default {
  name: "DataTable",

  data: () => ({
    showAlert: false,
    selectedItem: null,
    snackbar: false,
    headers: [
      { text: "Assigned Name", align: "start", sortable: true, value: "name" },
      { text: "Key", value: "key", filterable: false },
      { text: "Enabled", value: "enabled", filterable: false },
      { text: "Created", value: "created", filterable: false, align: "center" },
      { text: "Action", value: "action", filterable: false, align: "center" }
    ],
    icons: { mdiDelete },
    data: [
      {
        name: "serial key 1",
        key: "B374A26A71490437AA024E4FADD5B497FDFF1A8EA6FF12F6FB65AF2720B59CCF",
        enabled: true,
        created: "15-Jan-2021"
      },
      {
        name: "serial key 2",
        key: "6A71490B374A2437AA024E4FADD5B497FDFF1A8EA6FF12F6FB65AF2720B59CCF",
        enabled: false,
        created: "10-Feb-2020"
      },
      {
        name: "serial key 3",
        key: "DD5B4B374A26A71490437AA024E4FA97FDFF1A8EA6FF12F6FB65AF2720B59CCF",
        enabled: true,
        created: "15-Jan-2020"
      },
      {
        name: "serial key 4",
        key: "37AA024EB374A26A7149044FADD5B497FDFF1A8EA6FF12F6FB65AF2720B59CCF",
        enabled: true,
        created: "15-Jan-2021"
      },
      {
        name: "serial key 5",
        key: "37AA024EB374A26A7149044FADD5B497FDFF1A8EA6FF12F6FB65AF2720B59CCF",
        enabled: true,
        created: "15-Jan-2021"
      },
      {
        name: "serial key 6",
        key: "37AA024EB374A26A7149044FADD5B497FDFF1A8EA6FF12F6FB65AF2720B59CCF",
        enabled: true,
        created: "15-Jan-2021"
      },
      {
        name: "My key",
        key: "7149044FADD5B497FDFF1A8EA6FF12F6FB65AF2720B537AA024EB374A26A9CCF",
        enabled: true,
        created: "15-Jan-2021"
      },
      {
        name: "Nicolus API key",
        key: "F1A8E37AA024EB374A26A7149044FADD5B497FDFA6FF12F6FB65AF2720B59CCF",
        enabled: true,
        created: "05-Apr-2021"
      }
    ]
  }),
  methods: {
    confirmDelete(item) {
      this.showAlert = true;
      this.selectedItem = item;
    },
    removeItem() {
      const index = this.data.indexOf(this.selectedItem);
      this.data.splice(index, 1);
      this.selectedItem = null;
    },
    handleDeleteDlg() {
      this.showAlert = false;
    },
    toggleOpen() {
      this.$emit("changeOpen");
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
</style>
