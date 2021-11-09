<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- DatatablesSearch -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <div class="">
      <v-card style="box-shadow:none">
        <!-- <v-row align="center">
          <v-col class="grow">
            
          </v-col>
          <v-col class="shrink">
            <v-btn color="primary" @click="toggleOpen()">ADD PROSPECT</v-btn>
          </v-col>
        </v-row> -->
        <v-row>
          
            <v-col cols="12" md="8" xl="4" class="py-2 py-md-0" order-md="1">
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
              <v-menu v-if="mainAction === 'Copy to list'">
                <template v-slot:activator="{ on, attrs }" >
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="rounded-lg actionBtn mt-2"
                  >
                    <span>{{subAction !== '' ? subAction : 'Choose list'}}</span>
                  </v-btn>
                </template>

                <v-list style="max-height: 490px" class="overflow-y-auto">
                  <v-list-item @click="changeSubAction(item)" v-for="(item, i) in actionSubItems" :key="i">
                    <v-list-item-title>{{item}}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-btn
                v-if="mainAction !== '' "
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
            <v-col cols="12" sm="12" md="9" xl="6" class=" py-0" order-md="3">
              <div class="d-sm-flex">
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
                  class="me-1 me-md-2 input-custom"
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
                  class="me-1 me-md-2 input-custom"
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
                  class="me-1 me-md-2 input-custom"
                  style="max-width:150px"
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
                  class="input-custom"
                ></v-autocomplete>
                
              </div>
            </v-col>
            <v-col cols="6" md="3" xl="1" class="pt-0 d-flex justify-end" order-md="4">
              <!-- <v-btn light class="mr-2 align-self-center mt-2 yellow-btn white--text" color="#F1C40F" >
                <span>SEARCH</span>
              </v-btn> -->
              <v-btn light class="mr-2 align-self-center mt-2 yellow-btn white--text" color="#F1C40F" @click="onClearAllFilters">
                <span>CLEAR ALL</span>
              </v-btn>
            </v-col>
            <v-col cols="6" md="4" xl="1" class="pt-0 d-flex justify-end"  order-md="2" order-xl="4">
               <v-btn color="primary align-self-center mt-2" @click="toggleOpen()">ADD PROSPECT</v-btn>
            </v-col>
         </v-row>
         
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
          <!-- <template v-slot:item.data-table-select="{ on, props }">
            <v-simple-checkbox color="green" v-bind="props" v-on="on"></v-simple-checkbox>
          </template> -->
          <template v-slot:item.id="{ item }">
            <div  class="d-flex align-center">
              <a v-if="item.linkedin_url" :href="item.linkedin_url"
                class="profile_link mx-3"
                target="_blank">
                <v-icon color="#0097d3">mdi-linkedin</v-icon>
              </a>
              <a v-else
                class="profile_link mx-3 disabled"
                target="_blank">
                <v-icon color="#0097d3">mdi-linkedin</v-icon>
              </a>
              
              <v-menu
                bottom
                left
                offset-y
                origin="top right"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" class="mr-1 align-self-center" width="16px">
                    <v-icon>mdi-dots-vertical</v-icon>
                  
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    
                  >
                    <v-list-item-title>
                      <v-edit-dialog
                        :return-value.sync="item.linkedin_url"                      
                      >
                        Edit URL
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
            <!-- <v-edit-dialog
              v-if="!!item.email"
              :return-value.sync="item.email"
              large
              @open="openEmail(item.email)"
              @save="saveEmail(item.email, item)"
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
            </v-edit-dialog> -->
            <div  class="d-flex align-center">
              <v-menu
                  bottom
                  left
                  offset-y
                  origin="top right"
                  transition="scale-transition"
                >
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" class="mr-1 align-self-center" width="16px">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                  <v-list>
                    <v-list-item
                      
                    >
                      <v-list-item-title>
                        <v-edit-dialog
                          width="unset"
                          large
                          @save="saveEmail(item)"
                          @open="editEmail = item.email"
                        >
                          Edit Email
                          <template v-slot:input>
                            <v-text-field
                              v-model="editEmail"
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
                        <div @click="openSearchEmail(item)" style="cursor: pointer">Find Email</div>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu> 
              <div @click="openSearchEmail(item)" style="cursor: pointer">{{ item.email }}</div>
              <v-btn v-if="!item.email" class="missingBtn"  @click="openSearchEmail(item)" color="#FFF4D4"><span>Find Email</span></v-btn>
            </div>
          </template>
          <template v-slot:item.email_verify="{ item }">
           <div v-if="item.email_verify === 1 "><span style="border-radius:50%; background:green; padding: 0 8px;">&nbsp;</span></div>
           <div v-if="item.email_verify === 2 "><span style="border-radius:50%; background:#f1c40f; padding: 0 8px;">&nbsp;</span></div>
           <div v-if="item.email_verify === 3 "><span style="border-radius:50%; background:red; padding: 0 8px;">&nbsp;</span></div>
           <div v-if="item.email_verify === -1 ">
             <v-btn class="missingBtn" color="#FFF4D4" loading><span>Verify</span></v-btn>
           </div>
           <div v-else-if="item.email_verify === 0 ">
             <v-btn class="missingBtn" color="#FFF4D4" @click="handleVerify(item)" ><span>Verify</span></v-btn>
           </div>
           
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
                  :rules="[max200chars]"
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
                  :rules="[max200chars]"
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
                  :rules="[max200chars]"
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
                  :rules="[max200chars]"
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
              <a v-if="item.company_url" :href="item.company_url"
                class="profile_link mx-3"
                target="_blank">
                <v-icon color="#0097d3">mdi-linkedin</v-icon>
              </a>
              <a v-else
                class="profile_link mx-3 disabled"
                target="_blank">
                <v-icon color="#0097d3">mdi-linkedin</v-icon>
              </a>
              
              <v-menu
                bottom
                left
                offset-y
                origin="top right"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" class="mr-1 align-self-center" width="16px">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    
                  >
                    <v-list-item-title>
                      <v-edit-dialog
                        width="unset"
                        :return-value.sync="item.company_url"                      
                      >
                        Edit URL
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
              <v-edit-dialog
                :return-value.sync="item.company"
              >
                <div class="email">{{ item.company }}</div>
                <template v-slot:input>
                  <v-text-field
                    v-model="item.company"
                    :rules="[max200chars]"
                    label="Edit"
                    single-line
                    counter
                    autofocus
                  ></v-text-field>
                </template>
              </v-edit-dialog>
              <!-- <div class="email">{{item.company}}</div> -->
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
        <DeleteDialog
          :open="showAlert"
          @changeOpen="handleDeleteDlg($event)"
          @removeItem="removeItem($event)"
          @handleSnackBar="handleSnackBar($event)"
        ></DeleteDialog>
        <EmailSearchDlg 
          :open="showEmailSearch"
          @changeOpen="handleEmailSearchDlg($event)"
          :item="selectedEmailObj"
          @handleItem="handleSeletedObj"
        />
        <BulkEmailSearch :open="showBulkEmailDlg" @changeOpen="closeBulkEmailSearchDlg($event)" />
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
          v-model="copy_list_snackbar"
          :timeout="-1"
          top
          right
          color="black"
          style="padding-top:80px"
        >
          Records copied to the selected list.
          <template v-slot:action="{ attrs }">
            <v-btn
              color="yellow"
              text
              style="font-weight: 700"
              v-bind="attrs"
              @click="copy_list_snackbar = false"
            >
              Open List
            </v-btn>
            <v-btn
              color="white"
              text
              style="font-weight: 700"
              v-bind="attrs"
              @click="copy_list_snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mdiDelete } from "@mdi/js";
