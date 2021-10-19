import Vue from "vue";
import Router from "vue-router";
import goTo from "vuetify/es5/services/goto";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  // This is for the scroll top when click on any router link
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return goTo(scrollTo);
  },
  // This is for the scroll top when click on any router link
  routes: [
    {
      path: "/",
      redirect: "dashboards",
      component: () => import("@/layouts/full-layout/Layout"),
      // name: "Overview",
      // path: "dashboards/overview",
      // component: () => import("@/views/dashboards/overview/Overview"),
      // {
      //   name: "Analytical",
      //   path: "dashboards/analytical",
      //   component: () => import("@/views/dashboards/analytical/Analytical"),
      // },
      children: [
        // Application
        {
          name: "Apps",
          path: "single-check",
          component: () => import("@/views/check/SingleCheck")
        },
        // Application
        {
          name: "Apps",
          path: "bulk-check",
          component: () => import("@/views/check/BulkCheck")
        },
        {
          name: "Apps",
          path: "api-key",
          component: () => import("@/views/apikey/APIKey")
        },
        {
          name: "Apps",
          path: "profile",
          component: () => import("@/views/profile")
        },
        {
          name: "Apps",
          path: "account-settings",
          component: () => import("@/views/account-settings")
        },
        {
          name: "Apps",
          path: "billing",
          component: () => import("@/views/billing")
        },
        {
          name: "Apps",
          path: "users",
          component: () => import("@/views/users")
        },
        {
          name: "Apps",
          path: "new-user",
          component: () => import("@/views/users/new-user")
        },
        // Components

        {
          name: "Flex",
          path: "style-animation/flex",
          component: () => import("@/views/style-animation/Flex")
        },
        {
          name: "Float",
          path: "style-animation/float",
          component: () => import("@/views/style-animation/Float")
        },
        {
          name: "Spacing",
          path: "style-animation/spacing",
          component: () => import("@/views/style-animation/Spacing")
        },
        {
          name: "Text",
          path: "style-animation/text",
          component: () => import("@/views/style-animation/Text")
        },
        {
          name: "Typography",
          path: "style-animation/typography",
          component: () => import("@/views/style-animation/Typography")
        },
        {
          name: "Transitions",
          path: "style-animation/transitions",
          component: () => import("@/views/style-animation/Transitions")
        },
        {
          name: "ProgrammaticScrolling",
          path: "style-animation/scroll",
          component: () => import("@/views/style-animation/Scroll")
        },
        {
          name: "ApexCharts",
          path: "charts/apexcharts",
          component: () => import("@/views/charts/apexcharts/ApexCharts")
        },
        {
          name: "Analytical",
          path: "dashboards/analytical",
          component: () => import("@/views/dashboards/analytical/Analytical")
        },
        {
          name: "Classic",
          path: "dashboards/classic",
          component: () => import("@/views/dashboards/classic/Classic")
        },
        {
          name: "Demographical",
          path: "dashboards/demographical",
          component: () =>
            import("@/views/dashboards/demographical/Demographical")
        },
        {
          name: "Minimal",
          path: "dashboards/minimal",
          component: () => import("@/views/dashboards/minimal/Minimal")
        },
        {
          name: "Overview",
          path: "dashboards",
          component: () => import("@/views/dashboards/overview/Overview")
        }
      ]
    },

    {
      path: "/authentication",
      component: () => import("@/layouts/blank-layout/Blanklayout"),
      children: [
        {
          name: "BoxedLogin",
          path: "boxedlogin",
          component: () => import("@/views/authentication/BoxedLogin")
        },
        {
          name: "BoxedForgotPassword",
          path: "boxedforgotpassword",
          component: () => import("@/views/authentication/BoxedForgotPassword")
        },
        {
          name: "FullLogin",
          path: "fulllogin",
          component: () => import("@/views/authentication/FullLogin")
        },
        {
          name: "BoxedRegister",
          path: "boxedregister",
          component: () => import("@/views/authentication/BoxedRegister")
        },
        {
          name: "FullRegister",
          path: "fullregister",
          component: () => import("@/views/authentication/FullRegister")
        },
        {
          name: "Error",
          path: "error",
          component: () => import("@/views/authentication/Error")
        }
      ]
    },
    {
      path: "*",
      component: () => import("@/views/authentication/Error")
    }
  ]
});

import NProgress from "nprogress";

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start(800);
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
