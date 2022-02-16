<template>
  <!-- Background -->
  <div class="min-height-300 bg-primary position-absolute w-100"></div>
  <!-- Sidebar -->
  <sidebar>
    <template v-slot:links>
      <sidebar-item
        :link="{
          name: 'Home',
          icon: 'fa-light fa-house text-primary text-sm top-0 opacity-10',
          path: '/home',
        }"
      />
      <sidebar-item
        :link="{
          name: '학생 관리',
          icon: 'fa-light fa-address-card text-primary text-sm top-0 opacity-10',
          path: '/student',
        }"
      />
      <sidebar-item
        :link="{
          name: 'About',
          icon: 'ni ni-tv-2 text-primary text-sm opacity-10',
          path: '/about',
        }"
      />
      <sidebar-item
        :link="{
          name: 'About',
          icon: 'ni ni-tv-2 text-primary text-sm opacity-10',
          path: '/about',
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
    about: ["About"],
    home: ["Home"],
    student: ["학생 관리"],
    timeline: ["학생 관리", "시간표"],
    consult: ["학생 관리", "상담 기록"],
  };

  export default {
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
    watch: {
      $route() {
        this.navData.currentPath = locationInfo[this.$route.name];
        this.navData.currentPage = locationInfo[this.$route.name][0];
      },
    },
  };
</script>
