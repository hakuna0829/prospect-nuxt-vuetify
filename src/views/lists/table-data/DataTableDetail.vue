<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- DatatablesSearch -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <div class="">
      <v-card>
        <v-row align="center">
          <v-col class="grow">LISTS/All Extension Prospects 
            <template >
                <v-chip
                class="ma-2 white--text text-sm"
                small
                color="#6D9DFF"
              >
                STATIC LIST
              </v-chip>
            </template>
          </v-col>
          <v-col class="shrink">
            <v-btn color="primary" @click="toggleOpen()">ADD PROSPECT</v-btn>
          </v-col>
        </v-row>
        <v-row>
          
            <v-col cols="12" xl="4">
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="rounded-lg actionBtn mt-2"
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
              <v-menu v-if="mainAction !== ''">
                <template v-slot:activator="{ on, attrs }" >
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="rounded-lg actionBtn mt-2"
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
              <v-btn
                v-if="subAction !== ''"
                class="rounded-lg primary mt-2"
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
                <v-btn light class="mr-2 align-self-center mb-2 yellow-btn white--text" color="#F1C40F" @click="handleBulkEmailDlg(true)">
                  <span>Bulk email search</span>
                </v-btn>
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
                   <!-- <template v-slot:item="{ item, attrs, on }">
                    <v-list-item
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-list-item-title
                        :id="attrs['aria-labelledby']"
                        v-text="item"
                      ></v-list-item-title>
                    </v-list-item>
                  </template>  -->
                </v-select>
               <v-select
                  :items="filterOperators"
                  v-model="filterOperator"
                  label="Operator"
                  :full-width="false"
                  class="me-1 me-md-2"
                >
                   <!-- <template v-slot:item="{ item, attrs, on }">
                    <v-list-item
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-list-item-title
                        :id="attrs['aria-labelledby']"
                        v-text="item"
                      ></v-list-item-title>
                    </v-list-item>
                  </template>  -->
                </v-select>
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
                ></v-text-field>
                
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
          item-key="label"
          class="border"
           show-select
           
          :footer-props="{
            'items-per-page-options': [10, 50, 200, -1]
          }"
        >
          <template v-slot:item.id="{ item }">
            <div  class="d-flex align-center">
              <v-icon color="#0097d3">mdi-linkedin</v-icon>
              <v-menu
                bottom
                left
                offset-y
                origin="top right"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" class="mr-1 align-self-center">
                    <v-icon>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    
                  >
                    <v-list-item-title>
                      <v-edit-dialog
                        :return-value.sync="item.linkedin_url"                      
                      >
                        Edit profile
                        <template v-slot:input>
                          <v-text-field
                            v-model="item.linkedin_url"
                            label="Edit"
                            single-line
                            counter
                          ></v-text-field>
                        </template>
                      </v-edit-dialog>
                      
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <a :href="item.linkedin_url"
                        class="profile_link mx-3"
                        target="_blank">
                        Visit profile
                      </a>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu> 
              <img :src="item.avartar" class="rounded-xl" alt="" width="20px" height="20px" />
                
            </div>
          </template>
          <template v-slot:item.first_name="{ item }">
            <v-edit-dialog
              :return-value.sync="item.first_name"
            >
              <div>{{ item.first_name }}</div>
              <template v-slot:input>
                <v-text-field
                  v-model="item.first_name"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                  autofocus
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.last_name="{ item }">
            <v-edit-dialog
              :return-value.sync="item.last_name"
            >
              <div>{{ item.last_name }}</div>
              <template v-slot:input>
                <v-text-field
                  v-model="item.last_name"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                  autofocus
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.email="{ item }">
            <v-edit-dialog
              v-if="!!item.email"
              :return-value.sync="item.email"
            >
              <div >{{ item.email  }}</div>
              <template v-slot:input>
                <v-text-field
                  v-model="item.email"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                  autofocus
                ></v-text-field>
              </template>
            </v-edit-dialog>
            <v-btn v-if="!item.email" class="missingBtn"  @click="openSearchEmail(item)" color="#FFF4D4"><span>Find Email</span></v-btn>
          </template>
          <template v-slot:item.email_verify="{ item }">
           <div v-if="item.email_verify">Yes</div>
           <v-btn v-else class="missingBtn" color="#FFF4D4"><span>Verify</span></v-btn>
          </template>

          <template v-slot:item.domain="{ item }">
            <v-edit-dialog
              :return-value.sync="item.domain"
            >
              <div v-if="!!item.domain">{{ item.domain  }}</div>
              <v-btn v-if="!item.domain" class="missingBtn" color="#adddf1"><span>Enter Domain</span></v-btn>
              <template v-slot:input>
                <v-text-field
                  v-model="item.domain"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                  autofocus
                ></v-text-field>
              </template>
            </v-edit-dialog>
            
          </template>
          <template v-slot:item.role="{ item }">
            <v-edit-dialog
              :return-value.sync="item.role"
            >
              <div class="email">{{ item.role }}</div>
              <template v-slot:input>
                <v-text-field
                  v-model="item.role"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                  autofocus
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.country="{ item }">
            <v-edit-dialog
              :return-value.sync="item.country"
            >
              <div>{{ item.country }}</div>
              <template v-slot:input>
                <v-text-field
                  v-model="item.country"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                  autofocus
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>

           <template v-slot:item.city="{ item }">
            <v-edit-dialog
              :return-value.sync="item.city"
            >
              <div>{{ item.city }}</div>
              <template v-slot:input>
                <v-text-field
                  v-model="item.city"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                  autofocus
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>

          <template v-slot:item.company="{ item }">
            <div  class="d-flex align-center">
              <v-icon color="#0097d3">mdi-linkedin</v-icon>
              <v-menu
                bottom
                left
                offset-y
                origin="top right"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" class="mr-1 align-self-center">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    
                  >
                    <v-list-item-title>
                      <v-edit-dialog
                        :return-value.sync="item.company_url"                      
                      >
                        Edit profile
                        <template v-slot:input>
                          <v-text-field
                            v-model="item.company_url"
                            label="Edit"
                            single-line
                            counter
                          ></v-text-field>
                        </template>
                      </v-edit-dialog>
                      
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <a :href="item.company_url"
                        class="profile_link mx-3"
                        target="_blank">
                        Visit profile
                      </a>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu> 
              <div class="email">{{item.company}}</div>
            </div>
          </template>

          <template v-slot:item.sector="{ item }">
            <v-edit-dialog
              :return-value.sync="item.sector"
            >
              <div class="email">{{ item.sector }}</div>
              <template v-slot:input>
                <v-text-field
                  v-model="item.sector"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                  autofocus
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>

          <template v-slot:item.created="{ item }">
            <p class="email">{{ item.created | shortDate(dateFilterFormat) }}</p>
          </template>
          
        </v-data-table>
        <EmailSearchDlg 
          :open="showEmailSearch"
          @changeOpen="handleEmailSearchDlg($event)"
          :data="selectedItem"
        />
        <BulkEmailSearch :open="showBulkEmailDlg" @changeOpen="closeBulkEmailSearchDlg($event)" />
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
// import { filter } from 'vue/types/umd';

