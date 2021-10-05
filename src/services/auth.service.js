import axios from "axios";
import authHeader from "./auth-header";

class AuthService {
    async login(user) {
        const { data: loginResponse } = await axios.post("/users/signin", {
            email: user.email,
            password: user.password,
        });

        console.log("loginResponse.data", loginResponse);

        if (loginResponse.token) {
            window.localStorage.setItem("auth", JSON.stringify(loginResponse.data));
        }

        return loginResponse.data;
    }

    logout() {
        localStorage.removeItem("auth");
    }

    async register(user) {
        const { data: regRes } = await axios.post("/users/signup", {
            name: user.name,
            email: user.email,
            password: user.password,
            passwordConfirm: user.passwordConfirm,
        });
        console.log("regRes", regRes);
        if (regRes.token) {
            window.localStorage.setItem("auth", JSON.stringify(regRes.data));
        }
        return regRes.data;
    }

    async updatePassword(pwd) {
        const { data: updatePwdRes } = await axios.patch(
             "/users/update-password",
            {
                oldPassword: pwd.oldPassword,
                newPassword: pwd.newPassword,
                newPasswordConfirm: pwd.newPasswordConfirm,
            },
            { headers: authHeader() }
        );
        console.log("updatePwdRes", updatePwdRes);
        if (updatePwdRes.token) {
            window.localStorage.setItem("auth", JSON.stringify(updatePwdRes.data));
        }
        return updatePwdRes;
    }

    async changeAccountSettings(payload) {
        const { data: changeAccountSettings } = await axios.patch(
         "/users/update-me",
            payload,
            { headers: authHeader() }
        );
        window.localStorage.setItem("auth", JSON.stringify(changeAccountSettings.data));
        return changeAccountSettings.data;
    }
}

export default new AuthService();
