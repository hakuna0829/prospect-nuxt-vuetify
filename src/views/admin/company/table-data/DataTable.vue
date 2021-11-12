<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- DatatablesSearch -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <div class="">
      <v-card style="box-shadow:none">
        

        <v-row>
           <v-col cols="12" sm="8" lg="5" xl="4" class="d-flex order-xl-1 order-sm-1 order-1">
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
          <v-col cols="12" sm="12" lg="6" xl="7" class=" py-0 order-lg-2 order-sm-3 order-2">
            <div class="d-flex">
              <v-btn light class="mr-2 align-self-center mb-2 yellow-btn white--text" color="#F1C40F" >
                <span>Export</span>
              </v-btn>
              <v-select
                :items="filterFields"
                v-model="filterField"
                label="Filter by"
                :full-width="false"
                class="me-1 me-md-2 input-custom"
              >
              </v-select>
              <v-select
                :items="filterOperators"
                v-model="filterOperator"
                label="Operator"
                :full-width="false"
                class="me-1 me-md-2 input-custom"
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
                class="me-1 me-md-2 input-custom"
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
          <v-col cols="12" sm="4" lg="1" xl="1" class="pt-0 d-flex justify-end align-center order-sm-2 order-lg-3 order-3">
            <!-- <v-btn light class="mr-2 align-self-center mt-2 yellow-btn white--text" color="#F1C40F" >
              <span>SEARCH</span>
            </v-btn> -->
            <!-- <v-btn light class="mr-2 align-self-center mt-2 yellow-btn white--text" color="#F1C40F" @click="onClearAllFilters">
              <span>CLEAR ALL</span>
            </v-btn> -->
            <v-btn color="primary" to="/admin/new-company" class="mr-2 align-self-end mt-2 yellow-btn white--text">Add Company</v-btn>
          </v-col>
        </v-row>
        <!--  -->
        <div class="text-center my-2 p-2 " v-if="selectAllPage">
          <span v-if="!selectAll">All {{selectedItem.length}} records are selected. </span>
          <span v-else>All {{filteredData.length}} records are selected. </span>
          <a class="" v-if="!selectAll" @click="selectAll=true">Select all {{filteredData.length}} records.</a>
          <a class="" v-else @click="clearSelection">Clear selection.</a>
        </div>
        
        <v-data-table
          :headers="headers"
          :items="filteredData"
          item-key="id"
          class="border"
          show-select
          v-model="selectedItem"
           :options="options"
          :footer-props="{
            'items-per-page-options': [10, 25, 50, 100, -1]
          }"
        >
        <template v-slot:header.data-table-select="{ on, props }"> 
            <v-simple-checkbox id="selectAll" :ripple="false" @click="handleSelectAllPage" v-model="selectAllPage" v-bind="props" v-on="on"></v-simple-checkbox>
          </template>
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
          v-model="action_snackbar"
          top
          right
          color="black"
          style="padding-top:80px"
        >
          {{actionNotification}}
        </v-snackbar>
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
// import logo from '../../../../assets/images/prospectShortlogo.png';
import json from "./companies_data.json";

