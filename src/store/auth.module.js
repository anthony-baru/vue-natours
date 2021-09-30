import AuthService from "../services/auth.service";

const auth = JSON.parse(localStorage.getItem("auth"));
const initialState = auth
    ? { status: { loggedIn: true }, auth }
    : { status: { loggedIn: false }, auth: null };

export const authManage = {
    namespaced: true,
    state: initialState,
    actions: {
        async login({ commit }, userLoginRequestBody) {
            const loginRes = await AuthService.login(userLoginRequestBody);

            commit("loginSuccess", loginRes);
            return loginRes;
        },
        logout({ commit }) {
            AuthService.logout();
            commit("logout");
        },
        async register({ commit }, userRegisterBody) {
            try {
                const registerResponse = await AuthService.register(userRegisterBody);
                console.log("registerResponse", registerResponse);
                commit("registerSuccess", registerResponse);
                return Promise.resolve(registerResponse.data);
            } catch (error) {
                commit("registerFailure");
                return Promise.reject(error);
            }
        },
        async updatePassword({ commit }, pwd) {
            console.log(commit);
            return AuthService.updatePassword(pwd);
        },
        async changeAccountSettings({ commit }, payload) {
            const changeAccountResp = await AuthService.changeAccountSettings(payload);

            commit("changeAccountSettings", changeAccountResp.user);
            return changeAccountResp.data;
        },
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.auth = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.auth = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.auth = null;
        },
        registerSuccess(state, user) {
            console.log(user);
            state.status.loggedIn = true;
            state.auth = user;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        },
        changeAccountSettings(state, user) {
            state.auth.user = user;
        },
    },
};
