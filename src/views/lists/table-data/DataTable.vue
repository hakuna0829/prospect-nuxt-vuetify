<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- DatatablesSearch -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <div class="">
      <v-card style="box-shadow:none;">
        <v-row align="center">
          <v-col class="grow"></v-col>
          <v-col class="shrink">
            <v-btn color="primary" @click="toggleOpen()">NEW LIST</v-btn>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="data"
          item-key="id"
          class="border"
          :custom-sort="customSort"
          :footer-props="{
            'items-per-page-options': [10, 50, 100, -1]
          }"
          :options="options"
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
          color="black"
          style="padding-top:80px"
        >
          The user has been successfully deleted
        </v-snackbar>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mdiDelete } from "@mdi/js";
import moment from 'moment';
import json from './lists_data.json'

export default {
  name: "DataTable",
  props: ["added"],

  data: () => ({
    showAlert: false,
    selectedName: "",
    snackbar: false,
    options: {
      itemsPerPage: 100
    }, 
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
    data: json.data
  }),
   computed: {
    // viewlink(item) {
    //   return 'detail-list/'+item.id;
    // }
  },
  watch: {
    added: function(newVal) {
      if(newVal){
        this.addNewRow();
      }
    }
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
    customSort(items, index, isDesc) {
      console.log(items, index[0], isDesc, typeof index)
      items.sort((a, b) => {
          if(a.static === true ) return -1;
          if(b.static === true ) return 1;
          if (!isDesc) {
            return a[index] < b[index] ? -1 : 1;
          } else {
            return b[index] < a[index] ? -1 : 1;
          }
      });
      return items;
    },
    addNewRow() {
      const dataLength = this.data.length;
      const newRow = {
        id: dataLength + 1,
        label: " ",
        date: '',//moment().format("MMM d, YYYY"),
        static: false,
        prospect: 0,
        email: 0,
        created: moment().format("DD-MM-YYYY hh:mm A"),
        lastUpdated: moment().format("DD-MM-YYYY hh:mm A"),
        owner: "Martin Knapic",
        avartar:
          "https://ca.slack-edge.com/TN86UQ97H-US929HJSE-g28806d23364-512",
        contributors:[
          "https://ca.slack-edge.com/TGUK83BPA-U01KTG7MK34-g19920895070-512",
        ]  
      }
      console.log('newRow', newRow)
                    // starting with the index where
       console.log(this.data.findIndex( elt => elt.static === false))
       const index = this.data.findIndex( elt => elt.static === false)
       this.data.splice(index, 0, newRow)
       console.log('updated...', this.data)
      // this.data.filter((item) => )
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
