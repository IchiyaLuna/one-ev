import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    API_KEY: "",
  }),
  getters: {
    getApiKey(state) {
      return state.API_KEY;
    },
  },
  actions: {
    async login(id, pass) {
      const response = await axios.get("https://oneapi.lunabi.co.kr/account", {
        params: {
          id: id,
          pass: pass,
        },
      });
      if (response.data.api.key_length != 32) throw "Invaild API Code response";
      else this.API_KEY = response.data.api.key;
      return 0;
    },
  },
});
