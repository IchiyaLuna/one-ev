<template>
  <!-- Background -->
  <div class="min-height-300 bg-gradient-primary position-absolute w-100"></div>
  <!-- Sidebar -->
  <sidebar>
    <template v-slot:links>
      <sidebar-item
        v-for="data in this.routeData.rootMenu"
        :key="data"
        :link="{
          name: this.routeData[data].name,
          icon: this.routeData[data].icon,
          path: this.routeData[data].path,
        }"
      />
    </template>
  </sidebar>
  <!-- Main box -->
  <main class="main-content position-relative border-radius-lg">
    <!-- Navbar -->
    <navbar
      :navData="{
        currentPath: this.navData.currentPath,
        currentPage: this.navData.currentPage,
      }"
    />
    <!-- End Navbar -->
    <!-- Main Container -->
    <div class="container-fluid py-4">
      <!-- Content router -->
      <router-view></router-view>
      <!-- Footer -->
      <application-footer></application-footer>
    </div>
  </main>
</template>
<script>
  import Sidebar from "@/components/Sidebar.vue";
  import SidebarItem from "@/components/SidebarItem.vue";
  import Navbar from "@/components/Navbar.vue";
  import ApplicationFooter from "@/components/ApplicationFooter.vue";

  const locationInfo = {
    home: ["Home"],
    student: ["학생 관리"],
    timeline: ["학생 관리", "시간표"],
    "consult-history": ["학생 관리", "상담 기록"],
    consult: ["상담 관리"],
    class: ["수업 관리"],
    teacher: ["강사 관리"],
    academy: ["학원 관리"],
  };

  export default {
    inject: ["routeData"],
    components: {
      Sidebar,
      SidebarItem,
      Navbar,
      ApplicationFooter,
    },
    data() {
      return {
        navData: {
          currentPath: locationInfo[this.$route.name],
          currentPage: locationInfo[this.$route.name][0],
        },
      };
    },
    methods: {},
    watch: {
      $route() {
        this.navData.currentPath = locationInfo[this.$route.name];
        this.navData.currentPage = locationInfo[this.$route.name][0];
      },
    },
  };
</script>
<style lang="scss">
  .main-panel {
    height: 630px;
  }
</style>
