<template>
  <div class="card border h-100" draggable="true">
    <div class="h6 text-start p-2 pb-0 mb-0">{{ this.data.class }}</div>
    <div class="text-start ps-2">{{ this.data.teacher }}</div>
  </div>
</template>
<script>
  export default {
    name: "class-card",
    props: {
      data: {
        type: Object,
        default: () => {
          return {
            class: "",
            teacher: "",
          };
        },
        description: "Class card data",
      },
    },
  };
</script>
