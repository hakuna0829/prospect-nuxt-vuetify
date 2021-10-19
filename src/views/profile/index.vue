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
          <v-list nav class="hightauto">
            <v-list-item>
              <v-avatar size="70" class="avatar">
                <img v-bind:src="avatar" alt="Martin" />
              </v-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <h4>Upload your photo</h4>
                  <span class="caption"
                    >You can upload your photo or use your profile picture from
                    Gravatar.</span
                  >
                </v-list-item-title>
                <v-btn outlined for="assetsFieldHandle" @click="onButtonClick"
                  >Upload photo</v-btn
                >
                <input
                  type="file"
                  multiple
                  name="fields[assetsFieldHandle][]"
                  id="assetsFieldHandle"
                  class="w-px h-px opacity-0 overflow-hidden absolute d-none"
                  @change="onChange"
                  ref="file"
                  accept=".jpg,.png"
                />
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <BasicInformation></BasicInformation>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Profile",

  data: () => ({
    page: {
      title: "My Profile"
    },
    breadcrumbs: [
      {
        text: "My Profile",
        disabled: false,
        to: "/profile"
      }
    ],
    name: "Martin",
    avatar: "https://ca.slack-edge.com/TGUK83BPA-U01KTG7MK34-g19920895070-512",
    filelist: [] // Store our uploaded files
  }),
  methods: {
    handleNewDlg() {
      this.newDlg = !this.newDlg;
    },
    onButtonClick() {
      this.$refs.file.click();
    },
    onChange() {
      console.log(
        "file type",
        this.$refs.file.files[0].type,
        typeof this.$refs.file.files[0].type
      );
      if (this.$refs.file.files[0].type === "application/vnd.ms-excel") {
        this.error = false;
        this.filelist = [...this.$refs.file.files];
      } else {
        this.error = true;
      }
      //   this.filelist = [...this.$refs.file.files];
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