export default {
  name: "DataTable",

  data () {
    return {
    showAlert: false,
    selectedName: "",
    snackbar: false,
    action_snackbar: false,
    actionItems:['Change plan', 'Add seats', 'Delete company'],
    actionSubItems: ['Free Trial', 'Enterprise Tier 1', 'Enterprise Tier 2', 'Enterprise Tier 3', 'Freeze'],
    actionSubItems2: [0, 1,2,3,4,5,6,7,8,9,10],
    mainAction: '',
    subAction:'',
    actionSubmit: false,
    headers: [
      { text: "Company Name", value: "name", filterable: false, class: 'text-no-wrap' },
      { text: "Admin", value: "admin", filterable: false, class: 'text-no-wrap' },
      { text: "Email", value: "email", filterable: false, class: 'text-no-wrap' },
      { text: "Plan", value: "plan", filterable: false, class: 'text-no-wrap' },
      { text: "Commitment", value: "commitment", filterable: false, class: 'text-no-wrap' },
      { text: "Seats available", value: "seats_available", filterable: false, class: 'text-no-wrap' },
      { text: "Seats used", value: "seats_used", filterable: false, class: 'text-no-wrap' },
      { text: "Price per seat", value: "price_per_seat", filterable: false, class: 'text-no-wrap' },
      { text: "MRR", value: "mbr", filterable: false, class: 'text-no-wrap' },
      { text: "ARR", value: "arr", filterable: false, class: 'text-no-wrap' },
      { text: "Income so far", value: "income", filterable: false, class: 'text-no-wrap' },
      { text: "Credits used so far", value: "credits", filterable: false, class: 'text-no-wrap' },
      { text: "EVS credits used so far", value: "evs", filterable: false, class: 'text-no-wrap' }
    ],
    filterFields: [
        {text: 'Company Name', value: 'name', type: 'text'},
        {text: 'Admin', value: 'admin', type: 'text'},
        {text: 'Email', value: 'email', type: 'text'},
        {text: 'Plan', value: 'plan', type: 'text'},
        {text: 'Commitment', value: 'commitment', type: 'text'},
        {text: 'Seats available', value: 'seats_available', type: 'number'},
        {text: 'Seats used', value: 'seats_used', type: 'number'},
        {text: 'Price per seat', value: 'price_per_seat', type: 'number'},
        {text: 'MRR', value: 'mbr', type: 'number'},
        {text: 'ARR', value: 'arr', type: 'number'},
        {text: 'Income so far', value: 'income', type: 'number'},
        {text: 'Credits used so far', value: 'credits', type: 'number'},
        {text: 'EVS credits used so far', value: 'evs', type: 'number'},
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
    actionNotification: '',
    data: json.data,
    selectedItem: [],
    selectAll:false,
    selectAllPage:false,
    options: {
      itemsPerPage: 25
    }, 
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
    handleSelectAllPage(){
      if(!this.selectAllPage){
        this.selectAll = false;
      }
       let array1 = [];
      for(var i=1; i< 200 ; i++){
        let item = {
          "id": i,
          'name': 'SecuTix',
          'admin': 'Josh Miner',
          'email': 'josh@secutix.com', 
          'plan': 'Pro',
          'commitment': 'Annual',
          'seats_available': 5,
          'seats_used': 5, 
          'price_per_seat': 69,
          'mbr': 345,
          'arr': 200,
          'income': 120,
          'credits': 30,
          'evs': 50
        }
        array1.push(item);
      }
      console.log('new data', array1);
    },
    clearSelection(){
      this.selectAll=false; 
      // selectAllPage=false;  
      document.getElementById('selectAll').click();
    },
    swapSelectionStatus(keyID) {
      if (this.selectedItem.includes(keyID)) {
        this.selectedItem = this.selectedItem.filter(
          selectedKeyID => selectedKeyID !== keyID
        );
      } else {
        this.selectedItem.push(keyID);
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
      // this.selectedName = null;
       this.selectedItem = [];
      this.action_snackbar = true;
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
        if(this.mainAction === 'Change plan'){
          this.actionNotification = 'Changes successfully updated.';
          this.action_snackbar = true;
        }
        if(this.mainAction === 'Add seats'){
          this.actionNotification = 'The seats have been added to selected users.';
          this.action_snackbar = true;
        }
        if(this.mainAction === 'Delete company'){
           this.confirmDelete('1');
          this.actionNotification = 'Selected companies have been deleted successfully.';
        }
        
        
      }, [2000]);
    },
    changeMainAction(obj){
      console.log('change action', obj)
      this.mainAction = obj;
      this.subAction = '';
      console.log(this.selectedItem)
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
    makeDummyDataJson () {
      let newJson = [];
       Array(200).fill('').map((i, index)=>{
        //  let item = {
        //     id: index+1,
        //     logo: logo,
        //     name: "Prospect Role1",
        //     siteUrl: "https://prospectrole.com",
        //     address: "Rue de I'Ale",
        //     city: "Lausanne",
        //     country: "Switzerland"
        //   }
         let item = {
          id:index+1,
          linkedin_url: 'https://www.linkedin.com/in/martinknapic/',
          company_url: 'https://www.linkedin.com/company/prospect-role/',
          first_name: 'Martin',
          last_name: 'Knapic',
          email: 'knapic@gmail.com',
          email_verify: true,
          domain: 'prospectrole.com',
          role: 'Product Manager',
          country: 'Switzerland',
          city: 'Lausanne',
          company: 'Crystal Ltd',
          sector: 'Information technology',
          created: "2021-10-02T05:00:00.000Z",
          avartar:
            "https://ca.slack-edge.com/TN86UQ97H-US929HJSE-g28806d23364-512"
          }
          newJson.push(item);
       })
      console.log('dummy json', newJson);
    },
    // ---------- Events ------------------------
    onClearAllFilters () {
        this.clearFilterTerms()
        this.filterField = 'name'
        this.makeDummyDataJson()
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
.customClass {
  white-space: nowrap !important;
}

@media #{map-get($display-breakpoints, 'md-and-down')} {
  
}
@media #{map-get($display-breakpoints, 'sm-and-down')} {
}

.email {
  margin: 0px;
  max-width: 160px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (min-width: 1904px) {
    max-width: 180px;
    margin: 0px;
  }
}
.input-custom {
  max-width: 150px;
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
