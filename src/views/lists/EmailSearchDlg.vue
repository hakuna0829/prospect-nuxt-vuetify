<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Form -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <div class="mt-4 text-center">
      <v-dialog v-model="dialog" persistent max-width="900px">
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            <span class="headline">Find Email</span>
            <div @click="toggleOpen" class="closeItem"><v-icon>mdi-close</v-icon></div>
          </v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-row>
                <v-col cols="12" md="5" class="py-0">
                  <div class="d-flex">
                      <v-text-field
                        v-model="data.first_name"
                        label="First"
                        :rules="min3chars"
                        required
                        single-line
                      ></v-text-field>&ensp;
                      <v-text-field
                        v-model="data.last_name"
                        label="Last"
                        :rules="min3chars"
                        required
                        single-line
                      ></v-text-field>
                  </div>
                </v-col>
                <v-col cols="12" md="7" class="py-0">
                  <div class="d-flex align-center">
                    <v-text-field
                        v-model="data.domain"
                        label="Enter company domain"
                        :rules="domainRules"
                        single-line
                        required
                        class="me-3"
                      ></v-text-field> 
                      <v-btn class="primary" @click="toggleOpen" :disabled="!emailList.length || !searching">save</v-btn>
                  </div>
                </v-col>
                <v-col cols="12" class="text-right pt-0">
                  <v-btn :disabled="!valid" class="primary" @click="searchEmail">search email</v-btn>
                  
                </v-col>
              </v-row>
            </v-form>  
           <!-- Email search result list -->
           <div v-if="searching" class="result-list">
              <template v-for="(item,i) in emailList" >
                <div :key="i" class="d-block d-md-flex align-center mb-2">
                  <div class="d-flex align-center">
                    <v-btn :class="item.available ? 'validEmailBtn me-2': 'me-2'"><span>{{item.email}}</span></v-btn>
                    <div v-if="!item.available" class="rounded-xl badEmail pr-2" >&nbsp;</div>
                    <div v-if="item.available" class="rounded-xl goodEmail me-2">&nbsp;</div>
                  </div>
                  <div v-if="item.available">Email found and saved. {{item.count}} verification crdits were used.</div>
                </div>
              </template>
              <div class="d-block d-md-flex align-center mb-2">
                <div class="d-flex align-center">
                  <v-btn class="me-2"><span>ma.domain.com</span></v-btn>
                  <div class="pr-2" ><v-progress-circular
                    indeterminate
                    :size="20"
                    color="primary"
                  ></v-progress-circular>
                  </div>
                </div>
              </div>
           </div>

          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmailSearchDlg",
  props: ["open", "data"],

  data: () => ({
    valid: true,
    
    min3chars: [
      v => !!v || 'Input is required',
      v => v.length >= 3 || 'Input must be longer than 3 characters'
    ],
    domainRules: [
      v => !!v || 'Domain is required',
      v => /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(v) || 'Domain must be valid',
    ],
    searching: false,
    emailList: [
      {email:'mianaami1@gmail.com', available: false, count:0},
      {email:'mianaami2@gmail.com', available: false, count:0},
      {email:'miAnaamiadiad@gmail.com', available: true, count:3}
    ]
  }),
  computed:{
    dialog() {
      return this.open
    }
  },
  methods: {
    toggleOpen() {
      this.searching = false;
      this.$emit("changeOpen");
    },
    searchEmail() {
      const testValid = this.$refs.form.validate();
      console.log('testValid', testValid);
      if(testValid)  this.searching = true;
    },
    
    submit() {
      this.$emit("changeOpen");
      this.$emit("removeItem");
      this.$emit("handleSnackBar", true);
    }
  }
};
</script>
<style scoped lang="scss">
.validEmailBtn {
  background-color: #00BF1A !important;
  color:white;
}

.closeItem{
  cursor: pointer;
}

button span {
  letter-spacing: 0.02rem;
  text-transform:initial;
}

.result-list {
  height: 300px;
  overflow-y:scroll;
}
.badEmail {
  background-color: #f1c40f;
  width: 20px;
  height: 20px;
}

.goodEmail {
  background-color: #00BF1A;
  width: 20px;
  height: 20px;
}
</style>
