export const profile = {
    namespaced: true,
    state: {
        startLocation: { address: "" },
        locations:[]
    },
    getters: {
        getStartLocation(state) {
            return state.startLocation;
        },
        getLocations(state){
            return state.locations
        }
    },
    mutations: {
        setStartLocation(state, startLocation) {
            state.startLocation = startLocation;
        },
        setLocations(state,location){
            state.locations.push(location)
        }
    },
    actions: {},
};
