<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Form -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <div class="mt-4 text-center" >
      <v-dialog v-model="open" persistent max-width="900px" >
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
                        v-model="clonedlData.first_name"
                        label="First"
                        :rules="min3chars"
                        @input="handleChange"
                        required
                        single-line
                      ></v-text-field>&ensp;
                      <v-text-field
                        v-model="clonedlData.last_name"
                        label="Last"
                        @input="handleChange"
                        :rules="min3chars"
                        required
                        single-line
                      ></v-text-field>
                  </div>
                </v-col>
                <v-col cols="12" md="7" class="py-0">
                  <div class="d-flex align-center">
                     <v-text-field
                        v-model="clonedlData.domain"
                        @input="handleChange"
                        label="Enter company domain"
                        :rules="domainRules"
                        single-line
                        required
                        class="me-3"
                      ></v-text-field> 
                    <!--  <v-btn class="primary" @click="toggleOpen" :disabled="!isChanged"
                      >save</v-btn> -->
                    <v-btn :disabled="!valid" class="primary" @click="searchEmail">search email</v-btn>  
                  </div>
                </v-col>
                <!-- <v-col cols="12" class="text-right pt-0">
                  
                  
                </v-col> -->
              </v-row>
            </v-form>  
           <!-- Email search result list -->
           <div v-if="searching" class="result-list">
              <template v-for="(item,i) in emailList" >
                <div :key="i" class="d-block d-md-flex align-center mb-2">
                  <div class="d-flex align-center">
                    <v-btn :class="item.email_verify === 1 ? 'validEmailBtn me-2': 'me-2'"><span>{{item.email}}</span></v-btn>
                    <div v-if="item.email_verify === 3" class="rounded-xl badEmail pr-2" >&nbsp;</div>
                    <div v-if="item.email_verify === 2" class="rounded-xl validEmail pr-2" >&nbsp;</div>
                    <div v-if="item.email_verify === 1" class="rounded-xl goodEmail pr-2" >&nbsp;</div>
                  </div>
                  <div class="pr-2" >
                    <v-progress-circular
                    v-if="item.email_verify === -1"
                    indeterminate
                    :size="20"
                    color="primary"
                  ></v-progress-circular>
                  </div>
                  <div v-if="item.email_verify === 1">Email found and saved. {{item.count}} verification crdits were used.</div>
                </div>
              </template>
              <!-- <div class="d-block d-md-flex align-center mb-2">
                <div class="d-flex align-center">
                  <v-btn class="me-2"><span>ma.domain.com</span></v-btn>
                  <div class="pr-2" ><v-progress-circular
                    indeterminate
                    :size="20"
                    color="primary"
                  ></v-progress-circular>
                  </div>
                </div>
              </div> -->
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
  props: {open: Boolean, item: Object},

  data() {
    return {
    valid: true,
    isChanged: false,
    clonedlData: {first_name: '', last_name: '', domain: ''},
    min3chars: [
      v => !!v || 'Input is required',
      v => v.length >= 2 || 'Input must be longer than 2 characters'
    ],
    domainRules: [
      v => !!v || 'Domain is required',
      v => /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(v) || 'Domain must be valid',
      
    ],
    emailRules: [ 
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    searching: false,
    emailList: [
      {email:'mianaami1@gmail.com', email_verify: -1, count:0},
      // {email:'mianaami1@gmail.com', available: false, count:0},
      // {email:'mianaami2@gmail.com', available: false, count:0},
      // {email:'miAnaamiadiad@gmail.com', available: true, count:3}
    ],
    timerVal: null,
    counter: 0
  }},
   watch: { 
    open: function(newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      if(newVal){
        this.clonedlData.first_name = this.item.first_name;
        this.clonedlData.last_name = this.item.last_name;
        this.clonedlData.domain = this.item.domain;
        console.log(this.clonedlData)
      }
    },
    counter() {
      this.checkCounter();
      console.log("call counter change")
    }
  },
  methods: {
    toggleOpen() {
      this.searching = false;
      this.$emit("changeOpen");
    },
    checkCounter() {
      if(this.counter > 9){
        clearTimeout(this.timerVal);
        this.emailList[this.counter].email_verify = this.randomIntFromInterval(1,3);
      }else{
        this.timerVal = setTimeout(() => {
          this.emailList[this.counter].email_verify = this.randomIntFromInterval(1,3);
          this.counter++;
          console.log(this.emailList, this.counter)
          const newEamil = 'mianaami' + this.counter + '@gmail.com'
          this.emailList.push({email: newEamil, email_verify: -1, count:this.randomIntFromInterval(1,10)})
        }, 1000);
      }
      
    },
    searchEmail() {
      this.checkCounter();
      console.log('data', this.item);
      console.log('ddd', this.clonedlData)
      const testValid = this.$refs.form.validate();
      console.log('testValid', testValid);
      if(testValid)  this.searching = true;
      
      // setTimeout(() => {
      //   this.callFunction();
      //   // this.show = true;
      // }, 500);
      // this.timerVal = setTimeout(() => {
      //   console.log("timer")
      //   this.counter++;
      //   
      // },1000)
      // setTimeout(function () {
      //   console.log('timer2')
      // }, 500);
      
    },
    handleChange() {
      console.log("clonedlData", this.clonedlData);
      if(this.clonedlData.first_name !== this.item.first_name || 
        this.clonedlData.last_name !== this.item.last_name || 
        this.clonedlData.domain !== this.item.domain) {
        this.isChanged = true;
      }
    },
    randomIntFromInterval(min, max) { // min and max included 
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    submit() {
      this.isChanged = false;
      this.$emit("changeOpen");
      this.$emit("removeItem");
      this.$emit("handleSnackBar", true);
    }
  }
};
</script>
<style scoped lang="scss">

.v-dialog__content {
    align-items: flex-start
    // right: 0;
}
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
  background-color: #f00;
  width: 20px;
  height: 20px;
}
.validEmail {
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
