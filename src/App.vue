<template>
    <v-app>
        <div id="app">
            <app-header></app-header>
            <transition name="route" mode="out-in">
                <router-view></router-view>
            </transition>
            <app-footer></app-footer>
            <alert />
        </div>
    </v-app>
    <!-- <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                    transition="scale-transition"
                    width="40"
                />

                <v-img
                    alt="Vuetify Name"
                    class="shrink mt-1 hidden-sm-and-down"
                    contain
                    min-width="100"
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
                    width="100"
                />
            </div>

            <v-spacer></v-spacer>

            <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
                <span class="mr-2">Latest Release</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app> -->
</template>

<style></style>
<script>
import AppHeader from "./components/Header.vue";
import AppFooter from "./views/Footer.vue";
import Alert from "./components/shared/Alert.vue";

export default {
    name: "App",
    components: { AppHeader, AppFooter, Alert },
};
</script>

<style scoped>
.route-enter-active,
.route-leave-active {
    transition: opacity 0.3s;
}
.route-enter, .route-leave-to /* .route-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
