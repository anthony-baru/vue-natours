import Vue from "vue";
import Vuex from "vuex";

import { authManage } from "./auth.module";
import { alert } from "./alert.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authManage,
    alert,
  },
});
