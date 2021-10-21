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
  name: "Account",

  data: () => ({
    page: {
      title: "Account"
    },
    breadcrumbs: [
      {
        text: "Account",
        disabled: false,
        to: "/account"
      }
    ]
  }),
  methods: {},
  components: {}
};
</script>
<style scoped lang="scss">

</style>
