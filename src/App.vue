<template>
  <router-view />
</template>

<script>
  export default {
    data() {
      return {};
    },
    provide() {
      return {
        appData: {
          version: "v0.0.2",
        },
      };
    },
  };
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");

  html,
  body {
    height: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  .app-screen {
    height: 100%;
  }

  #app {
    font-family: "Noto Sans KR" !important;
  }
</style>
