<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ProgressBar -->
    <!-- ----------------------------------------------------------------------------- -->
    <div class="px-3 w-100 mb-4 mt-2">
      <div v-if="color==='primary'">
        <div class="d-flex justify-space-between">
          <div class="pr-4">
            <h6 class="text-caption mb-1 primary--text font-weight-bold" >
              {{label}}
            </h6>
          </div>
          <div>
            <h6 class="text-caption mb-1 primary--text font-weight-bold text-right" >
              {{this.valueNum}} / {{this.totalNum}}
            </h6>
          </div>
        </div>
        <v-progress-linear
          rounded
          v-model="percent"
          color="primary"
          class="mt-1"
        ></v-progress-linear>
      </div>  
      <div v-else>
        <div class="d-flex justify-space-between">
          <div class="pr-4">
            <h6 class="text-caption mb-1 success--text font-weight-bold" >
              {{label}}
            </h6>
          </div>
          <div  >
            <h6 class="text-caption mb-1 success--text font-weight-bold text-right" >
              {{this.valueNum}} / {{this.totalNum}}
            </h6>
          </div>
        </div>
        <v-progress-linear
          rounded
          v-model="percent"
          color="success"
          class="mt-1"
        ></v-progress-linear>
      </div>  
      
    </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    label: {
        type: String,
        default: "",
    },
    total: {
        type: String,
        default: "100"
    },
    value: {
        type: String,
        default: "0"
    },
    color: {
      type: String,
      default: "primary"
    }
  },
  computed:{
    totalNum () {
      return this.total * 1;
    },
    valueNum () {
      return this.value * 1;
    },
    percent () {
      return this.valueNum / this.totalNum * 100;
    }
  }, 
  data: () => ({
      item: 0,
  })
};
</script>