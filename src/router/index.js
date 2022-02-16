import { createRouter, createWebHashHistory } from "vue-router";

import MainLayout from "@/layouts/MainLayout.vue";

import Home from "@/views/Home.vue";
import Student from "@/views/Student.vue";
import About from "@/views/About.vue";

import Timeline from "@/components/Timeline.vue";
import Consult from "@/components/Consult.vue";

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
            path: "/student/consult",
            name: "consult",
            components: { studentRouter: Consult },
          },
        ],
      },
      {
        path: "/about",
        name: "about",
        components: { default: About },
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
