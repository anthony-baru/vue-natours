export const alert = {
  namespaced: true,
  state: {
    message: "",
    show: false,
    type: null,
  },
  mutations: {
    showAlert(state, payload) {
      state.show = true;
      state.message = payload.message;
      state.type = payload.type;
      setTimeout(() => {
        state.show = false;
        state.message = "";
        state.type = null;
      }, 10000);
    },
  },
  actions: {},
};
