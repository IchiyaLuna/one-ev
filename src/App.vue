<template>
  <router-view />
</template>

<script>
  export default {
    provide: {
      appData: {
        version: "v0.0.2",
      },
    },
  };
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");

  @font-face {
    font-family: "GmarketSansMedium";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff") format("woff");
    font-weight: normal;
    font-style: normal;
  }

  html,
  body {
    height: 100%;
  }

  #app {
    font-family: "Noto Sans KR" !important;
  }
</style>
