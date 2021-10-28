<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- DatatablesSearch -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <div class="">
      <v-card>
        <v-row align="center">
          <v-col class="grow">Users</v-col>
          <v-col class="shrink">
            <v-btn color="primary" to="/new-user">Add User</v-btn>
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

              <v-autocomplete
                v-show="filterType === 'lookup'"
                :items="filterLookupItems"
                :label="filterLookupLabel"
                v-model="filterLookupValue"
              ></v-autocomplete>
              
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
import moment from 'moment';

export default {
  name: "DataTable",

  data () {
    return {
    showAlert: false,
    selectedName: "",
    selectedRows: [],
    snackbar: false,
    actionItems:['Change plan', 'Add credits', 'Delete user'],
    actionSubItems: ['Free Trial', 'Lite', 'Pro', 'Enterprise', 'Freeze'],
    mainAction: '',
    subAction:'',
    actionSubmit: false,
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
    filterFields: [
        {text: 'First', value: 'firstName', type: 'text'},
        {text: 'Last', value: 'lastName', type: 'text'},
        {text: 'Emails', value: 'email', type: 'text'},
        {text: 'Type', value: 'type', type: 'text'},
        {text: 'Access', value: 'access', type: 'number'},
        {text: 'Credits', value: 'credits_used', type: 'number'}
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
    data: [
      {
        id:1,
        avartar:
          "https://ca.slack-edge.com/TGUK83BPA-U01KTG7MK34-g19920895070-512",
        firstName: "Martin",
        lastName: "Knapic",
        email: "knapicm@gmail.com",
        type: "Administrator",
        access: 123,
        credits_used: 300
      },
      {
        id:2,
        avartar:
          "https://ca.slack-edge.com/TN86UQ97H-US929HJSE-g28806d23364-512",
        firstName: "Visitor",
        lastName: "101",
        email: "visitorRandomeCreated101@gmail.com",
        type: "Viewer",
        access: 100,
        credits_used: 200
      }
    ]
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
        this.filterField = 'firstName'
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
      this.filterField = 'firstName'
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
