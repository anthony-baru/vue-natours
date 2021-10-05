import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidate from "vee-validate";
import VueMeta from "vue-meta";
import vuetify from './plugins/vuetify'
import axios from 'axios';

// axios.defaults.withCredentials = true

axios.defaults.baseURL =process.env.VUE_APP_API_BASE_URL+"/api/v1";

axios.interceptors.response.use(undefined, function (error) {
    if (error.response.status === 401) {
       
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
    
          originalRequest._retry = true;
          const payload = {
            type: "error",
            message: "Unauthorized.",
        };
        
        store.commit('authManage/logout')
        store.commit("alert/showAlert", payload);
           router.push('/signin')
           return Promise.reject(error)
      }
    }
    else{
      console.log(error.response,"axiosError")
     return  Promise.reject(error)
    }
  })

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
