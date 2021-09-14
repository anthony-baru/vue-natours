<template>
  <header class="header">
    <nav class="nav nav--tours">
      <router-link to="/" class="nav__el">All tours</router-link>
      <form class="nav__search">
        <button class="nav__search-btn">
          <svg>
            <use xlink:href="img/icons.svg#icon-search"></use>
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search tours"
          class="nav__search-input"
        />
      </form>
    </nav>
    <div class="header__logo">
      <img src="/img/logo-white.png" alt="Natours logo" />
    </div>
    <nav class="nav nav--user">
      <router-link to="/profile" v-if="currentUser" href="#" class="nav__el"
        >My bookings</router-link
      >
      <router-link to="/profile" v-if="currentUser" href="#" class="nav__el">
        <img
          src="/img/users/user-1.jpg"
          alt="User photo"
          class="nav__user-img"
        />
        <span>{{ user.name }}</span>
      </router-link>
      <router-link
        v-if="!currentUser"
        to="/signin"
        tag="button"
        class="nav__el"
      >
        Sign In
      </router-link>
      <router-link
        v-if="!currentUser"
        to="/signup"
        tag="button"
        class="nav__el nav__el--cta"
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
  },
  methods: {
    logout() {
      this.$store.dispatch("authManage/logout");
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
