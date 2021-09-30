<template>
    <div id="app">
        <app-header></app-header>
        <transition name="route" mode="out-in">
            <router-view></router-view>
        </transition>
        <app-footer></app-footer>
        <alert />
    </div>
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
    transition: opacity 0.5s;
}
.route-enter, .route-leave-to /* .route-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
