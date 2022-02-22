<template>
  <router-view />
</template>

<script>
  export default {
    data() {
      return {
        routeData: {
          rootMenu: ["home", "student", "consult", "class", "teacher", "academy"],
          home: {
            name: "Home",
            icon: "fa-regular fa-house ",
            path: "/home",
          },
          student: {
            name: "학생 관리",
            icon: "fa-regular fa-address-card",
            path: "/student",
            children: [
              {
                path: "timeline",
              },
              {
                path: "/consult-history",
              },
            ],
          },
          consult: {
            name: "상담 관리",
            icon:"fa-solid fa-clipboard-check",
            path:"/consult",
          },
          class: {
            name: "수업 관리",
            icon: "fa-regular fa-screen-users",
            path: "/class",
          },
          teacher: {
            name: "강사 관리",
            icon: "fa-regular fa-chalkboard-user",
            path: "/teacher",
          },
          academy: {
            name: "학원 관리",
            icon: "fa-regular fa-school",
            path: "/academy",
          },
        },
      };
    },
    provide() {
      return {
        appData: {
          version: "v0.0.2",
        },
        routeData: this.routeData,
      };
    },
  };
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");

  html,
  body {
    height: 100%;
  }

  #app {
    font-family: "Noto Sans KR" !important;
  }
</style>
