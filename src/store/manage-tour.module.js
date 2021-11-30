import userService from "../services/user.service";

export const manageTour = {
    namespaced: true,
    state: {
        startLocation: { address: "" },
        locations: [],
        editedItem: {
            name: "",
            difficulty: "",
            price: 0,
            duration: 0,
            maxGroupSize: 0,
            guides: [],
            startDates: [],
        },
        defaultItem: {
            name: "",
            difficulty: "",
            price: 0,
            duration: 0,
            maxGroupSize: 0,
            guides: [],
            startDates: [],
        },
        guides: [],
    },
    getters: {
        getStartLocation(state) {
            return state.startLocation;
        },
        getLocations(state) {
            return state.locations;
        },
        getEditedItem(state) {
            return state.editedItem;
        },
        getDefaultItem(state) {
            return state.defaultItem;
        },
        getGuides(state) {
            return state.guides;
        },
        getGuideIds(state) {
            return state.editedItem.guides;
        },
        getStartDates(state) {
            return state.editedItem.startDates;
        },
    },
    mutations: {
        setStartLocation(state, startLocation) {
            state.startLocation = startLocation;
        },
        setLocations(state, location) {
            state.locations.push(location);
        },
        setEditedItem(state, item) {
            return (state.editedItem = item);
        },
        setDefaultItem(state, item) {
            return (state.defaultItem = item);
        },
        setGuides(state, item) {
            return (state.guides = item);
        },
        setGuideIds(state, item) {
            return (state.editedItem.guides = item);
        },
        setStartDates(state, item) {
            return (state.editedItem.startDates = item);
        },
    },
    actions: {
        async getUsers() {
            return userService.getUsers();
        },
        async getGuides({ dispatch, commit }) {
            let users = await dispatch("getUsers");
            const guides = users
                .filter((el) => {
                    return el.role === "guide" || el.role === "lead-guide";
                })
                .map((user) => {
                    return Object.assign({}, user, {
                        photo: `${process.env.VUE_APP_API_BASE_URL}/img/users/${user.photo}`,
                    });
                });
            commit("setGuides", guides);
        },

        async getSelectedGuideIds({ commit }, payload) {
            let tourGuideProp = payload;
            const selectedGuideIds = tourGuideProp.map((el) => {
                if (typeof el === "object") {
                    return el._id;
                }
                return el;
            });
            commit("setGuideIds", selectedGuideIds);
        },
    },
};
