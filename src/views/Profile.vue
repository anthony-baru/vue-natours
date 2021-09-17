<template>
  <main class="main">
    <div class="user-view">
      <nav class="user-view__menu">
        <ul class="side-nav">
          <li class="side-nav--active">
            <a href="#">
              <svg>
                <use xlink:href="img/icons.svg#icon-settings"></use></svg
              >Settings</a
            >
          </li>
          <li>
            <a href="#">
              <svg>
                <use xlink:href="img/icons.svg#icon-briefcase"></use></svg
              >My bookings</a
            >
          </li>
          <li>
            <a href="#">
              <svg>
                <use xlink:href="img/icons.svg#icon-star"></use></svg
              >My reviews</a
            >
          </li>
          <li>
            <a href="#">
              <svg>
                <use xlink:href="img/icons.svg#icon-credit-card"></use></svg
              >Billing</a
            >
          </li>
        </ul>
        <div class="admin-nav">
          <h5 class="admin-nav__heading">Admin</h5>
          <ul class="side-nav">
            <li>
              <a href="#">
                <svg>
                  <use xlink:href="img/icons.svg#icon-map"></use></svg
                >Manage tours</a
              >
            </li>
            <li>
              <a href="#">
                <svg>
                  <use xlink:href="img/icons.svg#icon-users"></use></svg
                >Manage users</a
              >
            </li>
            <li>
              <a href="#">
                <svg>
                  <use xlink:href="img/icons.svg#icon-star"></use></svg
                >Manage reviews</a
              >
            </li>
          </ul>
        </div>
      </nav>
      <div class="user-view__content">
        <div class="user-view__form-container">
          <h2 class="heading-secondary ma-bt-md">Your account settings</h2>
          <form class="form form-user-data">
            <div class="form__group">
              <label class="form__label" for="name">Name</label>
              <input
                class="form__input"
                id="name"
                type="text"
                value="Jonas Schmedtmann"
                required="required"
              />
            </div>
            <div class="form__group ma-bt-md">
              <label class="form__label" for="email">Email address</label>
              <input
                class="form__input"
                id="email"
                type="email"
                value="admin@natours.io"
                required="required"
              />
            </div>
            <div class="form__group form__photo-upload">
              <label style="display: block" class="form__label" for="email">
                Choose new photo</label
              >
              <div class="preview">
                <img v-if="url" :src="url" class="form__user-photo" />
              </div>
              <input type="file" name="photo" @change="onFileChange" />
            </div>
            <div class="form__group right">
              <button class="btn btn--small btn--green">Save settings</button>
            </div>
          </form>
        </div>
        <div class="line">&nbsp;</div>
        <div class="user-view__form-container">
          <h2 class="heading-secondary ma-bt-md">Password change</h2>
          <form class="form form-user-settings">
            <div class="form__group">
              <label class="form__label" for="password-current"
                >Current password</label
              >
              <input
                class="form__input"
                id="password-current"
                type="password"
                placeholder="••••••••"
                required="required"
                minlength="8"
              />
            </div>
            <div class="form__group">
              <label class="form__label" for="password">New password</label>
              <input
                class="form__input"
                id="password"
                type="password"
                placeholder="••••••••"
                required="required"
                minlength="8"
              />
            </div>
            <div class="form__group ma-bt-lg">
              <label class="form__label" for="password-confirm"
                >Confirm password</label
              >
              <input
                class="form__input"
                id="password-confirm"
                type="password"
                placeholder="••••••••"
                required="required"
                minlength="8"
              />
            </div>
            <div class="form__group right">
              <button class="btn btn--small btn--green">Save password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      url: "/img/users/user-1.jpg",
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
  },
  metaInfo: {
    title: "Natours | Profile",
    // titleTemplate: "%s - Home",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
};
</script>

<style></style>
