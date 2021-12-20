import Vue from "vue";
import VueRouter from "vue-router";

import Overview from "../views/Overview.vue";
import HomeTest from "../views/v2/ManageTours.vue";
import Signin from "../views/auth/Signin.vue";
import Signup from "../views/auth/Signup.vue";
import Settings from "../views/profile/Settings.vue";
import Bookings from "../views/profile/Bookings.vue";
import Reviews from "../views/profile/Reviews.vue";
import ManageTours from "../views/v2/ManageTours";
import Tour from "../views/Tour.vue";
import Profile from "../views/Profile.vue";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

import store from "../store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/test",
        name: "HomeTest",
        component: HomeTest,
    },
    {
        path: "/",
        name: "Overview",
        component: Overview,
    },
    {
        path: "/signin",
        name: "Signin",
        component: Signin,
    },
    {
        path: "/signup",
        name: "Signup",
        component: Signup,
    },
    {
        path: "/tour/:id",
        name: "Tour",
        component: Tour,
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        redirect: {
            name: "Settings",
        },
        children: [
            {
                name: "Settings",
                path: "settings",
                component: Settings,
            },
            {
                name: "Bookings",
                path: "bookings",
                component: Bookings,
            },
            {
                name: "Reviews",
                path: "reviews",
                component: Reviews,
            },
            // {
            //     name: "Billing",
            //     path: "billing",
            //     component: Billing,
            // },
            {
                name: "ManageTours",
                path: "manage/tours",
                component: ManageTours,
                meta: { requiresAuth: true },
            },
        ],
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.state.authManage.status.loggedIn) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});

//   router.beforeEach((to, from, next) => {
//     if (to.matched.some((record) => record.meta.guest)) {
//       if (store.state.authManage.status.loggedIn) {
//         next("/posts");
//         return;
//       }
//       next();
//     } else {
//       next();
//     }
//   });

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    console.log(from);
    if (to.name) {
        // Start the route progress bar.
        Nprogress.start();
    }
    next();
});

router.afterEach(() => {
    // Complete the animation of the route progress bar.
    Nprogress.done();
});

export default router;
