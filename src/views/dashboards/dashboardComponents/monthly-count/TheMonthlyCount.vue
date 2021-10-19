<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5">
      <div class="d-sm-flex align-center">
        <div>
          <h3 class="title font-weight-regular">
            Email Verification Checks Count
          </h3>
          <h6 class="subtitle-2 font-weight-light">
            Amount of email verified via available methods
          </h6>
        </div>
        <v-spacer></v-spacer>
        <div class="ml-auto mt-4 mt-md-0">
          <div class="d-flex align-center text-truncate text-nowrap">
            <div class="d-flex align-center px-2">
              <span class="subtitle-2">
                <span class>
                  <i class="success--text fa fa-circle mr-2"></i>
                </span>
                <span class="font-weight-regular mr-1">Single checks</span>
              </span>
            </div>
            <div class="d-flex align-center px-2">
              <span class="subtitle-2">
                <span class>
                  <i class="deep-purple--text fa fa-circle mr-2"></i>
                </span>
                <span class="font-weight-regular mr-1">Bulk checks</span>
              </span>
            </div>
            <div class="d-flex align-center px-2">
              <span class="subtitle-2">
                <span class>
                  <i class="error--text fa fa-circle mr-2"></i>
                </span>
                <span class="font-weight-regular mr-1">API checks</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <vue-apex-charts
        type="bar"
        height="310px"
        :options="CountChart.CountChart.chartOptions"
        :series="CountChart.CountChart.series"
      ></vue-apex-charts>
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import CountChart from "./MonthlyCountData";

export default {
  name: "TheMonthlyCount",
  data: () => ({
    CountChart: CountChart
  }),
  components: {
    VueApexCharts
  }
};
</script>
