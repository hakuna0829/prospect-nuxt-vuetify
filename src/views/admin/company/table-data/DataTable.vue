<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- DatatablesSearch -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <div class="">
      <v-card>
        <v-row align="center">
          <v-col class="grow">Companies</v-col>
          <v-col class="shrink">
            <v-btn color="primary" to="/admin/new-company">Add Company</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" xl="4" class="d-flex">
            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="rounded-lg actionBtn "
                >
                  <span>{{mainAction !== '' ? mainAction : 'Select action'}}</span>
                </v-btn>
              </template>

              <v-list>
                <v-list-item @click="changeMainAction(item)" v-for="(item, i) in actionItems" :key="i">
                  <v-list-item-title>{{item}}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-menu v-if="mainAction === 'Change plan'">
              <template v-slot:activator="{ on, attrs }" >
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="rounded-lg actionBtn "
                >
                  <span>{{subAction !== '' ? subAction : 'Choose list'}}</span>
                </v-btn>
              </template>

              <v-list>
                <v-list-item @click="changeSubAction(item)" v-for="(item, i) in actionSubItems" :key="i">
                  <v-list-item-title>{{item}}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <!-- <v-text-field type="number" v-show="mainAction === 'Add seats'" v-model="subAction" style="width:80px" outlined dense class="flex-grow-0"/> -->
            <v-select
              v-show="mainAction === 'Add seats'"
              :items="actionSubItems2"
              v-model="subAction"
              style="width:120px"
              class="flex-grow-0"
              dense
              solo
            ></v-select>

            <v-btn
              v-if="subAction !== '' || mainAction === 'Delete company'"
              class="rounded-lg primary ms-2"
              @click="handleActionSubmit"
            >
              SUBMIT
            </v-btn>&nbsp;
            <v-progress-circular
              indeterminate
              :size="20"
              color="primary"
              v-if="actionSubmit"
            ></v-progress-circular>
          </v-col>
          <v-col cols="12" sm="12" lg="10" xl="7" class=" py-0">
            <div class="d-flex">
              <v-btn light class="mr-2 align-self-center mb-2 yellow-btn white--text" color="#F1C40F" >
                <span>Export</span>
              </v-btn>
              <v-select
                :items="filterFields"
                v-model="filterField"
                label="Filter by"
                :full-width="false"
                class="me-1 me-md-2"
              >
              </v-select>
              <v-select
                :items="filterOperators"
                v-model="filterOperator"
                label="Operator"
                :full-width="false"
                class="me-1 me-md-2"
              />
              <v-text-field
                v-show="filterOperator && filterType !== 'lookup'"
                name="filterTerm"
                :label="filterTermLabel"
                :mask="filterTermMask"
                :rules='filterTermRules'
                return-masked-value
                v-model="filterTerm"
                hide-details="auto"
                class="me-1 me-md-2"
              />
              
              <v-text-field
                v-show="filterOperator === 'between'"
                name="filterTerm2"
                :label="filterTermLabel"
                :mask="filterTermMask"
                :rules='filterTermRules'
                return-masked-value
                v-model="filterTerm2"
              ></v-text-field>

            </div>
          </v-col>
          <v-col sm="12" lg="2" xl="1" class="pt-0">
            <!-- <v-btn light class="mr-2 align-self-center mt-2 yellow-btn white--text" color="#F1C40F" >
              <span>SEARCH</span>
            </v-btn> -->
            <v-btn light class="mr-2 align-self-center mt-2 yellow-btn white--text" color="#F1C40F" @click="onClearAllFilters">
              <span>CLEAR ALL</span>
            </v-btn>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="filteredData"
          item-key="id"
          class="border"
          show-select
          v-model="selectedRows"
          :footer-props="{
            'items-per-page-options': [10, 50, 200, -1]
          }"
        >
        
          <template v-slot:item.logo="{item}">
            <img :src="item.logo" alt="" width="25px" />
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
import moment from 'moment';
import logo from '../../../../assets/images/prospectShortlogo.png';

