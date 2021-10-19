export const profile = {
    namespaced: true,
    state: {
        startLocation: { address: "" },
    },
    getters: {
        getStartLocation(state) {
            return state.startLocation;
        },
    },
    mutations: {
        setStartLocation(state, startLocation) {
            state.startLocation = startLocation;
        },
    },
    actions: {},
};
