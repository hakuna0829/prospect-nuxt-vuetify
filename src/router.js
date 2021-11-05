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
      redirect: "lists",
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
          name: "SingleCheck",
          path: "single-check",
          component: () => import("@/views/check/SingleCheck")
        },
        // Application
        {
          name: "BulkCheck",
          path: "bulk-check",
          component: () => import("@/views/check/BulkCheck")
        },
        {
          name: "API KEY",
          path: "api-key",
          component: () => import("@/views/apikey/APIKey")
        },
        {
          name: "Profile",
          path: "profile",
          component: () => import("@/views/profile")
        },
        {
          name: "Account Setting",
          path: "account-settings",
          component: () => import("@/views/account-settings")
        },
        {
          name: "Billing",
          path: "billing",
          component: () => import("@/views/billing")
        },
        {
          name: "Users",
          path: "users",
          component: () => import("@/views/users")
        },
        {
          name: "New User",
          path: "new-user",
          component: () => import("@/views/users/new-user")
        },
        {
          name: "Plan",
          path: "plan",
          component: () => import("@/views/plan")
        },
        {
          name: "Account",
          path: "account",
          component: () => import("@/views/account")
        },
        {
          name: "Lists",
          path: "lists",
          component: () => import("@/views/lists")
        },
        {
          name: "Lists Detail",
          path: "detail-list/:id",
          component: () => import("@/views/lists/DetailList")
        },
      ]
    },
    // admin path
    {
      path: "/admin",
      component: () => import("@/layouts/admin-layout/Layout"),
      children: [
        {
          name: "Admin users list",
          path: "users",
          component: () => import("@/views/admin/users")
        },
        {
          name: "Admin company list",
          path: "company",
          component: () => import("@/views/admin/company")
        },
        {
          name: "Admin new user",
          path: "new-user",
          component: () => import("@/views/admin/users/new-user")
        },
        {
          name: "Admin new company",
          path: "new-company",
          component: () => import("@/views/admin/company/new-company")
        },
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
