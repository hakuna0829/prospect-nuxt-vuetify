<template>
  <v-app-bar
    class="horizontal-header"
    app
    clipped-left
    clipped-right
    :color="navbarColor"
    :dark="navbarColor !== 'white'"
  >
    <v-container class="py-0 d-flex" fluid>
      <!-- ---------------------------------- -->
      <!--- light Logo part -->
      <!-- -------------------- :class="`${showLogo ? 'logo-width' : ''}`" -------------- -->
      <v-toolbar-title
        class="align-center d-flex"
        v-if="navbarColor !== 'white'"
      >
        <div>
          <a href="https://prospectrole.com" class="d-flex">
            <img
              src="../../../assets/images/prospectShortlogo.png"
              width="27px"
            />
          </a>
        </div>

        <p
          class="logo-text ml-2 mb-0 logoTitle"
          :class="`${showLogo ? '' : 'hidelogo'}`"
        >
          PROSPECT ROLE
          <!-- <img src="../../../assets/images/logo-light-text.png" class="mt-2" /> -->
        </p>
      </v-toolbar-title>
      <!-- ---------------------------------- -->
      <!---  dark Logo part -->
      <!-- ---------------------------------- -->
      <v-toolbar-title
        class="align-center d-flex"
        :class="`${showLogo ? 'logo-width' : ''}`"
        v-else
      >
        <span class="logo-icon">
          <img src="../../../assets/images/logo-icon.png" />
        </span>
        <span class="logo-text ml-2" :class="`${showLogo ? '' : 'hidelogo'}`">
          <img src="../../../assets/images/logo-text.png" class="mt-2" />
        </span>
      </v-toolbar-title>
      <!-- ---------------------------------- -->
      <!--- end Logo part -->
      <!-- ---------------------------------- -->
      <!-- ---------------------------------- -->
      <!---/Toggle sidebar part -->
      <!-- ---------------------------------- -->
      <div @click="showhideLogo" class="d-block d-lg-none md-none">
        <v-app-bar-nav-icon
          @click="
            $vuetify.breakpoint.smAndDown
              ? setSidebarDrawer(!Sidebar_drawer)
              : $emit('input', !value)
          "
        />
      </div>
      <!-- ---------------------------------- -->
      <!---/Toggle sidebar part -->
      <!-- ---------------------------------- -->
      <!---Search part -->
      <!-- ---------------------------------- -->
      <!-- <v-btn dark icon class="mr-1 d-sm-block d-none" @click="searchbox">
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

      <v-card v-if="showSearch" class="searchinput">
        <template>
          <v-text-field
            placeholder="Search & hit enter"
            class="mt-3 mb-0"
            append-icon="mdi-close"
            @click:append="searchbox"
          ></v-text-field>
        </template>
      </v-card>
      <!-- ---------------------------------- -->
      <!---/Search part -->
      <!-- ---------------------------------- -->
      <v-spacer >
        <template v-if="loginStatus">
          
          <v-tabs align-with-title light color="#000" class="topMenu">
            <v-tab style="height: 100%; padding:0px" >
              <router-link to="/lists" class="black--text" style="padding: 21px 24px;">
                LISTS
              </router-link>
            </v-tab>
          </v-tabs>
        </template>
      </v-spacer>
      
      <!-- ---------------------------------- -->
      <!---right part -->
      <!-- ---------------------------------- -->
      <!---Notification -->
      <!-- ---------------------------------- -->
      <!-- <v-menu
        bottom
        left
        offset-y
        origin="top right"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on" class="mr-1">
            <v-badge color="red" dot>
              <v-icon>mdi-message</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list>
          <h4 class="px-5 py-3 pt-2 font-weight-medium title">Notifications</h4>
          <v-divider></v-divider>
          <v-list-item
            v-for="(item, i) in notifications"
            :key="i"
            @click="href"
          >
            <v-list-item-title>
              <div class="d-flex align-center py-3">
                <div class>
                  <v-btn
                    class="mr-3"
                    depressed
                    fab
                    small
                    dark
                    :color="item.iconbg"
                  >
                    <v-icon dark>{{ item.icon }}</v-icon>
                  </v-btn>
                </div>
                <div>
                  <h4 class="font-weight-medium">{{ item.title }}</h4>
                  <span
                    class="text--secondary caption descpart d-block text-truncate"
                    >{{ item.desc }}</span
                  >
                  <small class="text--secondary">{{ item.time }}</small>
                </div>
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
      <!-- ---------------------------------- -->
      <!---Notification -->
      <!-- ---------------------------------- -->
      <!---Messages -->
      <!-- ---------------------------------- -->
      <!-- <v-menu
        bottom
        left
        offset-y
        origin="top right"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on" class="mr-2">
            <v-badge color="red" dot>
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list>
          <h4 class="px-5 pt-2 py-3 font-weight-medium title">Messages</h4>
          <v-divider></v-divider>
          <v-list-item v-for="(item, i) in messages" :key="i" @click="href">
            <v-list-item-title>
              <div class="d-flex align-center py-3">
                <div class="mr-3">
                  <v-badge
                    bordered
                    bottom
                    :color="item.avatarstatus"
                    dot
                    offset-x="10"
                    offset-y="10"
                  >
                    <v-avatar>
                      <img
                        :src="
                          'https://www.wrappixel.com/demos/admin-templates/materialpro-bootstrap-latest/material-pro/src/assets/images/users/' +
                          item.avatar +
                          '.jpg'
                        "
                        :alt="item.title"
                      />
                    </v-avatar>
                  </v-badge>
                </div>
                <div>
                  <h4 class="font-weight-medium">{{ item.title }}</h4>
                  <span
                    class="text--secondary caption descpart d-block text-truncate"
                    >{{ item.desc }}</span
                  >
                  <small class="text--secondary">{{ item.time }}</small>
                </div>
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
      <!-- ---------------------------------- -->
      <!---Messages -->

      <!-- Upgrade Menu -->
      <v-menu
        bottom
        left
        offset-y
        origin="top right"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn light v-on="on" class="mr-2 align-self-center text-capitalize px-lg-6" color="#F1C40F">
            <!-- <v-badge color="red" dot>
              <v-icon>mdi mdi-cloud-download</v-icon>
            </v-badge> -->
            <v-icon>mdi mdi-cube-outline </v-icon>
            {{loginStatus ? 'Pro plan' : 'Free plan'}}
          </v-btn>
        </template>
        <v-list v-if="loginStatus">
          <ProgressBar label="Searches / Exports" total="1500" value="1252" />
          <ProgressBar label="Verifications" total="20000" value="12025" color="success" />
          <div class="text-center mt-6">
            <v-btn light class="mr-2 align-self-center" color="#F1C40F" href="/plan">
              UPGRADE
            </v-btn>
          </div>
          
          <!-- <v-divider></v-divider> -->
          <!-- <v-list-item
            v-for="(item, i) in notifications"
            :key="i"
            @click="href"
          >
            <v-list-item-title>
              <div class="d-flex align-center py-3">
                <div class>
                  <v-btn
                    class="mr-3"
                    depressed
                    fab
                    small
                    dark
                    :color="item.iconbg"
                  >
                    <v-icon dark>{{ item.icon }}</v-icon>
                  </v-btn>
                </div>
                <div>
                  <h4 class="font-weight-medium">{{ item.title }}</h4>
                  <span
                    class="text--secondary caption descpart d-block text-truncate"
                    >{{ item.desc }}</span
                  >
                </div>
              </div>
            </v-list-item-title>
          </v-list-item> -->
        </v-list>
      </v-menu>
      <!-- Upgrade Menu -->
      <!-- Setting Menu -->
      <!-- <v-menu
        bottom
        left
        offset-y
        origin="top right"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on" class="mr-1">
            <v-icon>mdi-help-circle </v-icon>
          </v-btn>
        </template>

        <v-list>
          <h4 class="px-5 py-3 pt-2 font-weight-medium title">Support</h4>
          <v-divider></v-divider>
          <v-list-item
            v-for="(item, i) in notifications"
            :key="i"
            @click="href"
          >
            <v-list-item-title>
              <div class="d-flex align-center py-3">
                <div class>
                  <v-btn
                    class="mr-3"
                    depressed
                    fab
                    small
                    dark
                    :color="item.iconbg"
                  >
                    <v-icon dark>{{ item.icon }}</v-icon>
                  </v-btn>
                </div>
                <div>
                  <h4 class="font-weight-medium">{{ item.title }}</h4>
                  <span
                    class="text--secondary caption descpart d-block text-truncate"
                    >{{ item.desc }}</span
                  >
                </div>
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->

      <!-- ---------------------------------- -->
      <!---User -->
      <!-- ---------------------------------- -->
      <v-toolbar-title class="align-center black--text d-flex ms-2 ms-lg-4 mr-1 userName" v-if="loginStatus">
        Martin Knapic
      </v-toolbar-title>
      <v-menu
        bottom
        left
        offset-y
        origin="top right"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on" class="mr-1 align-self-center">
            <v-avatar size="40">
              <!-- <img
                src="https://www.pngjoy.com/pngs/73/1571933_user-default-profile-picture-png-hd-png-download.png"
                alt="Martin"
              /> -->
              <img v-if="loginStatus"
                src="https://ca.slack-edge.com/TGUK83BPA-U01KTG7MK34-g19920895070-512"
                alt="Martin"
              />
              <v-icon color="primary" v-else size="36px">mdi-account-circle-outline </v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list v-if="loginStatus">
          <v-list-item
            v-for="(item, i) in userprofile"
            :key="i"
            :to="item.to"
            @click="href"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- ---------------------------------- -->
      <!---User -->
      <!-- ---------------------------------- -->
    </v-container>
  </v-app-bar>
