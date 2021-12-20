import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidate from "vee-validate";
import VueMeta from "vue-meta";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

require("@/assets/css/style.css");
// axios.defaults.withCredentials = true
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL + "/api/v1";

axios.interceptors.response.use(undefined, function (error) {
    Nprogress.done();
    if (error.message == "Network Error") {
        return Promise.reject("Network Error");
    } else {
        if (error && error.response.status === 401) {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const payload = {
                    type: "error",
                    message: "Unauthorized.",
                };

                store.commit("authManage/logout");
                store.commit("alert/showAlert", payload);
                router.push("/signin");
                return Promise.reject(error);
            }
        } else {
            console.log(error.response, "axiosError");
            return Promise.reject(error);
        }
    }
});

axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        Nprogress.start();
        return config;
    },
    function (error) {
        // Do something with request error
        console.log("axios*******request*error", error);

        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        Nprogress.done();
        return response;
    },
    function (error) {
        // Do something with response error
        console.log("axios*******response*error", error);
        return Promise.reject(error);
    }
);

Vue.config.productionTip = false;
Vue.use(VueMeta, { refreshOnceOnNavigation: true });
Vue.use(VeeValidate);
Vue.use(Toast);
new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
