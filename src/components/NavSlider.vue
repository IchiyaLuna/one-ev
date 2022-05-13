<template>
  <div class="nav-wrapper flex-fill position-relative end-0">
    <ul class="nav nav-pills nav-fill p-1" role="tablist">
      <li class="nav-item" v-for="nav in navs" :key="nav.id">
        <a @click="selected = nav.id" class="nav-link mb-0 px-0 py-1" :class="nav.id === selected ? 'bg-white' : ''" role="tab">
          {{ nav.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, watch } from "vue";

  const selected = ref(0);
  const props = defineProps({
    navs: {
      type: Array,
      required: true,
    },
  });

  selected.value = props.navs.at(0).id;

  const emit = defineEmits(["selected"]);

  // watch works directly on a ref
  watch(selected, async (newSelected, oldSelected) => {
    console.log(newSelected);
  });

  emit("selected", selected);
</script>
