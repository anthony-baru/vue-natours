<template>
    <div id="app">
        <app-header></app-header>
        <router-view></router-view>
        <app-footer></app-footer>
        <alert />
    </div>
</template>

<style></style>
<script>
import AppHeader from "./components/Header.vue";
import AppFooter from "./views/Footer.vue";
import Alert from "./components/shared/Alert.vue";

console.log(process.env, "process env");
export default {
    name: "App",
    components: { AppHeader, AppFooter, Alert },
};
</script>
