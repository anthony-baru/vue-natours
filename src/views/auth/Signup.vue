<template>
  <main class="main">
    <div class="login-form">
      <h2 class="heading-secondary ma-bt-lg">Sign up to create account</h2>
      <form class="form" @submit.prevent="handleRegister">
        <div class="form__group">
          <label class="form__label" for="name">Name</label>
          <input
            v-model="name"
            class="form__input"
            id="email"
            type="text"
            placeholder="john doe"
            required="required"
          />
        </div>
        <div class="form__group">
          <label class="form__label" for="email">Email address</label>
          <input
            v-model="email"
            class="form__input"
            id="email"
            type="email"
            placeholder="you@example.com"
            required="required"
          />
        </div>
        <div class="form__group ma-bt-md">
          <label class="form__label" for="password">Password</label>
          <input
            v-model="password"
            class="form__input"
            id="password"
            type="password"
            placeholder="••••••••"
            required="required"
            minlength="8"
          />
        </div>
        <div class="form__group ma-bt-md">
          <label class="form__label" for="confirm_password"
            >Confirm Password</label
          >
          <input
            v-model="passwordConfirm"
            class="form__input"
            id="confirm_password"
            type="password"
            placeholder="••••••••"
            required="required"
            minlength="8"
          />
        </div>
        <div class="form__group">
          <button type="submit" class="btn btn--green">Sign UP</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      submitted: false,
      successful: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.authManage.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    async handleRegister() {
      this.message = "";
      this.submitted = true;
      try {
        const isValid = await this.$validator.validateAll();
        console.log(isValid);
        if (isValid) {
          console.log("Commencing validation");
          await this.$store.dispatch("authManage/register", {
            name: this.name,
            email: this.email,
            password: this.password,
            passwordConfirm: this.passwordConfirm,
          });

          this.message = "Registration Successfull.";
          this.successful = true;
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    },
  },
};
</script>

<style></style>
