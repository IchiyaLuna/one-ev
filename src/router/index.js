import { createRouter, createWebHashHistory } from "vue-router";

import MainLayout from "@/layouts/MainLayout.vue";

import Home from "@/views/Home.vue";
import Student from "@/views/Student.vue";
import Consult from "@/views/Consult.vue";
import Class from "@/views/Class.vue";
import Teacher from "@/views/Teacher.vue";
import Academy from "@/views/Academy.vue";

import Timeline from "@/components/Timeline.vue";
import ConsultHistory from "@/components/ConsultHistory.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
    component: MainLayout,
    children: [
      {
        path: "/home",
        name: "Home",
        icon: "fa-regular fa-house",
        components: { default: Home },
      },
      {
        path: "/student",
        name: "학생 관리",
        icon: "fa-regular fa-address-card",
        redirect: "/student/timeline",
        components: { default: Student },
        children: [
          {
            path: "/student/timeline",
            name: "시간표",
            components: { studentRouter: Timeline },
          },
          {
            path: "/student/consult-history",
            name: "상담 기록",
            components: { studentRouter: ConsultHistory },
          },
        ],
      },
      {
        path: "/consult",
        name: "상담 관리",
        icon: "fa-regular fa-clipboard-check",
        components: { default: Consult },
      },
      {
        path: "/class",
        name: "수업 관리",
        icon: "fa-regular fa-screen-users",
        components: { default: Class },
      },
      {
        path: "/teacher",
        name: "강사 관리",
        icon: "fa-regular fa-chalkboard-user",
        components: { default: Teacher },
      },
      {
        path: "/academy",
        name: "학원 관리",
        icon: "fa-regular fa-school",
        components: { default: Academy },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

export { routes, router };
