<template>
    <div class="user-view__content">
        <div class="user-view__form-container">
            <h2 class="heading-secondary ma-bt-md">Your account settings</h2>
            <form
                class="form form-user-data"
                ref="account-settings"
                enctype="multipart/form-data"
                @submit.prevent="changeAccountSettings"
            >
                <div class="form__group">
                    <label class="form__label" for="name">Name</label>
                    <input
                        class="form__input"
                        id="name"
                        type="text"
                        value="Jonas Schmedtmann"
                        required="required"
                        v-model="name"
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
                        v-model="email"
                    />
                </div>
                <div class="form__group form__photo-upload">
                    <label style="display: block" class="form__label" for="email">
                        Choose new photo</label
                    >
                    <div class="preview">
                        <img v-if="url" :src="url" class="form__user-photo" alt="profile photo" />
                    </div>
                    <input type="file" name="photo" ref="photo" @change="onFileChange" />
                </div>
                <div class="form__group right">
                    <button class="btn btn--small btn--green" :disabled="btnDisabled">
                        Save settings
                    </button>
                </div>
            </form>
        </div>
        <div class="line">&nbsp;</div>
        <div class="user-view__form-container">
            <h2 class="heading-secondary ma-bt-md">Password change</h2>
            <form
                class="form form-user-settings"
                ref="passwordupdate"
                @submit.prevent="updatePassword"
            >
                <div class="form__group">
                    <label class="form__label" for="password-current">Current password</label>
                    <input
                        v-model="oldPassword"
                        name="oldPassword"
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
                        v-model="newPassword"
                        name="newPassword"
                        class="form__input"
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        required="required"
                        minlength="8"
                    />
                </div>
                <div class="form__group ma-bt-lg">
                    <label class="form__label" for="password-confirm">Confirm password</label>
                    <input
                        v-model="newPasswordConfirm"
                        name="newPasswordConfirm"
                        class="form__input"
                        id="password-confirm"
                        type="password"
                        placeholder="••••••••"
                        required="required"
                        minlength="8"
                    />
                </div>
                <div class="form__group right">
                    <button class="btn btn--small btn--green" :disabled="btnDisabled">
                        Save password
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "",
            email: "",
            url: "/img/users/user-1.jpg",
            photo: "",
            oldPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
            btnDisabled: false,
        };
    },
    mounted() {
        this.name = this.$store.state.authManage.auth.user.name;
        this.email = this.$store.state.authManage.auth.user.email;
        this.url =
            process.env.VUE_APP_API_BASE_URL +
            "/img/users/" +
            this.$store.state.authManage.auth.user.photo;
    },
    computed: {},
    methods: {
        onFileChange(e) {
            console.log("onfileChangeEvent", this.$refs.photo.files);
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
            this.photo = this.$refs.photo.files[0];
        },
        async updatePassword() {
            this.btnDisabled = true;
            try {
                await this.$store.dispatch("authManage/updatePassword", {
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword,
                    newPasswordConfirm: this.newPasswordConfirm,
                });
                this.$store.commit("alert/showAlert", {
                    type: "success",
                    message: "Password reset successfully.",
                });
                console.log(this.$refs);
                // this.$refs.passwordupdate.reset();
                this.oldPassword = "";
                this.newPassword = "";
                this.newPasswordConfirm = "";
                this.btnDisabled = false;
            } catch (error) {
                console.log(error);
                this.$store.commit("alert/showAlert", {
                    type: "error",
                    message: error.response,
                });
                this.btnDisabled = false;
            }
        },
        async changeAccountSettings() {
            this.btnDisabled = true;
            try {
                let formData = new FormData();
                formData.append("photo", this.photo);
                formData.append("name", this.name);
                formData.append("email", this.email);

                await this.$store.dispatch("authManage/changeAccountSettings", formData);
                this.$store.commit("alert/showAlert", {
                    type: "success",
                    message: "Information saved successfully.",
                });
                this.btnDisabled = false;
            } catch (error) {
                this.$store.commit("alert/showAlert", {
                    type: "error",
                    message: error.response.data.message,
                });
                this.btnDisabled = false;
            }
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

<style>
</style>