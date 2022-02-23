<template>
  <div class="card">
    <div class="card-body p-3">
      <div class="row">
        <!-- Data area -->
        <div class="col-8">
          <div class="numbers">
            <p class="text-sm mb-0 text-uppercase font-weight-bold">{{ data.title }}</p>
            <h5 class="font-weight-bolder">{{ data.value }}</h5>
            <p class="mb-0">
              <span
                class="text-sm font-weight-bolder"
                :class="{
                  'text-success': data.isPositive,
                  'text-danger': data.isNegative,
                }"
              >
                {{ data.delta }}
              </span>
              {{ data.deltaMessage }}
            </p>
          </div>
        </div>
        <!-- Icon area -->
        <div class="col-4 text-end">
          <div class="icon icon-shape shadow-primary text-center rounded-circle" :class="data.iconColor">
            <i class="text-lg opacity-10" :class="[data.icon]" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "card",
    props: {
      data: {
        type: Object,
        default: () => {
          return {
            icon: "",
            iconColor: "",
            title: "",
            value: "",
            isPositive: false,
            isNegative: false,
            delta: "",
            deltaMessage: "",
          };
        },
        description: "Card data",
      },
    },
  };
</script>
