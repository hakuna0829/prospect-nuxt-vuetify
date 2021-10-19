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
          <BasicInformation
            @handleSuccessBar="handleSuccessSnackBar"
            @handleErrorBar="handleErrorSnackBar"
          ></BasicInformation>
        </BaseCard>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar_success"
      top
      right
      color="success"
      style="padding-top:125px"
    >
      User has been invited. You can inform them to check their email.
    </v-snackbar>
    <v-snackbar
      v-model="snackbar_error"
      top
      right
      color="error"
      style="padding-top:125px"
    >
      Something went wrong. Please try again later or contact our support team.
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "Profile",

  data: () => ({
    page: {
      title: "Add New User"
    },
    snackbar_success: false,
    snackbar_error: false,
    breadcrumbs: [
      {
        text: "Add New User",
        disabled: false,
        to: "/new-user"
      }
    ],
    name: "Martin",
    avatar: "https://ca.slack-edge.com/TGUK83BPA-U01KTG7MK34-g19920895070-512",
    filelist: [] // Store our uploaded files
  }),
  methods: {
    onButtonClick() {
      this.$refs.file.click();
    },
    handleSuccessSnackBar(val) {
      this.snackbar_success = val;
    },
    handleErrorSnackBar(val) {
      this.snackbar_error = val;
    }
  },
  components: {
    BasicInformation: () => import("./BasicInformation")
    // DialogsForm: () => import("./DialogsForm")
  }
};
</script>
<style scoped lang="scss">
.avatar {
  margin-right: 10px;
}
.v-btn {
  max-width: 150px;
}
</style>
