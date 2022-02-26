<template>
  <div class="nav-wrapper position-relative end-0">
    <ul class="nav nav-pills nav-fill p-1" role="tablist">
      <li class="nav-item" v-for="(item, index) in this.items" :key="item.text">
        <router-link class="nav-link mb-0 px-0 py-1" :class="index === 0 ? 'active' : ''" :to="item.link" role="tab">
          {{ item.text }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { initNavs } from "@/plugins/NavPlus.js";

  export default {
    props: {
      items: Array,
    },
    mounted() {
      initNavs();
    },
  };
</script>
