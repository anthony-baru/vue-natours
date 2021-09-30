<template>
    <header class="header">
        <nav class="nav nav--tours">
            <router-link to="/" class="nav__el">All tours</router-link>
            <form class="nav__search" v-show="$route.path == '/'">
                <button class="nav__search-btn">
                    <svg>
                        <use xlink:href="img/icons.svg#icon-search"></use>
                    </svg>
                </button>
                <input type="text" placeholder="Search tours" class="nav__search-input" />
            </form>
        </nav>
        <div class="header__logo">
            <img src="../assets/img/logo-white.png" alt="Natours logo" />
        </div>
        <nav class="nav nav--user">
            <router-link :to="{ name: 'Bookings' }" v-if="currentUser" href="#" class="nav__el"
                >My bookings</router-link
            >
            <router-link to="/profile" v-if="currentUser" href="#" class="nav__el">
                <img
                    :src="baseUrl + '/img/users/' + user.photo"
                    alt="User photo"
                    class="nav__user-img"
                />
                <span>{{ user.name }}</span>
            </router-link>
            <router-link v-if="!currentUser" to="/signin" tag="button" class="nav__el">
                Sign In
            </router-link>
            <router-link v-if="!currentUser" to="/signup" tag="button" class="nav__el nav__el--cta"
                >Sign up</router-link
            >
            <a
                @click.prevent="logout"
                v-if="currentUser"
                to="/signout"
                tag="button"
                class="nav__el"
            >
                Sign Out
            </a>
        </nav>
    </header>
</template>

<script>
export default {
    computed: {
        currentUser() {
            return this.$store.state.authManage.status.loggedIn;
        },
        user() {
            return this.$store.state.authManage.auth.user;
        },
        baseUrl() {
            return process.env.VUE_APP_API_BASE_URL;
        },
    },
    methods: {
        logout() {
            this.$store.dispatch("authManage/logout");

            if (this.$route.path != "/") {
                this.$router.push("/");
            }
        },
    },
};
</script>

<style></style>
