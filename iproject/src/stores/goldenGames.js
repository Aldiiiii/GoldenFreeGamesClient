import { defineStore } from "pinia";
import axios from "axios";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const toast = useToast()

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
        toast.success(`Hello user ${signUp.data.email}, you can login now`)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    },
  },
});
