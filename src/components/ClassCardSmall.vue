<template>
  <div class="card border h-100" :draggable="this.draggable">
    <div class="text-sm text-center font-weight-bold">{{ this.data.class }}</div>
    <div class="text-sm text-center">
      {{ this.data.teacher + "T" }}
    </div>
  </div>
</template>
<script>
  export default {
    name: "class-card-small",
    props: {
      data: {
        type: Object,
        default: () => {
          return {
            class: "",
            teacher: "",
            draggable: true,
          };
        },
        description: "Class card data",
      },
      draggable: Boolean,
    },
  };
</script>
<style lang="scss">
  .text-sm {
    font-size: 0.5rem !important;
  }
</style>
