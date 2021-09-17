<template>
  <main class="main">
    <div class="login-form">
      <h2 class="heading-secondary ma-bt-lg">Log into your account</h2>
      <div v-show="loading" class="alert" :class="`alert--${alertType}`">
        {{ message }}
      </div>
      <form class="form" @submit.prevent="handleLogin">
        <div class="form__group">
          <label class="form__label" for="email">Email address</label>
          <input
            class="form__input"
            id="email"
            type="email"
            placeholder="you@example.com"
            required="required"
            v-model="email"
          />
          <div
            v-if="errors.has('email')"
            class="alert alert-danger"
            role="alert"
          ></div>
        </div>
        <div class="form__group ma-bt-md">
          <label class="form__label" for="password">Password</label>
          <input
            class="form__input"
            id="password"
            type="password"
            placeholder="••••••••"
            required="required"
            minlength="8"
            v-model="password"
          />
          <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          ></div>
        </div>
        <div class="form__group">
          <button class="btn btn--green" :disabled="btnDisable">Login</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      email: "",
      password: "",
      alert: false,
      alertType: null,
      loading: false,
      btnDisable: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      console.log(this.$store.state);
      return this.$store.state.authManage.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    async handleLogin() {
      this.btnDisable = true;
      try {
        const isValid = await this.$validator.validateAll();

        if (!isValid) {
          return;
        }
        if (this.email && this.password) {
          await this.$store.dispatch("authManage/login", {
            email: this.email,
            password: this.password,
          });
          this.$router.push("/");
        }
        this.btnDisable = false;
      } catch (error) {
        this.btnDisable = false;

        this.showAlert("error", error);
      }
    },
    showAlert(type, message) {
      this.loading = true;
      this.message = message;
      this.alertType = type;
      setTimeout(() => {
        this.loading = false;
        this.message = "";
        this.alertType = null;
      }, 10000);
    },
  },
};
</script>

<style></style>
