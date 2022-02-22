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
        name: "home",
        components: { default: Home },
      },
      {
        path: "/student",
        name: "student",
        redirect: "/student/timeline",
        components: { default: Student },
        children: [
          {
            path: "/student/timeline",
            name: "timeline",
            components: { studentRouter: Timeline },
          },
          {
            path: "/student/consult-history",
            name: "consult-history",
            components: { studentRouter: ConsultHistory },
          },
        ],
      },
      {
        path: "/consult",
        name: "consult",
        components: { default: Consult }, 

      },
      {
        path: "/class",
        name: "class",
        components: { default: Class },
      },
      {
        path: "/teacher",
        name: "teacher",
        components: { default: Teacher },
      },
      {
        path: "/academy",
        name: "academy",
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

export default router;