export default {
  name: "DataTable",

  data () {
    return {
    showAlert: false,
    selectedName: "",
    selectedRows: [],
    snackbar: false,
    actionItems:['Change plan', 'Add seats', 'Delete company'],
    actionSubItems: ['Free Trial', 'Enterprise Tier 1', 'Enterprise Tier 2', 'Enterprise Tier 3', 'Freeze'],
    actionSubItems2: [0, 1,2,3,4,5,6,7,8,9,10],
    mainAction: '',
    subAction:'',
    actionSubmit: false,
    headers: [
      { text: "", value: "logo", filterable: false, sortable:false },
      { text: "Company Name", value: "name", filterable: false },
      { text: "Website URL", value: "siteUrl", filterable: false },
      { text: "Address", value: "address", filterable: false },
      { text: "City", value: "city", filterable: false },
      { text: "Country", value: "country", filterable: false }
    ],
    filterFields: [
        {text: 'Name', value: 'name', type: 'text'},
        {text: 'URL', value: 'siteUrl', type: 'text'},
        {text: 'Address', value: 'address', type: 'text'},
        {text: 'City', value: 'city', type: 'text'},
        {text: 'Country', value: 'country', type: 'text'}
    ],
    pagination: {
        sortBy: 'name',
        rowsPerPage: -1,
    },
    filterDefs: {
        text: {contains: {display: 'Contains', function: this.filterByTextContains},
                startsWith: {display: 'Starts with', function: this.filterByTextStartsWith}},
        date: {equal: {display: 'Equal', function: this.filterByDateEqual, format: 'DD/MM/YYYY'},
                  greater: {display: 'Greater than', function: this.filterByDateGreater, format: 'DD/MM/YYYY'},
                  less: {display: 'Less than', function: this.filterByDateLess, format: 'DD/MM/YYYY'},
                  between: {display: 'Between', function: this.filterByDateBetween, format: 'DD/MM/YYYY'}}
    },
    filterField: '',
    filterType: '',
    filterOperators: [],
    filterOperator: '',
    filterTerm: '',
    filterTerm2: '',
    filterTermMask: '',
    filterTermLabel: '',
    filterTermRules: [],
    dateFilterFormat: 'DD MMM YY HH:mm A',
    icons: { mdiDelete },
    data: [
      {
        id: 1,
        logo: logo,
        name: "Prospect Role",
        siteUrl: "https://prospectrole.com",
        address: "Rue de I'Ale",
        city: "Lausanne",
        country: "Switzerland"
      },
      {
        id:2,
        logo: logo,
        name: "Wedding Dress",
        siteUrl: "https://weddingdress.com",
        address: "Lindon Street 2",
        city: "Lausanne",
        country: "Switzerland"
      }
    ]
  }},
  computed: {
    filteredData () {
        if( this.filterField && this.filterOperator && (this.filterTerm || this.filterLookupValue)) {
            const filterFunction = this.filterDefs[this.filterType][this.filterOperator]['function']
            if (this.filterType === 'date') {
                const format = this.filterDefs[this.filterType][this.filterOperator]['format'] || this.dateFilterFormat
                if (this.filterOperator === 'between' && this.rulesIsValidDate(this.filterTerm) && this.rulesIsValidDate(this.filterTerm2)) {
                    return filterFunction(this.data, this.filterField, this.filterTerm, this.filterTerm2, format)
                } else if (this.filterOperator !== 'between' && this.rulesIsValidDate(this.filterTerm)) {
                    return filterFunction(this.data, this.filterField, this.filterTerm, format)
                } else {
                    return this.data
                }
            } else {
                return filterFunction(this.data, this.filterField, this.filterTerm)
            }
        } else {
            return this.data
        }
    }
  },
  watch: {
    filterField (newValue) {
      const filterType = this.filterFields.find(item => item.value === newValue).type
      console.log('filterField====', newValue, filterType);
      if(filterType) {
          this.filterType = filterType
          this.filterOperators = this.getFilterOperators(this.filterDefs[filterType])
          this.filterOperator = this.filterOperators[0]['value']
          this.clearFilterTerms()
      } else {
          this.filterType = ''
          this.filterOperators = []
          this.filterOperator = ''
          this.clearFilterTerms()
      }
    },
    filterOperator () {
      console.log('filter operator')
      this.clearFilterTerms()
      if (this.filterType === 'text') {
        this.filterTermMask = ''
        this.filterTermLabel = 'Filter'
      } else if (this.filterType === 'date') {
        this.filterTermMask = '##/##/####'
        this.filterTermLabel = 'DD/MM/YYYY'
        this.filterTermRules = [this.rulesIsValidDate]
      } 
    }
  },
  filters: {
      shortDate (value, format) {
          return moment(value).format(format)
      },
      gpaFloat (value) {
          return value.toFixed(1)
      }
  },
  methods: {
    rowClicked(row) {
      this.swapSelectionStatus(row.id);
      this.log(row);
    },
    swapSelectionStatus(keyID) {
      if (this.selectedRows.includes(keyID)) {
        this.selectedRows = this.selectedRows.filter(
          selectedKeyID => selectedKeyID !== keyID
        );
      } else {
        this.selectedRows.push(keyID);
      }
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
    },
    handleActionSubmit(){
      this.actionSubmit = true;
      setTimeout(() => {
        this.actionSubmit = false;
      }, [2000]);
    },
    changeMainAction(obj){
      console.log('change action', obj)
      this.mainAction = obj;
      this.subAction = '';
      console.log(this.selectedRows)
    },
    changeSubAction(obj){
      this.subAction = obj;
    },
    getFilterOperators (filterDef) {
        let oprs = []
        if(filterDef) {
            for(let key in filterDef) {
                oprs.push({text: filterDef[key]['display'], value: key})
            }
        }
        return oprs
    },
    clearFilterTerms () {
        this.filterTerm = ''
        this.filterTerm2 = ''
        this.filterTermMask = ''
        this.filterTermLabel = 'Filter'
        this.filterTermRules = []
    },
    rulesIsValidDate (value) {
        return moment(value, 'DD/MM/YYYY', true).isValid()
    },
    // ---------- Events ------------------------
    onClearAllFilters () {
        this.filterField = 'name'
    },
    // ---------- field filter methods ----------
    filterByTextContains (list, fieldName, fieldValue) {
      console.log('filterByTextContains-----------------------');
        const re = new RegExp(fieldValue, 'i')
        return this.filterByRegExp(list, fieldName, fieldValue, re)
    },
    filterByTextStartsWith (list, fieldName, fieldValue) {
        const re = new RegExp('^' + fieldValue, 'i')
        return this.filterByRegExp(list, fieldName, fieldValue, re)
    },
    filterByRegExp(list, fieldName, fieldValue, regExp) {
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
                return regExp.test(item[fieldName])
            } else {
                return true
            }
        })
    },
    filterByDateEqual (list, fieldName, fieldValue, format) {
        format = format || this.dateFilterFormat
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
                return moment(item[fieldName]).isSame(moment(fieldValue, format), 'day')
            } else {
                return true
            }
        })
    },
    filterByDateGreater (list, fieldName, fieldValue, format) {
      console.log(list, fieldName, fieldValue, format)
        format = format || this.dateFilterFormat
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
                return moment(item[fieldName]).isAfter(moment(fieldValue, format), 'day')
            } else {
                return true
            }
        })
    },
    filterByDateLess (list, fieldName, fieldValue, format) {
        format = format || this.dateFilterFormat
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
                return moment(item[fieldName]).isBefore(moment(fieldValue, format), 'day')
            } else {
                return true
            }
        })
    },
    filterByDateBetween (list, fieldName, fieldValue1, fieldValue2, format) {
        format = format || this.dateFilterFormat
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
                return moment(item[fieldName]).isBetween(moment(fieldValue1, format), moment(fieldValue2, format), 'day', '[]')
            } else {
                return true
            }
        })
    },

  },
  components: {
    DeleteDialog: () => import("../DeleteDialog")
  },
  created () {
      this.filterField = 'name'
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

.actionBtn {
    border: #4180FF solid 1px;
    width: 130px;
    text-transform: capitalize;
    margin-right: 8px;
    
  }
.actionBtn span {
  overflow: hidden;
  width: 120px;
  text-overflow: ellipsis;
  display: block;
  letter-spacing: 0rem;
}
</style>
