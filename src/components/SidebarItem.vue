<template>
  <li class="nav-item">
    <router-link class="nav-link" :to="props.path" draggable="false">
      <div class="icon icon-shape icon-sm text-center me-2 top-0 d-flex align-items-center justify-content-center">
        <i class="text-primary text-lg top-0 opacity-10" :class="props.icon"></i>
      </div>
      <span class="nav-link-text">{{ props.name }}</span>
    </router-link>
  </li>
</template>
<script setup>
  const props = defineProps({
    name: String,
    path: String,
    icon: String,
  });
</script>
