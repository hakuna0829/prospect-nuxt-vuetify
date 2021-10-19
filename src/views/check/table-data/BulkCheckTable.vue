<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- DatatablesSearch -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <div class="mt-4">
      <v-card>
        <v-card-title>
          Bulk Email Verification History
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="computedHeaders"
          :items="desserts"
          :search="search"
          item-key="name"
          class="border"
          :custom-filter="filterOnlyCapsText"
          :footer-props="{
            'items-per-page-options': [10, 50, 200, -1]
          }"
        >
          <template v-slot:item.name="{ item }">
            <div class="text-start">
              <v-btn
                icon
                href="https://bestemailverifier.com/examples/Myprofile.csv"
                target="_blank"
              >
                <v-icon>mdi-cloud-download</v-icon>
              </v-btn>
              {{ item.name }}
            </div>
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip dark :color="getColor(item.status)">
              {{ item.status }}
            </v-chip>
          </template>
          <template v-slot:item.verified_on="{ item }">
            <div class="text-start">
              {{ item.verified_on }}
            </div>
          </template>
          <template v-slot:item.action="{ item }">
            <div class="text-start">
              <v-btn depressed class="custom-btn">
                <v-icon :name="item.action">mdi-play-outline</v-icon>
              </v-btn>
              <v-btn depressed class="custom-btn">
                <v-icon :name="item.action">mdi-delete-outline</v-icon>
              </v-btn>
              <!-- <v-tooltip top>
              <template v-slot:activator="{ on, attrs }"> -->
              <v-btn
                depressed
                class="custom-btn"
                small
                color="success"
                :disabled="item.status !== 'Ready to verify'"
              >
                Download CSV
                <v-icon :name="item.action">mdi-cards-outline</v-icon>
              </v-btn>
              <!-- </template> -->
              <!-- <span>Download CSV</span> -->
              <!-- </v-tooltip> -->
            </div>
          </template>
          <template v-slot:item.total="{ item }">
            <div class="text-start">
              {{ item.total }}
            </div>
          </template>
          <template v-slot:item.deliverable="{ item }">
            <div class="text-start">
              {{ item.deliverable }}
            </div>
          </template>
          <template v-slot:item.valid_but_risky="{ item }">
            <div class="text-start">
              {{ item.valid_but_risky }}
            </div>
          </template>
          <template v-slot:item.invalid="{ item }">
            <div class="text-start">
              {{ item.invalid }}
            </div>
          </template>
          <template v-slot:item.unknown="{ item }">
            <div class="text-start">
              {{ item.unknown }}
            </div>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import json from "./bulkCheck_data.json";
export default {
  name: "DatatablesSearch",
  computed: {
    computedHeaders() {
      return this.headers.filter(
        h => !h.hide || !this.$vuetify.breakpoint[h.hide]
      );
    }
  },
  data: () => ({
    search: "",
    headers: [
      {
        text: "File Name",
        align: "start",
        sortable: true,
        value: "name",
        class: "text-no-wrap"
      },
      {
        text: "Status",
        value: "status",
        filterable: false,
        class: "text-no-wrap"
      },
      {
        text: "Count",
        value: "count",
        filterable: false,
        class: "text-no-wrap"
      },
      {
        text: "Duplicates",
        value: "duplicates",
        filterable: false,
        class: "text-no-wrap"
      },
      {
        text: "Action",
        value: "action",
        filterable: false,
        class: "text-no-wrap"
      },
      {
        text: "Verified on",
        value: "verified_on",
        filterable: false,
        class: "text-no-wrap"
      },
      {
        text: "Total",
        value: "total",
        filterable: false,
        class: "text-no-wrap"
      },
      {
        text: "Deliverable",
        value: "deliverable",
        filterable: false,
        class: "text-no-wrap"
      },
      {
        text: "Valid but Risky",
        value: "valid_but_risky",
        filterable: false,
        class: "text-no-wrap"
        // hide: "lgAndDown"
      },
      {
        text: "Invalid",
        value: "invalid",
        filterable: false,
        class: "text-no-wrap"
        // hide: "lgAndDown"
      },
      {
        text: "Unknown",
        value: "unknown",
        filterable: false,
        class: "text-no-wrap"
        // hide: "lgAndDown"
      }
    ],
    desserts: json.data
  }),
  methods: {
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value
          .toString()
          .toLocaleLowerCase()
          .indexOf(search) !== -1
      );
    },
    getColor(status) {
      console.log(status);
      if (status === "Uploading" || status === "Processing") return "#1e88e5";
      if (status === "Ready to verify") return "#21c1d699";
      if (status === "Verified") return "#21c1d6";
      if (status === "Running") return "#725DF4";
      if (status === "Error API") return "#ff5252";
    }
  }
};
</script>
<style scoped lang="scss">
.custom-btn {
  min-width: 20px !important;
  padding: 0px 5px !important;
}

.custom-btn .v-btn__content {
  font-size: 12px !important;
  color: red;
}
.v-application .text-start {
  white-space: nowrap;
}
</style>
