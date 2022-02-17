<template>
  <!-- Main panel -->
  <div class="row">
    <!-- Left panel -->
    <div class="col-4 main-panel">
      <div class="card h-100">
        <!-- Top section -->
        <div class="d-flex p-3">
          <div class="input-group flex-nowrap me-3">
            <span class="input-group-text text-body"><i class="fa-duotone fa-magnifying-glass"></i></span>
            <input
              class="form-control column_filter input-border-fix"
              id="name_filter"
              placeholder="학생 검색"
              type="text"
              onfocus="focused(this)"
              onfocusout="defocused(this)"
            />
          </div>

          <div class="flex-fill">
            <button class="text-nowrap btn btn-icon btn-primary mb-0" type="button">
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-user-plus"></i></span>
              <span class="btn-inner--text">추가</span>
            </button>
          </div>
        </div>
        <!-- Table section -->
        <div class="student-list table-responsive">
          <table class="table table-hover dt-center" id="studentTable">
            <thead id="studentTableHeader">
              <tr>
                <th>이름</th>
                <th data-type="date" data-format="YYYY/MM/DD">최근 상담일</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Right panel -->
    <div class="col-8 d-flex flex-column main-panel">
      <!-- Top panel -->
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-3">
              <label class="form-label">학생 이름</label>
              <div class="input-group">
                <input
                  id="studentName"
                  name="studentName"
                  class="form-control"
                  type="text"
                  placeholder="이름"
                  required="required"
                  onfocus="focused(this)"
                  onfocusout="defocused(this)"
                />
              </div>
            </div>
            <div class="col-3">
              <label class="form-label">성별</label>
              <div class="input-group">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="genderRadio" id="male" />
                  <label class="custom-control-label" for="male">남</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="genderRadio" id="female" />
                  <label class="custom-control-label" for="female">여</label>
                </div>
              </div>
            </div>
            <div class="col-3">
              <label class="form-label">학생 핸드폰</label>
              <div class="input-group">
                <input
                  id="studentPhone"
                  name="studentPhone"
                  class="form-control"
                  type="text"
                  placeholder="01012345678"
                  required="required"
                  onfocus="focused(this)"
                  onfocusout="defocused(this)"
                />
              </div>
            </div>
            <div class="col-3">
              <label class="form-label">학부모 핸드폰</label>
              <div class="input-group">
                <input
                  id="parentPhone"
                  name="parentPhone"
                  class="form-control"
                  type="text"
                  placeholder="01012345678"
                  required="required"
                  onfocus="focused(this)"
                  onfocusout="defocused(this)"
                />
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-3">
              <label class="form-label">학교</label>
              <div class="input-group">
                <input
                  id="school"
                  name="school"
                  class="form-control"
                  type="text"
                  placeholder="학교"
                  required="required"
                  onfocus="focused(this)"
                  onfocusout="defocused(this)"
                />
              </div>
            </div>
          </div>
          <div class="btn-group float-end" role="group">
            <button class="btn btn-sm btn-icon mb-0 btn-outline-danger" type="button">
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-user-slash"></i></span>
              <span class="btn-inner--text">학생 삭제</span>
            </button>
            <button class="btn btn-sm btn-icon mb-0 bg-gradient-success" type="button">
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-user-plus"></i></span>
              <span class="btn-inner--text">학생 추가</span>
            </button>
          </div>
        </div>
      </div>
      <!-- Bottom panel -->
      <div class="card mt-3 flex-fill overflow-auto">
        <div class="card-header p-3">
          <div class="nav-wrapper position-relative end-0">
            <ul class="nav nav-pills nav-fill p-1" role="tablist">
              <li class="nav-item">
                <router-link class="nav-link mb-0 px-0 py-1 active" to="/student/timeline" role="tab">시간표</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link mb-0 px-0 py-1" to="/student/consult" role="tab">상담 기록</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="card-body pb-0 p-3 overflow-auto">
          <router-view name="studentRouter"></router-view>
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

      $("#studentTable").DataTable({
        paging: false,
        searching: true,
        sDom: "ltr",
        info: false,
        select: true,
        columnDefs: [
          {
            targets: [0, 1],
            className: "dt-center",
          },
        ],
        language: {
          zeroRecords: "검색 결과가 없습니다",
        },
      });
      //Header Fix
      $("#studentTableHeader > tr > th").css("background-color", "white");
      $("#studentTableHeader > tr > th").css("position", "sticky");
      $("#studentTableHeader > tr > th").css("top", "0");

      //Search
      function searchName() {
        $("#studentTable").DataTable().column("0").search($("#name_filter").val()).draw();
      }

      $("input.column_filter").on("keyup click", function () {
        searchName();
      });
    },
  };
</script>

<style>
  .main-panel {
    height: 630px;
  }

  tbody tr.selected {
    color: rgb(27, 27, 27) !important;
    background-color: #e1ecf7 !important;
  }

  .h-40 {
    height: 40%;
  }
</style>
