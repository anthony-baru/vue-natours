<template>
    <main class="main">
        <div class="login-form">
            <h2 class="heading-secondary ma-bt-lg">Log into your account</h2>

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
                    <div v-if="errors.has('email')" class="alert alert-danger" role="alert"></div>
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
    components: {},
    data() {
        return {
            email: "",
            password: "",
            btnDisable: false,
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
                //       const payload = {
                //     type: "success",
                //     message: "Login Successful",
                // };
                    // this.$store.commit("alert/showAlert", payload);
                this.$toast.success("Login Successful!")
                this.btnDisable = false;
                    this.$router.push("/");
                }
                this.btnDisable = false;
            } catch (error) {
                console.log(error)
                // const payload = {
                //     type: "error",
                //     message: error.response.data.message,
                // };
                // this.$store.commit("alert/showAlert", payload);
                console.log(error,"errr")
                this.btnDisable = false;
                this.$toast.error( error.response.data.message)
            }
        },
    },
};
</script>

<style>
</style>
