<template>
  <v-container fluid class="down-top-padding" id="verify">
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" sm="12">
        <div class="d-flex justify-space-between align-center">
          <p class="text-h6 font-weight-regular " color="primary">
            Billing information
          </p>
          <v-btn color="grey darken-1 white--text">Edit</v-btn>
        </div>
      </v-col>
      <v-col cols="12" sm="12">
        <v-card class="pa-4">
          <div class="text-subtitle-1">{{ user }}, {{ role }}</div>
          <div class="text-subtitle-1 ">
            {{ address }}
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" class="pt-4">
        <div class="d-flex justify-space-between align-center">
          <p class="text-h6 font-weight-regular " color="primary">
            Payment method
          </p>
          <v-btn color="grey darken-1 white--text">Edit</v-btn>
        </div>
      </v-col>
      <v-col cols="12" sm="12">
        <v-card class="pa-4">
          <div class="text-subtitle-1">
            Managing your payment methods
          </div>
          <p class="font-italic ">
            Please be aware that changing your saved payment methods might
            require an additional verification and could affect your
            subscription.
          </p>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" class="pt-4">
        <p class="text-h6 font-weight-regular " color="primary">
          Invoices
        </p>
        <BaseCard>
          <DataTable></DataTable>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Billing",

  data: () => ({
    page: {
      title: "Billing"
    },
    newDlg: false,
    breadcrumbs: [
      {
        text: "Billing",
        disabled: false,
        to: "/billing"
      }
    ],
    user: "Martin Knapic",
    role: "Prospect Role",
    address: "Chemin de la Pralrle 5e, Lausanne, Switzerland",
    payment_method: ""
  }),
  methods: {
    // handleNewDlg() {
    //   this.newDlg = !this.newDlg;
    // }
  },
  components: {
    DataTable: () => import("./table-data/DataTable")
  }
};
</script>
