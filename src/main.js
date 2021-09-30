import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidate from "vee-validate";
import VueMeta from "vue-meta";
import vuetify from './plugins/vuetify'

require("@/assets/css/style.css");

Vue.config.productionTip = false;
Vue.use(VueMeta, { refreshOnceOnNavigation: true });
Vue.use(VeeValidate);
new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App)
}).$mount("#app");
