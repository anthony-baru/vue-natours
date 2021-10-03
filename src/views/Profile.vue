<template>
    <main class="main">
        <div class="user-view">
            <nav class="user-view__menu">
                <ul class="side-nav">
                    <li class="">
                        <router-link :to="{ name: 'Settings' }" active-class="side-nav--active">
                            <svg>
                                <use xlink:href="img/icons.svg#icon-settings"></use></svg
                            >Settings</router-link
                        >
                    </li>
                    <li>
                        <router-link :to="{ name: 'Bookings' }" active-class="side-nav--active">
                            <svg>
                                <use xlink:href="img/icons.svg#icon-briefcase"></use></svg
                            >My bookings</router-link
                        >
                    </li>
                    <li>
                        <router-link :to="{ name: 'Reviews' }" active-class="side-nav--active">
                            <svg>
                                <use xlink:href="img/icons.svg#icon-star"></use></svg
                            >My reviews</router-link
                        >
                    </li>
                    <!-- <li>
                        <router-link :to="{ name: 'Billing' }" active-class="side-nav--active">
                            <svg>
                                <use xlink:href="img/icons.svg#icon-credit-card"></use></svg
                            >Billing</router-link
                        >
                    </li> -->
                </ul>
                <div class="admin-nav">
                    <h5 class="admin-nav__heading">Admin</h5>
                    <ul class="side-nav">
                        <li>
                            <router-link
                                :to="{ name: 'ManageTours' }"
                                active-class="side-nav--active"
                            >
                                <svg>
                                    <use xlink:href="img/icons.svg#icon-map"></use></svg
                                >Manage tours</router-link
                            >
                        </li>
                        <!-- <li>
                            <router-link
                                :to="{ name: 'ManageUsers' }"
                                active-class="side-nav--active"
                            >
                                <svg>
                                    <use xlink:href="img/icons.svg#icon-users"></use></svg
                                >Manage users</router-link
                            >
                        </li>
                        <li>
                            <a href="#">
                                <svg>
                                    <use xlink:href="img/icons.svg#icon-star"></use></svg
                                >Manage reviews</a
                            >
                        </li> -->
                    </ul>
                </div>
            </nav>
            <router-view />
        </div>
    </main>
</template>

<script>
// import Settings from "../components/profile/Settings.vue";
export default {
    name: "Profile",
    components: {},
};
</script>

<style></style>
