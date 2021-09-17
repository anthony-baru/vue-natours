import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

class AuthService {
  async login(user) {
    try {
      const { data: loginResponse } = await axios.post(
        API_URL + "/users/signin",
        {
          email: user.email,
          password: user.password,
        }
      );

      console.log("loginResponse.data", loginResponse);

      if (loginResponse.token) {
        window.localStorage.setItem("auth", JSON.stringify(loginResponse.data));
      }

      return Promise.resolve(loginResponse.data);
    } catch (error) {
      console.table("errorR", error);
      return Promise.reject(error);
    }
  }

  logout() {
    localStorage.removeItem("auth");
  }

  async register(user) {
    const { data: regRes } = await axios.post(API_URL + "/users/signup", {
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
}

export default new AuthService();
