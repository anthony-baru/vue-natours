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
                        id="name"
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
                    <label class="form__label" for="confirm_password">Confirm Password</label>
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
                    <button type="submit" class="btn btn--green" :disabled="btnDisabled">
                        Sign UP
                    </button>
                </div>
            </form>
        </div>
    </main>
</template>

<script>
export default {
    name: "Signup",
    components: {},
    data() {
        return {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
            btnDisabled: false,
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.authManage.status.loggedIn;
        },
    },
    mounted() {
        if (this.loggedIn) {
            this.$router.push("/");
        }
    },
    methods: {
        async handleRegister() {
            
            this.btnDisabled = true;
            try {
                const isValid = await this.$validator.validateAll();

                if (isValid) {
                    await this.$store.dispatch("authManage/register", {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        passwordConfirm: this.passwordConfirm,
                    });

                    this.$toast.success("Registration Successful.")
                    this.$router.push("/");
                }
                this.btnDisabled = false;
            } catch (error) {
                this.$toast.error(error.response.data.message)
                this.btnDisabled = false;
            }
        },
    },
};
</script>

<style></style>
