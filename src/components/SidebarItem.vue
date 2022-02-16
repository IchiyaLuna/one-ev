<template>
  <li class="nav-item">
    <router-link class="nav-link" :to="link.path">
      <div class="icon icon-shape icon-sm text-center me-2 top-0 d-flex align-items-center justify-content-center">
        <i :class="link.icon"></i>
      </div>
      <span class="nav-link-text">{{ link.name }}</span>
    </router-link>
  </li>
</template>
<script>
  export default {
    name: "sidebar-item",
    props: {
      link: {
        type: Object,
        default: () => {
          return {
            name: "",
            path: "",
            children: [],
          };
        },
        description: "Sidebar link",
      },
    },
  };
</script>
