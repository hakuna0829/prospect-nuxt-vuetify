<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- DatatablesSearch -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <div class="">
      <v-card>
        <v-row align="center">
          <v-col class="grow">LISTS</v-col>
          <v-col class="shrink">
            <v-btn color="primary" @click="toggleOpen()">NEW LIST</v-btn>
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
          <template v-slot:item.label="{ item }">
            <div class="email d-flex align-item-center">
              <div class="folder">
                <span >
                  <v-icon  color="white">mdi-folder</v-icon>
                </span>
              </div>
              
              <div class="ml-2">
                <router-link :to='viewlink(item)' class="black--text">
                  <div>{{item.label}}</div>
                </router-link>
                <div class="text--caption">{{item.date}}</div>
              </div>
              <template v-if="item.static">
                 <v-chip
                  class="ma-2 white--text text-sm"
                  small
                  color="#6D9DFF"
                >
                  STATIC LIST
                </v-chip>
              </template>
            </div>
          </template>
         
          <!-- <template v-slot:item.label="{ item }">
            <img :src="item.avartar" alt="" width="30px" />
          </template> -->
          <template v-slot:item.prospect="{ item }">
            <p class="email ">{{ item.prospect }}</p>
          </template>
          <template v-slot:item.owner="{ item }">
            <p class="email">{{ item.owner }}</p>
          </template>

          <template v-slot:item.email="{ item }">
            <p class="email">{{ item.email }}</p>
          </template>
          <template v-slot:item.lastUpdated="{ item }">
            <p class="email">{{ item.lastUpdated }}</p>
          </template>
          <template v-slot:item.created="{ item }">
            <p class="email">{{ item.created }}</p>
          </template>
          <template v-slot:item.contributors="{item}">

            <!-- {{contributors(item.contributors)}} -->
            <!-- .map((c,i) => <img src={c} key={i} alt={i} />) -->
            <ul class="contributor">
              <li v-for="(c, i) in item.contributors" :key="i">
                <img :src="c" :alt="i" width="30px" />
              </li>
            </ul>
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
      { text: "", value: "label", filterable: false, sortable: false },
      { text: "Prospects", value: "prospect", sortable: true },
      { text: "Emails", value: "email", filterable: false },
      { text: "Created", value: "created", filterable: false },
      { text: "Last Updated", value: "lastUpdated", filterable: false },
      { text: "Owner", value: "owner", filterable: false },
      { text: "Contributors", value: "contributors", filterable: false },
      { text: "", value: "remove", filterable: false, sortable: false }
    ],
    icons: { mdiDelete },
    id: window.location.pathname.split('/')[2], //this is the id from the browser
    data: [
      {
        id:1,
        label: "All Extension prospects",
        date: "Jan 9, 2014",
        static: true,
        prospect: 130,
        email: 120,
        created: "10-Oct-2021 10:35 PM",
        lastUpdated: "15-Oct-2021 08:25 PM",
        owner: "Martin Knapic",
        avartar:
          "https://ca.slack-edge.com/TN86UQ97H-US929HJSE-g28806d23364-512",
        contributors:[
          "https://ca.slack-edge.com/TGUK83BPA-U01KTG7MK34-g19920895070-512",
          "https://ca.slack-edge.com/TN86UQ97H-US929HJSE-g28806d23364-512",
          "https://ca.slack-edge.com/TGUK83BPA-U01KTG7MK34-g19920895070-512",
          "https://ca.slack-edge.com/TN86UQ97H-US929HJSE-g28806d23364-512"
        ]  
      },
      {
        id:2,
        label: "All Ceos from UK",
        date: "Feb 19, 2014",
        static: false,
        prospect: 230,
        email: 250,
        created: "10-Oct-2021 10:35 PM",
        lastUpdated: "15-Oct-2021 08:25 PM",
        owner: "Martin Knapic",
        avartar:
          "https://ca.slack-edge.com/TN86UQ97H-US929HJSE-g28806d23364-512",
        contributors:[
          "https://ca.slack-edge.com/TN86UQ97H-US929HJSE-g28806d23364-512",
          "https://ca.slack-edge.com/TGUK83BPA-U01KTG7MK34-g19920895070-512",
          "https://ca.slack-edge.com/TN86UQ97H-US929HJSE-g28806d23364-512",
          "https://ca.slack-edge.com/TGUK83BPA-U01KTG7MK34-g19920895070-512"
        ]  
      }
    ]
  }),
   computed: {
    // viewlink(item) {
    //   return 'detail-list/'+item.id;
    // }
  },
  methods: {
    contributors (items) {
      return items.map((item, i) => {return <p key={i}>{item}</p>})
    },
    viewlink(item) {
      return 'detail-list/'+item.id;
    },
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
  // max-width: 100px;
  // overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (min-width: 1904px) {
    // max-width: 180px;
    // margin: 0px;
  }
}

.folder {
  display: flex;
  align-items: center;
  span {
    background-color: #bdbdbd;
    border-radius: 50%;
    border:solid 1px #bdbdbd;
    padding: 5px;
  }  
}

.contributor {
  display: flex;
  padding-left: 0px;
  li {
    list-style: none;
    margin-left: -5px;
    img {
      border-radius: 50%;
    }
  }
}
</style>
<style>
  .v-data-table-header tr th {
    /* display: flex !important;
    align-items: center !important; */
    white-space: nowrap;
  }
</style>
