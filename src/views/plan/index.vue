<template>
  <v-container fluid class="down-top-padding" id="verify">
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>
  </v-container>
</template>

<script>
export default {
  name: "Plan",

  data: () => ({
    page: {
      title: "Plan"
    },
    breadcrumbs: [
      {
        text: "Plan",
        disabled: false,
        to: "/plan"
      }
    ]
  }),
  methods: {},
  components: {}
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
