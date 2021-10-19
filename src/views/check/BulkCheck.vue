<template>
  <v-container
    fluid
    class="down-top-padding"
    id="verify"
    style="position:relative"
  >
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>
    <v-row>
      <!-- <v-col cols="12" lg="4">
        <v-text-field label="" placeholder="" outlined :rules="rules" dense>
          <template v-slot:append-outer>
            <div style="margin-top:-8px">
              <v-btn depressed color="primary" style="height:40px">
                Verify
              </v-btn>
            </div>
          </template>
        </v-text-field>
      </v-col> -->
      <v-col cols="12" sm="12">
        <v-row align="center" align-content="center">
          <!-- <div> -->
          <v-col cols="12" sm="12">
            <FileUpload />
          </v-col>
        </v-row>
        <!-- </div> -->
      </v-col>
      <v-col cols="12" sm="12">
        <BaseCard>
          <DatatablesSearch></DatatablesSearch>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BulkCheck",

  data: () => ({
    page: {
      title: "Bulk Check"
    },
    breadcrumbs: [
      {
        text: "Bulk Check",
        disabled: false,
        to: "/bulk-check"
      }
    ],
    rules: [
      value => !!value || "Required.",
      value => (value || "").length <= 100 || "Max 100 characters",
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (
          pattern.test(value) ||
          "Please enter a valid structure of an email address"
        );
      }
    ]
  }),

  components: {
    DatatablesSearch: () => import("./table-data/BulkCheckTable"),
    FileUpload: () => import("./FileUpload")
  }
};
</script>
