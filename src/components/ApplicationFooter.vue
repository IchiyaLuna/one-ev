<template>
  <footer class="footer pt-3">
    <div class="container-fluid">
      <div class="row align-items-center justify-content-lg-between">
        <div class="col-lg-6 mb-lg-0 mb-4">
          <div class="copyright text-center text-sm text-muted text-lg-start">
            © {{ year }} , made with <i class="fa-regular fa-hand-holding-heart"></i> by LunaBi
          </div>
        </div>
        <div class="col-lg-6">
          <ul class="nav nav-footer justify-content-center justify-content-lg-end">
            <li class="nav-item">
              <span>{{ version || "unknown version" }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    inject: ["appData"],
    data() {
      return {
        version: this.appData.version,
        year: new Date().getFullYear(),
      };
    },
  };
</script>
