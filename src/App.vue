<template>
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div> -->
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<style></style>
<script>
import AppHeader from "./components/Header.vue";
import AppFooter from "./views/Footer.vue";

console.log(process.env, "process env");
export default {
  name: "App",
  components: { AppHeader, AppFooter },
};
</script>
