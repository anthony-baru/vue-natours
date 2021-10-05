/* eslint no-unused-vars:0 */
/* eslint no-undef:0 */
import axios from "axios";
import jwtDecode from "jwt-decode";

export default {
    init(router, store) {
        axios.interceptors.request.use(async(config) => {
            if (store.getters["auth/isAuthenticated"]) {
                const token = store.getters["auth/accessToken"];
                const { exp } = jwtDecode(token);

                if (Date.now() > exp * 1000) {
                    try {
                        await store.dispatch("auth/refresh").then(() => {
                            config.headers.auth = store.getters["auth/accessToken"];
                        });
                    } catch (e) {
                        await store.dispatch("auth/signOut").then(() => {
                            router.push({ name: "SignIn" });
                        });
                    }
                } else {
                    config.headers.auth = token;
                }
            }
            if (process.env.NODE_ENV === "production") config.baseURL = "/api";
            // config.baseURL = '/backoffice/api';
            // config.baseURL = '/motor-assessment/api';

            // console.log('Starting Request', config);
            return config;
        });

        axios.interceptors.response.use((response) => {
            // console.log(response);
            return response;
        });

        axios.interceptors.response.use(null, async(error) => {
            if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                if (error.response.status === 401) {
                    const config = { retryAttempts: 1, ...error.config };

                    try {
                        // attempt to refresh access token using refresh token
                        await store.dispatch("auth/refresh");
                        // re-run the initial request using the new request config after a successful refresh
                        // this response will be returned to the initial calling method
                        return resolve(axios(config));
                    } catch (e) {
                        // catch any error while refreshing the token
                        await store.dispatch("auth/signOut").then(() => {
                            router.push({ name: "SignIn" });
                        });
                    }
                }
                if (
                    error.response.status === 500 ||
                    error.response.status === 502 ||
                    error.response.status === 504 ||
                    error.response.status === 403
                ) {
                    // router.push({ name: 'ServerError' });
                }
                if (error.response.status === 404) {
                    // router.push({ name: 'NotFound' });
                }
                // console.log(error.response);
            } else if (error.request) {
                /*
                 * The request was made but no response was received, `error.request`
                 * is an instance of XMLHttpRequest in the browser and an instance
                 * of http.ClientRequest in Node.js
                 */
                // router.push({ name: 'NoInternet' });
            } else {
                // * Something happened in setting up the request and triggered an Error
                // console.log('Error', error.message);
                //   router.push({ name: 'NoInternet' });
            }
            // console.log(error);
            return Promise.reject(error);
        });

        router.beforeResolve((to, from, next) => {
            next();
        });

        router.afterEach((to, from) => {
            //
        });
    },
};