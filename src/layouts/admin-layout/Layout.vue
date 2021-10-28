<template>
  <v-app id="inspire" :class="{ horizontalstyle: setHorizontalLayout }">
    <!-- ---------------------------------- -->
    <!--- Vertical Header part -->
    <!-- ---------------------------------- -->
    <!-- <VerticalHeader
      v-if="!setHorizontalLayout"
      v-model="expandOnHover"
    ></VerticalHeader> -->
    <!-- ---------------------------------- -->
    <!--- Horizontal Header part -->
    <!-- ---------------------------------- -->
    <HorizontalHeader></HorizontalHeader>

    <v-main>
      <v-container fluid class="page-wrapper">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HorizontalHeader from "./horizontal-header/HorizontalHeader";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Layout",

  components: {
    HorizontalHeader
  },

  props: {
    source: String
  },
  data: () => ({
    expandOnHover: false
  }),
  beforeMount(){
    this.setLoginStatus(true);
  },
  computed: {
    ...mapState(["Customizer_drawer", "setHorizontalLayout"])
  },

  methods: {
    ...mapMutations({
      setCustomizerDrawer: "SET_CUSTOMIZER_DRAWER",
      setLoginStatus: "SET_LOGINSTATUS"
    }),
  }
};
</script>

<style></style>
