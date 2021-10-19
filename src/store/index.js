import Vue from "vue";
import Vuex from "vuex";

import { authManage } from "./auth.module";
import { alert } from "./alert.module";
import { profile } from "./profile.module";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authManage,
    alert,
    profile
  },
  plugins: [createPersistedState({paths:['authManage']})]
});
