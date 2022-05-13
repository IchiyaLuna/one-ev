<template>
  <!-- Background -->
  <div class="min-height-300 bg-gradient-primary position-absolute w-100"></div>
  <!-- Sidebar -->
  <sidebar>
    <template v-slot:links>
      <sidebar-item v-for="data in routeData" :key="data.name" :name="data.name" :icon="data.icon" :path="data.path" />
    </template>
  </sidebar>
  <!-- Main box -->
  <main class="main-content position-relative d-flex flex-column h-100 border-radius-lg">
    <!-- Navbar -->
    <navbar :currentPath="route.matched" />
    <!-- End Navbar -->
    <!-- Main Container -->
    <div class="container-fluid d-flex flex-column flex-fill pb-3">
      <suspense>
        <!-- Content router -->

        <router-view />

        <!-- Loading state -->
        <template #fallback>
          <Vue3Lottie :animationData="LoadingPlaneJSON" :height="800" :width="600" />
        </template>
      </suspense>
      <!-- Footer -->
      <application-footer></application-footer>
    </div>
  </main>
</template>
<script setup>
  import { useRoute } from "vue-router";
  import { routes } from "../router/index";
  import { Vue3Lottie } from "vue3-lottie";

  import Sidebar from "../components/Sidebar.vue";
  import SidebarItem from "../components/SidebarItem.vue";
  import Navbar from "../components/Navbar.vue";
  import ApplicationFooter from "../components/ApplicationFooter.vue";

  import "vue3-lottie/dist/style.css";

  const LoadingPlaneJSON = require("../assets/lottie/loading_plane.json");

  const route = useRoute();
  const routeData = routes[0].children;
</script>
<style lang="scss">
  .main-panel {
    height: 720px;
  }
</style>
