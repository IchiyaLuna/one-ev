import { defineStore } from "pinia";
import axios from "axios";

export const useStudentStore = defineStore("student", {
  state: () => {
    return {
      fetchedStudent: [],
    };
  },
  getters: {
    getStudent: (state) => {
      return state.fetchedStudent;
    },
    getStudentById: (state) => {
      return (id) => state.fetchedStudent.filter((student) => student.id == id);
    },
    getStudentByName: (state) => {
      return (name) => state.fetchedStudent.filter((student) => student.name == name);
    },
  },
  actions: {
    async fetchStudent(API_KEY) {
      console.log(API_KEY);
      const response = await axios.get("https://oneapi.lunabi.co.kr/student", {
        params: {
          key: API_KEY,
        },
      });
      this.fetchedStudent = response.data.student;
    },
  },
});
