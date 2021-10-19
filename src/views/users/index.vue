<template>
  <v-container fluid class="down-top-padding" id="verify">
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" sm="12">
        <BaseCard>
          <DataTable @changeOpen="handleNewDlg($event)"></DataTable>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Users",

  data: () => ({
    page: {
      title: "Users"
    },
    newDlg: false,

    breadcrumbs: [
      {
        text: "Users",
        disabled: false,
        to: "/users"
      }
    ]
  }),
  methods: {
    handleNewDlg() {
      this.newDlg = !this.newDlg;
    }
  },
  components: {
    DataTable: () => import("./table-data/DataTable")
  }
};
</script>
