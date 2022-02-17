<template>
  <aside class="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4" id="sidenav-main">
    <!-- Branding -->
    <div class="sidenav-header">
      <div class="navbar-brand m-0 app-logo text-center">
        <i class="me-2 h-100 fa-duotone fa-circle-dashed"></i>
        <span class="font-weight-bold">ONE Dashboard</span>
      </div>
    </div>
    <!-- Partition -->
    <hr class="horizontal dark mt-0" />
    <!-- Items -->
    <div class="collapse navbar-collapse w-auto h-auto h-100" id="sidenav-collapse-main">
      <ul class="navbar-nav">
        <slot name="links"></slot>
      </ul>
    </div>
    <!-- Footer -->
    <div class="sidenav-footer mx-3 my-3"></div>
  </aside>
</template>

<script>
  export default {};
</script>

<style>
  .app-logo {
    font-size: 1.35rem !important;
  }
</style>
