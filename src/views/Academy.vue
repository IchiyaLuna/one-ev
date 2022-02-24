<template>
  <div class="main-panel d-flex flex-column">
    <div class="card shadow-lg">
      <div class="card-body p-3">
        <div class="row gx-4">
          <div class="col-auto">
            <div class="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-md">
              <i class="fa-solid fa-buildings big-icon border-radius-lg text-white"></i>
            </div>
          </div>
          <div class="col-auto my-auto">
            <div class="h-100">
              <h5 class="mb-1">학원 이름</h5>
              <p class="mb-0 font-weight-bold text-sm">학원 전화번호</p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
            <div class="nav-wrapper position-relative end-0">
              <ul class="nav nav-pills nav-fill p-1 flex-row" role="tablist">
                <li class="nav-item">
                  <router-link class="nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center active" to="" role="tab">
                    <i class="ni ni-app"></i>
                    <span class="ms-2">App</span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center" to="" role="tab">
                    <i class="ni ni-app"></i>
                    <span class="ms-2">App</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-4 flex-fill">
      <div class="card-header">
        <h5>Basic Info</h5>
      </div>
      <div class="card-body pt-0">
        <div class="row">
          <div class="col-6">
            <label class="form-label">First Name</label>
            <div class="input-group">
              <input
                id="firstName"
                name="firstName"
                class="form-control"
                type="text"
                placeholder="Alec"
                required="required"
                onfocus="focused(this)"
                onfocusout="defocused(this)"
              />
            </div>
          </div>
          <div class="col-6">
            <label class="form-label">Last Name</label>
            <div class="input-group">
              <input
                id="lastName"
                name="lastName"
                class="form-control"
                type="text"
                placeholder="Thompson"
                required="required"
                onfocus="focused(this)"
                onfocusout="defocused(this)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    mounted() {
      var total = document.querySelectorAll(".nav-pills");
      function initNavs() {
        total.forEach(function (l) {
          var s = document.createElement("div"),
            t = l.querySelector("li:first-child .nav-link").cloneNode();
          (t.innerHTML = "-"), s.classList.add("moving-tab", "position-absolute", "nav-link"), s.appendChild(t), l.appendChild(s);
          l.getElementsByTagName("li").length;
          (s.style.padding = "0px"),
            (s.style.width = l.querySelector("li:nth-child(1)").offsetWidth + "px"),
            (s.style.transform = "translate3d(0px, 0px, 0px)"),
            (s.style.transition = ".5s ease"),
            (l.onmouseover = function (e) {
              let t = getEventTarget(e),
                i = t.closest("li");
              if (i) {
                let a = Array.from(i.closest("ul").children),
                  n = a.indexOf(i) + 1;
                l.querySelector("li:nth-child(" + n + ") .nav-link").onclick = function () {
                  s = l.querySelector(".moving-tab");
                  let e = 0;
                  if (l.classList.contains("flex-column")) {
                    for (var t = 1; t <= a.indexOf(i); t++) e += l.querySelector("li:nth-child(" + t + ")").offsetHeight;
                    (s.style.transform = "translate3d(0px," + e + "px, 0px)"),
                      (s.style.height = l.querySelector("li:nth-child(" + t + ")").offsetHeight);
                  } else {
                    for (t = 1; t <= a.indexOf(i); t++) e += l.querySelector("li:nth-child(" + t + ")").offsetWidth;
                    (s.style.transform = "translate3d(" + e + "px, 0px, 0px)"),
                      (s.style.width = l.querySelector("li:nth-child(" + n + ")").offsetWidth + "px");
                  }
                };
              }
            });
        });
      }
      function getEventTarget(e) {
        return (e = e || window.event).target || e.srcElement;
      }
      initNavs();
    },
  };
</script>
<style>
  .big-icon {
    font-size: 1.5rem !important;
  }
</style>
