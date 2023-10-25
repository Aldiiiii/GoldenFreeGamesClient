import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

const toast = useToast();

export const useGgStore = defineStore("gg", {
  state: () => ({
    baseUrl: "http://localhost:3000",
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    async register(data) {
      try {
        const signUp = await axios.post(this.baseUrl + "/register", data);
        this.router.push("/login")
        toast.success(`Hello user ${signUp.data.email}, you can login now`);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    async googleLogin(response) {
      try {
        const login = await axios.post(
          this.baseUrl + "/login-google",
          {},
          {
            headers: {
              google_token: response.credential,
            },
          }
        );
        localStorage.access_token = login.data.access_token;
        this.router.push("/");
        toast.success("Welcome to GG");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    async getLogin(data) {
      try {
        const user = await axios.post(this.baseUrl + "/login", data);

        localStorage.access_token = user.data.access_token;
        this.router.push("/");
        toast.success("Welcome to GG");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    getLogout() {
      if (localStorage.access_token) {
        localStorage.clear();
        this.router.push("/login");
        toast.success("See you later champ");
      }
    },
  },
});
