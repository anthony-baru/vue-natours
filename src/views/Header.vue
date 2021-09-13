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
      <!-- <a href="#" class="nav__el">My bookings</a>
      <a href="#" class="nav__el">
        <img
          src="/img/users/user-1.jpg"
          alt="User photo"
          class="nav__user-img"
        />
        <span>Jonas</span>
      </a> -->
      <router-link to="/signin" tag="button" class="nav__el">
        Sign In
      </router-link>
      <router-link to="/signup" tag="button" class="nav__el nav__el--cta"
        >Sign up</router-link
      >
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style></style>
