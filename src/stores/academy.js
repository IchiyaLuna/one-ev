import { defineStore } from "pinia";
import axios from "axios";

export const useAcademyStore = defineStore("academy", {
  state: () => {
    return {
      academy: {
        id: "",
        name: "",
        tel: "",
        address: "",
      },
      hall: [],
      room: [],
    };
  },
  getters: {
    getAcademy: (state) => {
      return state.academy;
    },
    getHall: (state) => {
      return state.hall;
    },
    getRoom: (state) => {
      return state.room;
    },
  },
  actions: {
    async fetchAcademy(API_KEY) {
      const response = await axios.get("https://oneapi.lunabi.co.kr/academy", {
        params: {
          key: API_KEY,
        },
      });
      this.academy = response.data.academy;
    },
    async fetchHall(API_KEY) {
      const response = await axios.get("https://oneapi.lunabi.co.kr/hall", {
        params: {
          key: API_KEY,
        },
      });
      this.hall = response.data.hall;
    },
    async fetchRoom(API_KEY) {
      const response = await axios.get("https://oneapi.lunabi.co.kr/room", {
        params: {
          key: API_KEY,
        },
      });
      this.hall = response.data.room;
    },
  },
});