export default {
  name: "DataTable",
  data () {
    return {
      headers: [
      { text: "ID", value: "id", filterable: false, sortable: false },
      { text: "First", value: "first_name", filterable: false },
      { text: "Last", value: "last_name", filterable: false },
      { text: "Emails", value: "email", filterable: false },
      { text: "Email Verified", value: "email_verify", filterable: false },
      { text: "Domain", value: "domain", filterable: false },
      { text: "Role", value: "role", filterable: false },
      { text: "Country", value: "country", filterable: false },
      { text: "City", value: "city", filterable: false },
      { text: "Company", value: "company", filterable: false },
      { text: "Sector", value: "sector", filterable: false },
      { text: "Added", value: "created", filterable: false },
    ],
    filterFields: [
        {text: 'First', value: 'first_name', type: 'text'},
        {text: 'Last', value: 'last_name', type: 'text'},
        {text: 'Emails', value: 'email', type: 'text'},
        {text: 'Email Verified', value: 'email_verify', type: 'lookup'},
        {text: 'Domain', value: 'domain', type: 'text'},
        {text: 'Role', value: 'role', type: 'text'},
        {text: 'Country', value: 'country', type: 'text'},
        {text: 'City', value: 'city', type: 'text'},
        {text: 'Company', value: 'company', type: 'text'},
        {text: 'Sector', value: 'sector', type: 'text'},
        {text: 'Added', value: 'created', type: 'date'},
    ],
      pagination: {
          sortBy: 'lastName',
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
      showAlert: false,
      showEmailSearch: false,
      showBulkEmailDlg: false,
      selectedName: "",
      snackbar: false,
      max25chars: v => v.length <= 25 || 'Input too long!',
      actionItems:['Copy to list', 'Export', 'Delete'],
      actionSubItems: ['All CEOs from UK', 'Highly targeted COOs from Switzerland'],
      mainAction: '',
      actionSubmit: false,
      subAction:'',
      selectedItem: [],
      icons: { mdiDelete },
      id: window.location.pathname.split('/')[2], //this is the id from the browser
      data: [
        {
          id:1,
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
        },
        {
          id:2,
          linkedin_url: 'https://www.linkedin.com/in/martinknapic/',
          company_url: 'https://www.linkedin.com/company/prospect-role/',
          first_name: 'Munta',
          last_name: 'Sirnahin',
          email: 'muntasirnahin66@gmail.com',
          email_verify: true,
          domain: 'prospectrole.com',
          role: 'Product Manager',
          country: 'Switzerland',
          city: 'Lausanne',
          company: 'Crystal Ltd',
          sector: 'Information technology',
          created: "2021-01-02T05:00:00.000Z",
          avartar:
            "https://ca.slack-edge.com/TN86UQ97H-US929HJSE-g28806d23364-512"
        },
        {
          id:3,
          linkedin_url: 'https://www.linkedin.com/in/martinknapic/',
          company_url: 'https://www.linkedin.com/company/prospect-role/',
          first_name: 'Ashley',
          last_name: 'Stewart',
          email: '',
          email_verify: false,
          domain: '',
          role: 'Product Manager',
          country: 'Switzerland',
          city: 'Lausanne',
          company: 'Crystal Ltd',
          sector: 'Information technology',
          created: "2021-09-22T05:00:00.000Z",
          avartar:
            "https://ca.slack-edge.com/TN86UQ97H-US929HJSE-g28806d23364-512"
        },
      ]
    }
  },
  computed: {
    // students () {
    //     return this.$store.getters.students
    // },
    // states () {
    //     return this.$store.getters.states
    // },
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
    },
    isDataReady () {
        return this.$store.getters.isDataReady
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
            this.filterTermLabel = '######'
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
    contributors (items) {
      return items.map((item, i) => {return <p key={i}>{item}</p>})
    },
    viewlink(item) {
      return 'detail-list/'+item.id;
    },
    handleBulkEmailDlg( flag ) {
      this.showBulkEmailDlg = flag;
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
    },
    changeSubAction(obj){
      this.subAction = obj;
    },
    toggleOpen() {
      this.$emit("changeOpen");
    },
    openSearchEmail(obj) {
      console.log('clicked ', obj)
      this.selectedItem = obj;
      this.showEmailSearch = true;
    },
    handleSnackBar(val) {
      this.snackbar = val;
    },
    handleEmailSearchDlg() {
      this.showEmailSearch = false;
    },
    closeBulkEmailSearchDlg() {
      this.showBulkEmailDlg = false;
    },
    // 
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
        this.filterField = 'first_name'
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
        decimalPoint = decimalPoint || 0
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
                return Number(item[fieldName]).toFixed(decimalPoint) > Number(fieldValue).toFixed(decimalPoint)
            } else {
                return true
            }
        })
    },
    filterByNumberLess (list, fieldName, fieldValue, decimalPoint) {
        decimalPoint = decimalPoint || 0
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
                return Number(item[fieldName]).toFixed(decimalPoint) < Number(fieldValue).toFixed(decimalPoint)
            } else {
                return true
            }
        })
    },
    filterByNumberBetween (list, fieldName, fieldValue1, fieldValue2, decimalPoint) {
        decimalPoint = decimalPoint || 0
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
                return Number(item[fieldName]).toFixed(decimalPoint) >= Number(fieldValue1).toFixed(decimalPoint)
                    && Number(item[fieldName]).toFixed(decimalPoint) <= Number(fieldValue2).toFixed(decimalPoint)
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
    // DeleteDialog: () => import("../DeleteDialog"),
    EmailSearchDlg: () => import("../EmailSearchDlg"),
    BulkEmailSearch: () => import("../BulkEmailSearch")
  },
  created () {
      this.filterField = 'first_name'
  }
};
</script>
<style scoped lang="scss">
@import "~vuetify/src/styles/settings/_variables";
// @import './overrides.sass';

$edit-dialog-content-padding: 0 8px;

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

.missingBtn {
  height:30px !important;
  span {
    text-transform: capitalize;
    letter-spacing: 0rem;
    font-size: 12px;
  }
} 

.yellow-btn {
  letter-spacing: 0rem;
}    
.profile_link {
  color: #000000DE;
  margin: 0px !important;
}
</style>
<style>
  .v-data-table-header tr th {
    /* display: flex !important;
    align-items: center !important; */
    white-space: nowrap;
  }
  
</style>