</template>
<script>
// Utilities
import { mapState, mapMutations } from "vuex";
import ProgressBar from "../../../components/vuetifyStyleComponents/progressBar";

export default {
  name: "HorizontalHeader",

  components: {
    ProgressBar
  },

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    showLogo: true,
    showSearch: false,
    notifications: [
      {
        title: "Knowledge hub",
        iconbg: "error",
        icon: "mdi-link-variant",
        desc: "Source of all knowledge"
      },
      {
        title: "Support",
        iconbg: "success",
        icon: "mdi-calendar-check",
        desc: "Send us and email"
      }
    ],
    messages: [
      {
        title: "Sonu Nigam",
        avatar: "1",
        avatarstatus: "success",
        desc: "Singing Show tonigh at 9pm!",
        time: "9:30AM"
      },
      {
        title: "Sonu Nigam",
        avatar: "2",
        avatarstatus: "error",
        desc: "The greate malody songs ever sung",
        time: "10:30AM"
      },
      {
        title: "Arijit singh",
        avatar: "3",
        avatarstatus: "warning",
        desc: "You can customize this template as you want",
        time: "11:30AM"
      },
      {
        title: "Pavan Kumar",
        avatar: "4",
        avatarstatus: "success",
        desc: "Sent you an notification",
        time: "12:30AM"
      }
    ],
    userprofile: [
      { title: "Profile", to: "/profile" },
      { title: "Users", to: "/users" },
      { title: "Billing", to: "/billing" },
      { title: "Plan", to: "/plan" },
      { title: "Account", to: "/account" },
      // { title: "Settings", to: "/account-settings" },      
      // { title: "Account Setting", to: "/form-layouts/flformbasic" },
      { title: "Sign out", to: "/authentication/boxedlogin" }
    ],
    href() {
      return undefined;
    }
  }),

  computed: {
    ...mapState(["navbarColor", "Sidebar_drawer", "loginStatus"])
  },

  methods: {
    ...mapMutations({
      setSidebarDrawer: "SET_SIDEBAR_DRAWER"
    }),
    showhideLogo: function() {
      this.showLogo = !this.showLogo;
    },
    searchbox: function() {
      this.showSearch = !this.showSearch;
    }
  }
};
</script>

<style lang="scss">
.hidelogo {
  display: none;
}
.searchinput {
  position: absolute;
  width: 100%;
  margin: 0;
  left: 0;
  z-index: 10;
  padding: 0 15px;
}
.descpart {
  max-width: 220px;
}

.logoTitle {
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  color: #2b2b2b;
}

.horizontal-header {
  box-shadow: 0px 5px 3px rgb(0 0 0 / 20%) !important;
  .v-toolbar__content {
    padding-top: 0px;
    padding-bottom: 0px;
    height: 100%;
    .container {
      height: 100%;
      
    }
  }
}

.topMenu {
  height: 100%;
  .v-item-group { 
    height: 100%;
  }
}

.userName {
  font-size: 1rem;
}
.v-tabs-slider-wrapper {
  height: 3px !important;
}
@media (min-width: 1024px) {
  .horizontalstyle {
    .logo-width {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 235px;
    }
  }
}
</style>
