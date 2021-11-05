<template>
  <v-row class="page-breadcrumb">
    <v-col cols="12" sm="12" class="pa-0">
      <v-card class="px-2 custom-shaodow">
        <v-toolbar dense flat class="transparent pa-0" height="40px">
          <v-toolbar-title class="pt-3">
            <span class="text--primary">{{ title }}</span>
             <v-chip
                class="ma-2 white--text text-sm"
                small
                color="#6D9DFF"
              >
                STATIC LIST
              </v-chip>
          </v-toolbar-title>
          <v-toolbar-title
            class="toobar-extension transparent pb-3"
            slot="extension"
          >
            <v-breadcrumbs :items="breadcrumbs" class="pa-0">
              <template v-slot:divider v-if="breadcrumbs">
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>

            <slot></slot>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "BaseBreadcrumb",
  props: {
    title: String,
    breadcrumbs: Array,
    icon: String
  },
  data: () => ({})
};
</script>
<style lang="scss" scope>
.page-breadcrumb {
  margin: -24px -25px 27px -25px;
}

.v-breadcrumbs__item{
  color:rgba(0, 0, 0, 0.8) !important;
}
.custom-shaodow {
  box-shadow: none !important;
}
</style>