import moment from 'moment';
import json from './lists_detail_data.json'
// import { filter } from 'vue/types/umd';

export default {
  name: "DataTable",
  data () {
    return {
      headers: [
      { text: "Person ID", value: "id", filterable: false, sortable: false },
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
      options: {
      itemsPerPage: 25
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
      copy_list_snackbar: false,
      max25chars: v => v.length <= 25 || 'Input too long!',
      max200chars: v => v.length <= 200 || 'Input too long!',
      actionItems:['Copy to list', 'Export', 'Delete'],
      actionSubItems: ['All CEOs from UK', 'Highly targeted COOs from Switzerland', 'Item3', 'Item4', 'Item5', 'Item6', 'Item7', 'Item8', 'Item9', 'Item10', 'Item11' ],
      mainAction: '',
      actionSubmit: false,
      subAction:'',
      selectedItem: [],
      selectedEmailObj: {},
      icons: { mdiDelete },
      id: window.location.pathname.split('/')[2], //this is the id from the browser
      tempOrgEmail: '',
      editEmail: '',
      data: json.data
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
            lookupItems = ['Safe to send', 'Valid', 'Invalid']
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
    saveEmail(update) {
      console.log(update, this.editEmail);
      this.filteredData.map(item => {
        if(item.id === update.id){
          item.email = this.editEmail;
          item.email_verify = 0;
          return item;
        }
      })
    },
    // openEmail (oldEmail) {
    //   console.log(oldEmail);
    //   this.tempOrgEmail = oldEmail;
    // },
    // saveEmail (newEmail, item) {
    //   console.log(newEmail);
    //   if(this.tempOrgEmail !== newEmail){
    //     this.filteredData.map((row) => {
    //       if(row.id === item.id){
    //         row.email_verify = false;
    //       }
    //        return row;
    //     })
       
    //   }
    // }
    handleVerify (current) {
      this.filteredData.map((item) => {
        if(item.id === current.id){
          item.email_verify = -1;
          console.log(item)
        }
        return item
      });
      
      setTimeout(() => {
        this.filteredData.map((item) => {
          if(item.id === current.id){
            item.email_verify = this.randomIntFromInterval(1,3);
          }
          return item
        })
      }, 2000)

    },
    randomIntFromInterval(min, max) { // min and max included 
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    viewlink(item) {
      return 'detail-list/'+item.id;
    },
    closeAlert() {
      this.selectedName = "";
      this.showAlert = false;
    },
    confirmDelete(item) {
      this.showAlert = true;
      this.selectedName = item;
    },
    handleDeleteDlg() {
      this.showAlert = false;
      this.selectedItem = [];
    },
    removeItem() {
      const index = this.data.indexOf(this.selectedName);
      this.data.splice(index, 1);
      this.selectedName = null;
    },
    handleBulkEmailDlg( flag ) {
      this.showBulkEmailDlg = flag;
    },
    handleActionSubmit(){
      this.actionSubmit = true;
      setTimeout(() => {
        this.actionSubmit = false;
        console.log('this.mainAction', this.mainAction)
        if(this.mainAction === 'Copy to list'){
          this.copy_list_snackbar = true
        }
        if( this.mainAction === 'Delete' )
        {
          this.confirmDelete('1');
          console.log('selected 1', this.selectedItem)
          
          // const removedArr = this.data.filter(function(value) {
            // console.log('selected 2', this.selectedItem)
            // var filteredResult = this.selectedItem.filter((item) => {
            //   return item.id !== value.id
            // });
            // return value;//filteredResult.length ? true : false;
          // });
          // this.filteredData = removedArr;
          // this.selectedItem = [];
        }
        this.mainAction = '';
        this.subAction = '';
      }, [2000]);
    },
    clearSeletedItem () {
       this.selectedItem = [];
    },
    changeMainAction(obj){
      console.log('change action', obj)
      this.mainAction = obj;
    },
    changeSubAction(obj){
      this.subAction = obj;
    },
    toggleOpen() {
      this.addNewRowData();
      // this.$emit("changeOpen");
      this.$emit("handleAddSnackBar", true);
    },
    addNewRowData() {
      const dataLength = this.data.length;
      const newRow = {
        id: dataLength + 1,
        linkedin_url: '',
        company_url: '',
        first_name: '',
        last_name: '',
        email: '',
        email_verify: false,
        domain: '',
        role: '',
        country: '',
        city: '',
        company: '',
        sector: '',
        created: moment().format("DD-MM-YYYY hh:mm A"),
        avartar:
          "https://ca.slack-edge.com/TN86UQ97H-US929HJSE-g28806d23364-512"
      }
      console.log('newRow', newRow)
      this.data.splice(0, 0, newRow)
      console.log('updated...', this.data)

         
    },
    openSearchEmail(obj) {
      console.log('clicked ', obj)
      this.selectedEmailObj = obj;
      this.showEmailSearch = true;
    },
    handleSnackBar(val) {
      this.snackbar = val;
    },
    handleEmailSearchDlg() {
      this.showEmailSearch = false;
    },
    handleSeletedObj(obj) {
      console.log('updated obj', obj);
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
        this.filterField = 'first_name';
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
      console.log(list, fieldName, fieldValue)//'Safe to send', 'Valid', 'Invalid'
        const compareValue = fieldValue === 'Safe to send' ? 1 : fieldValue === 'Valid' ? 2 : 3;
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
                return item[fieldName] === compareValue 
            } else {
                return true
            }
        })
    },
    filterByLookupIsNot (list, fieldName, fieldValue) {
      const compareValue = fieldValue === 'Safe to send' ? 1 : fieldValue === 'Valid' ? 2 : 3;
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
                return item[fieldName] !== compareValue
            } else {
                return true
            }
        })
    },
    
  },
  components: {
    DeleteDialog: () => import("../DeleteDialog"),
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

.input-custom {
  max-width: 150px;
}

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
.profile_link.disabled {
  color: #000000DE;
  opacity: 0.5;
  cursor: auto;
}
</style>
<style>
  .v-data-table-header tr th {
    /* display: flex !important;
    align-items: center !important; */
    white-space: nowrap;
  }
  
</style>
