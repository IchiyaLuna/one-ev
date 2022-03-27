<template>
  <div class="card border container-fluid h-100 p-2" draggable="true">
    <div class="text-start font-weight-bold">{{ this.data.name }}</div>
    <div class="text-start border-bottom mb-1">
      {{ this.data.teacher + "T" }}
    </div>

    <div class="row mx-0 px-2">
      <div class="col-6 px-0">김철수</div>
      <div class="col-6 px-0">김철수</div>
      <div class="col-6 px-0">김철수</div>
      <div class="col-6 px-0">김철수</div>
      <div class="col-6 px-0">김철수</div>
      <div class="col-6 px-0">김철수</div>
    </div>
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
