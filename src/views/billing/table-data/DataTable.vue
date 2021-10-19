<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- DatatablesSearch -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <div class="">
      <v-card>
        <v-data-table
          :headers="headers"
          :items="data"
          item-key="createdDate"
          class="border"
          :footer-props="{
            'items-per-page-options': [10, 50, 200, -1]
          }"
        >
          <template v-slot:item.createdDate="{ item }">
            {{ item.createdDate }}
          </template>
          <template v-slot:item.download="{ item }">
            <!-- <div class="custom-class">File {{ item.download }}</div> -->
            <a :href="item.download">File</a>
          </template>
          <template v-slot:item.enabled="{ item }">
            <div class="d-flex justify-center">
              <v-checkbox v-model="item.enabled"></v-checkbox>
            </div>
          </template>
          <template v-slot:item.action="{ item }">
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
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataTable",

  data: () => ({
    selectedName: "",
    headers: [
      { text: "Date", sortable: true, value: "createdDate" },
      { text: "Invoice", value: "invoice", filterable: false },
      { text: "Download", value: "download", filterable: false },
      { text: "Payment type", value: "payment_type", filterable: false },
      { text: "Status", value: "status", filterable: false }
    ],
    data: [
      {
        createdDate: "2021-06-21",
        invoice: "Invoice MAEN8973479343",
        download: "",
        payment_type: "Credit Card",
        status:
          "Paid (No VAT liability in Seller's Country. Customer to Reverse Charge."
      },
      {
        createdDate: "2021-06-19",
        invoice: "Invoice MAEN8973479342",
        download: "",
        payment_type: "Credit Card",
        status:
          "Paid (No VAT liability in Seller's Country. Customer to Reverse Charge."
      },
      {
        createdDate: "2021-06-11",
        invoice: "Invoice MAEN8973479325",
        download: "",
        payment_type: "Credit Card",
        status:
          "Paid (No VAT liability in Seller's Country. Customer to Reverse Charge."
      },
      {
        createdDate: "2021-06-05",
        invoice: "Invoice MAEN8973479321",
        download: "",
        payment_type: "Credit Card",
        status:
          "Paid (No VAT liability in Seller's Country. Customer to Reverse Charge."
      },
      {
        createdDate: "2021-05-20",
        invoice: "Invoice MAEN8973479303",
        download: "",
        payment_type: "Credit Card",
        status:
          "Paid (No VAT liability in Seller's Country. Customer to Reverse Charge."
      },
      {
        createdDate: "2021-05-18",
        invoice: "Invoice MAEN8973479303",
        download: "",
        payment_type: "Credit Card",
        status:
          "Paid (No VAT liability in Seller's Country. Customer to Reverse Charge."
      },
      {
        createdDate: "2021-03-25",
        invoice: "Invoice MAEN8973479303",
        download: "",
        payment_type: "Credit Card",
        status:
          "Paid (No VAT liability in Seller's Country. Customer to Reverse Charge."
      },
      {
        createdDate: "2021-03-02",
        invoice: "Invoice MAEN8973479303",
        download: "",
        payment_type: "Credit Card",
        status:
          "Paid (No VAT liability in Seller's Country. Customer to Reverse Charge."
      }
    ]
  })
};
</script>
<style scoped lang="scss"></style>
