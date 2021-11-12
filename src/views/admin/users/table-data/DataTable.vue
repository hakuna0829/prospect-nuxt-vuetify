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
            <v-text-field type="number" v-show="mainAction === 'Add credits'" v-model="subAction" style="width:80px" outlined dense class="flex-grow-0"/>

            <v-btn
              v-if="subAction !== '' || mainAction === 'Delete user'"
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
                 class="me-1 me-md-2 input-custom"
                v-model="filterTerm2"
              ></v-text-field>

              <v-autocomplete
                v-show="filterType === 'lookup'"
                :items="filterLookupItems"
                :label="filterLookupLabel"
                v-model="filterLookupValue"
                class="me-1 me-md-2 input-custom"
              ></v-autocomplete>
              
            </div>
          </v-col>
          <v-col cols="12" sm="4" lg="1" xl="1" class="pt-0 d-flex justify-end align-center order-sm-2 order-lg-3 order-3">
            <!-- <v-btn light class="mr-2 align-self-center mt-2 yellow-btn white--text" color="#F1C40F" >
              <span>SEARCH</span>
            </v-btn> -->
            <!-- <v-btn light class="mr-2 align-self-center mt-2 yellow-btn white--text" color="#F1C40F" @click="onClearAllFilters">
              <span>CLEAR ALL</span>
            </v-btn> -->
            <v-btn color="primary" to="/admin/new-user" class="mr-2 align-self-end mt-2 yellow-btn white--text">Add User</v-btn>
          </v-col>
        </v-row>
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
          color="black"
          style="padding-top:80px"
        >
          The user has been successfully deleted
        </v-snackbar>
        <v-snackbar
          v-model="action_snackbar"
          top
          right
          color="black"
          style="padding-top:80px"
        >
          {{actionNotification}}
        </v-snackbar>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mdiDelete } from "@mdi/js";
import moment from 'moment';
import json from "./users_data.json";

