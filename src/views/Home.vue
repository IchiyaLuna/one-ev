<template>
  <!-- Main panel -->
  <div class="main-panel d-flex flex-column">
    <!-- Top panel -->
    <div class="row">
      <div class="col-3 mb-4">
        <info-card
          :data="{
            icon: 'fa-solid fa-user-check',
            iconColor: 'bg-gradient-success ',
            title: '출석',
            value: '32',
            delta: '',
            deltaMessage: '',
            isPositive: true,
            isNegative: false,
          }"
        ></info-card>
      </div>
      <div class="col-3 mb-4">
        <info-card
          :data="{
            icon: 'fa-solid fa-user-xmark',
            iconColor: 'bg-gradient-danger ',
            title: '미출석',
            value: '17',
            delta: '',
            deltaMessage: '',
            isPositive: true,
            isNegative: false,
          }"
        ></info-card>
      </div>
      <div class="col-3 mb-4">
        <info-card
          :data="{
            icon: 'fa-solid fa-user-plus',
            iconColor: 'bg-gradient-warning ',
            title: '신규',
            value: '2',
            delta: '',
            deltaMessage: '',
            isPositive: true,
            isNegative: false,
          }"
        ></info-card>
      </div>
      <div class="col-3 mb-4">
        <info-card
          :data="{
            icon: 'fa-solid fa-brake-warning',
            iconColor: 'bg-gradient-danger ',
            title: '상담 필요 학생',
            value: '1',
            delta: '',
            deltaMessage: '',
            isPositive: true,
            isNegative: false,
          }"
        ></info-card>
      </div>
    </div>
    <!-- Bottom panel -->
    <div class="card flex-fill">
      <div class="card-header p-3">
        <div class="nav-wrapper position-relative end-0">
          <ul class="nav nav-pills nav-fill p-1" role="tablist">
            <li class="nav-item">
              <a class="nav-link mb-0 px-0 py-1 active" role="tab">1관</a>
            </li>
            <li class="nav-item">
              <a class="nav-link mb-0 px-0 py-1" role="tab">2관</a>
            </li>
            <li class="nav-item">
              <a class="nav-link mb-0 px-0 py-1" role="tab">3관</a>
            </li>
            <li class="nav-item">
              <a class="nav-link mb-0 px-0 py-1" role="tab">미래관</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="card-body d-flex flex-column pt-0 p-3">
        <div class="d-flex flex-column flex-fill">
          <table class="table table-sm table-borderless text-center h-100">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">1 강의실</th>
                <th scope="col">2 강의실</th>
                <th scope="col">3 강의실</th>
                <th scope="col">4 강의실</th>
                <th scope="col">5 강의실</th>
                <th scope="col">6 강의실</th>
                <th scope="col">7 강의실</th>
              </tr>
            </thead>
            <tbody class="flex-fill">
              <tr>
                <th class="position-relative text-end border" scope="row">
                  <div class="h-100">
                    <div class="position-absolute top-0 end-0 me-2">09:00</div>
                    <div class="position-absolute top-50 end-0 translate-middle me-2">~</div>
                    <div class="position-absolute bottom-0 end-0 me-2">13:00</div>
                  </div>
                </th>
                <td></td>
                <td>
                  <div class="card border h-100">
                    <div class="h6 text-start p-2 pb-0 mb-0">논술 특강</div>
                    <div class="text-start ps-2">알렉스T</div>
                  </div>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div class="card border h-100">
                    <div class="h6 text-start p-2 pb-0 mb-0">보강</div>
                    <div class="text-start ps-2">김보성T</div>
                  </div>
                </td>
                <td></td>
              </tr>

              <tr>
                <th class="position-relative text-end border" scope="row">
                  <div class="h-100">
                    <div class="position-absolute top-0 end-0 me-2">13:30</div>
                    <div class="position-absolute top-50 end-0 translate-middle me-2">~</div>
                    <div class="position-absolute bottom-0 end-0 me-2">17:30</div>
                  </div>
                </th>
                <td>
                  <div class="card border h-100">
                    <div class="h6 text-start p-2 pb-0 mb-0">미적분II</div>
                    <div class="text-start ps-2">김국어T</div>
                  </div>
                </td>
                <td></td>
                <td>
                  <div class="card border h-100">
                    <div class="h6 text-start p-2 pb-0 mb-0">수학</div>
                    <div class="text-start ps-2">한미적T</div>
                  </div>
                </td>
                <td>
                  <div class="card border h-100">
                    <div class="h6 text-start p-2 pb-0 mb-0">수학</div>
                    <div class="text-start ps-2">임확통T</div>
                  </div>
                </td>
                <td></td>
                <td>
                  <div class="card border h-100">
                    <div class="h6 text-start p-2 pb-0 mb-0">수학</div>
                    <div class="text-start ps-2">박기벡T</div>
                  </div>
                </td>
                <td></td>
              </tr>

              <tr>
                <th class="position-relative text-end border" scope="row">
                  <div class="h-100">
                    <div class="position-absolute top-0 end-0 me-2">18:00</div>
                    <div class="position-absolute top-50 end-0 translate-middle me-2">~</div>
                    <div class="position-absolute bottom-0 end-0 me-2">22:00</div>
                  </div>
                </th>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div class="card border h-100">
                    <div class="h6 text-start p-2 pb-0 mb-0">수학</div>
                    <div class="text-start ps-2">김국어T</div>
                  </div>
                </td>
                <td>
                  <div class="card border h-100">
                    <div class="h6 text-start p-2 pb-0 mb-0">국어</div>
                    <div class="text-start ps-2">세종T</div>
                  </div>
                </td>
                <td></td>
                <td>
                  <div class="card border h-100">
                    <div class="h6 text-start p-2 pb-0 mb-0">수학</div>
                    <div class="text-start ps-2">김국어T</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InfoCard from "@/components/InfoCard.vue";
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
    data() {
      return {};
    },
    components: {
      InfoCard,
    },
  };
</script>