export default {
  name: "DataTable",

  data () {
    return {
    showAlert: false,
    options: {
      itemsPerPage: 25
    }, 
    selectedName: "",
    snackbar: false,
    action_snackbar: false,
    actionItems:['Change plan', 'Add credits', 'Delete user'],
    actionSubItems: ['Free Trial', 'Lite', 'Pro', 'Enterprise', 'Freeze'],
    mainAction: '',
    subAction:'',
    actionSubmit: false,
    headers: [
      // { text: "", value: "avartar", filterable: false },
      { text: "Full name", value: "fullName", filterable: false, class: 'text-no-wrap' },
      { text: "Email", sortable: true, value: "email", class: 'text-no-wrap' },
      { text: "Login", sortable: true, value: "login", class: 'text-no-wrap' },
      { text: "Plan", sortable: true, value: "plan", class: 'text-no-wrap' },
      { text: "Type", value: "type", filterable: false , class: 'text-no-wrap'},
      { text: "Joined", value: "joined", filterable: false, class: 'text-no-wrap' },
      { text: "Purchased", value: "purchased", sortable: true, class: 'text-no-wrap' },
      { text: "Credits left", value: "credits", sortable: true , class: 'text-no-wrap'},
      { text: "Lists", value: "lists", sortable: true, class: 'text-no-wrap' },
      { text: "Total unique prospects", value: "total", filterable: false, class: 'text-no-wrap' },
      { text: "", value: "remove", filterable: false, sortable: false, class: 'text-no-wrap' }
    ],
    filterFields: [
        {text: 'Full name', value: 'fullName', type: 'text'},
        {text: 'Email', value: 'email', type: 'text'},
        {text: 'Login', value: 'login', type: 'text'},
        {text: 'Plan', value: 'plan', type: 'text'},
        {text: 'Type', value: 'type', type: 'text'},
        {text: 'Joined', value: 'joined', type: 'date'},
        {text: 'Purchased', value: 'purchased', type: 'date'},
        {text: 'Credits left', value: 'credits', type: 'number'},
        {text: 'Lists', value: 'lists', type: 'number'},
        {text: 'Total unique prospects', value: 'total', type: 'number'},
        
    ],
    pagination: {
        sortBy: 'last_name',
        rowsPerPage: -1,
    },
    filterDefs: {
        text: {contains: {display: 'Contains', function: this.filterByTextContains},
                startsWith: {display: 'Starts with', function: this.filterByTextStartsWith}},
        number: {equal: {display: 'Equal', function: this.filterByNumberEqual, decimalPoint: 1},
                  greater: {display: 'Greater than', function: this.filterByNumberGreater, decimalPoint: 1},
                  less: {display: 'Less than', function: this.filterByNumberLess, decimalPoint: 1},
                  between: {display: 'Between', function: this.filterByNumberBetween, decimalPoint: 1}},
        date: {equal: {display: 'Equal', function: this.filterByDateEqual, format: 'DD/MM/YYYY'},
                  greater: {display: 'Greater than', function: this.filterByDateGreater, format: 'DD/MM/YYYY'},
                  less: {display: 'Less than', function: this.filterByDateLess, format: 'DD/MM/YYYY'},
                  between: {display: 'Between', function: this.filterByDateBetween, format: 'DD/MM/YYYY'}},
        lookup: {is: {display: 'Is', function: this.filterByLookupIs},
                  isNot: {display: 'Is not', function: this.filterByLookupIsNot}}
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
    filterLookupItems: [],
    filterLookupValue: '',
    filterLookupLabel: '',
    icons: { mdiDelete },
    actionNotification: '',
    selectedItem: [],
    selectAll:false,
    selectAllPage:false,
    data: json.data
  }},
  computed: {
    filteredData () {
        if( this.filterField && this.filterOperator && (this.filterTerm || this.filterLookupValue)) {
            const filterFunction = this.filterDefs[this.filterType][this.filterOperator]['function']
            if(this.filterType === 'number') {
                const decimalPoint = this.filterDefs[this.filterType][this.filterOperator]['decimalPoint'] || 0
                if (this.filterOperator === 'between') {
                    if (this.filterTerm && this.filterTerm2) {
                        return filterFunction(this.data, this.filterField, this.filterTerm, this.filterTerm2,  decimalPoint)
                    } else {
                        return this.data
                    }
                } else {
                    return filterFunction(this.data, this.filterField, this.filterTerm, decimalPoint)
                }
            } else if (this.filterType === 'date') {
                const format = this.filterDefs[this.filterType][this.filterOperator]['format'] || this.dateFilterFormat
                if (this.filterOperator === 'between' && this.rulesIsValidDate(this.filterTerm) && this.rulesIsValidDate(this.filterTerm2)) {
                    return filterFunction(this.data, this.filterField, this.filterTerm, this.filterTerm2, format)
                } else if (this.filterOperator !== 'between' && this.rulesIsValidDate(this.filterTerm)) {
                    return filterFunction(this.data, this.filterField, this.filterTerm, format)
                } else {
                    return this.data
                }
            } else if (this.filterType === 'lookup') {
                return filterFunction(this.data, this.filterField, this.filterLookupValue)
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
      } else if (this.filterType === 'number') {
        if (this.filterField === 'gpa') {
            this.filterTermMask = '#.#'
            this.filterTermLabel = '#.#'
        } else if (this.filterField === 'zip') {
            this.filterTermMask = '#####'
            this.filterTermLabel = '#####'
        } else {
            this.filterTermMask = '######'
            this.filterTermLabel = 'Number'
        }
      } else if (this.filterType === 'date') {
        this.filterTermMask = '##/##/####'
        this.filterTermLabel = 'DD/MM/YYYY'
        this.filterTermRules = [this.rulesIsValidDate]
      } else if (this.filterType === 'lookup') {
        let lookupItems = []
        if (this.filterField === 'email_verify') {
            lookupItems = ['Yes', 'No']
            this.filterLookupLabel = 'Email Verify'
        }
        this.filterLookupItems = lookupItems
        this.filterLookupValue = ''
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
    closeAlert() {
      this.selectedName = "";
      this.showAlert = false;
    },
    clearSelection(){
      this.selectAll=false; 
      // selectAllPage=false;  
      document.getElementById('selectAll').click();
    },
    handleSelectAllPage(){
      if(!this.selectAllPage){
        this.selectAll = false;
      }
      let array1 = [];
      for(var i=1; i< 200 ; i++){
        let item = {
          "id": i,
          "fullName": 'Josh Mark',
          "email":'osh@crystal.io',
          "login": 'Google',
          "plan": 'Pro',
          "type": 'Monthly',
          "joined": '9/25/2021 12:56:44 PM',
          "purchased": '9/25/2021 1:00:33 PM',
          "credits": 456,
          "lists": 6,
          "total": 452
        }
        array1.push(item);
      }
      console.log('new data', array1);
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
        if(this.mainAction === 'Add credits'){
          this.actionNotification = 'The credits have been added to selected users.';
          this.action_snackbar = true;
        }
        if(this.mainAction === 'Delete user'){
           
          this.confirmDelete('1');
          this.actionNotification = 'Selected users have been deleted successfully.';
        }
        
        
      }, [2000]);
    },
    changeMainAction(obj){
      console.log('change action', obj)
      this.mainAction = obj;
      this.subAction = '';
      console.log(this.selected)
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
        this.filterLookupValue = ''
        this.filterLookupItems = []
        this.filterLookupLabel = ''
    },
    rulesIsValidDate (value) {
        return moment(value, 'DD/MM/YYYY', true).isValid()
    },
    // ---------- Events ------------------------
    onClearAllFilters () {
        this.filterField = 'fullName';
        this.clearFilterTerms();
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
    filterByNumberEqual (list, fieldName, fieldValue, decimalPoint) {
        decimalPoint = decimalPoint || 0
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
                return Number(item[fieldName]).toFixed(decimalPoint) === Number(fieldValue).toFixed(decimalPoint)
            } else {
                return true
            }
        })
    },
    filterByNumberGreater (list, fieldName, fieldValue, floatPoint, decimalPoint) {
      console.log( fieldName, fieldValue, floatPoint, decimalPoint)
     
        decimalPoint = decimalPoint || 0
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
                return Number(Number(item[fieldName]).toFixed(decimalPoint)) > Number(Number(fieldValue).toFixed(decimalPoint))
            } else {
                return true
            }
        })
    },
    filterByNumberLess (list, fieldName, fieldValue, decimalPoint) {
        decimalPoint = decimalPoint || 0
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
                return Number(Number(item[fieldName]).toFixed(decimalPoint)) < Number(Number(fieldValue).toFixed(decimalPoint))
            } else {
                return true
            }
        })
    },
    filterByNumberBetween (list, fieldName, fieldValue1, fieldValue2, decimalPoint) {
        decimalPoint = decimalPoint || 0
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
                return Number(Number(item[fieldName]).toFixed(decimalPoint)) >= Number(Number(fieldValue1).toFixed(decimalPoint))
                    && Number(Number(item[fieldName]).toFixed(decimalPoint)) <= Number(Number(fieldValue2).toFixed(decimalPoint))
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
        // var m = moment("25/9/2021 1:00:33 PM", 'DD MM YYYY hh:mm:ss A');
        
         const result = moment("25/09/2021 01:00:33", 'DD MM YYYY hh:mm:ss', true).isAfter(moment(fieldValue, format), 'day')

        console.log('result', result)
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
              let cDate= item[fieldName].split(' ')[0];
              return moment(cDate, 'DD MM YYYY').isAfter(moment(fieldValue, format), 'day')
            } else {
              return true
            }
        })
    },
    filterByDateLess (list, fieldName, fieldValue, format) {
        format = format || this.dateFilterFormat
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
              let cDate= item[fieldName].split(' ')[0];
                return moment(cDate, 'DD MM YYYY').isSameOrBefore(moment(fieldValue, format), 'day')
            } else {
                return true
            }
        })
    },
    filterByDateBetween (list, fieldName, fieldValue1, fieldValue2, format) {
        format = format || this.dateFilterFormat
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
              let cDate= item[fieldName].split(' ')[0];
                return moment(cDate, 'DD MM YYYY').isBetween(moment(fieldValue1, format), moment(fieldValue2, format), 'day', '[]')
            } else {
                return true
            }
        })
    },
    filterByLookupIs (list, fieldName, fieldValue) {
      console.log(list, fieldName, fieldValue)
        const compareValue = fieldValue === 'Yes' ? true : false;
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
                return item[fieldName] === compareValue 
            } else {
                return true
            }
        })
    },
    filterByLookupIsNot (list, fieldName, fieldValue) {
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
                return item[fieldName] !== fieldValue
            } else {
                return true
            }
        })
    }
  },
  components: {
    DeleteDialog: () => import("../DeleteDialog")
  },
  created () {
      this.filterField = 'fullName'
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
  max-width: 180px;
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
