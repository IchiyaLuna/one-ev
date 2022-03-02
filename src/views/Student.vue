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
        <div class="card-header p-3 pb-0">
          <nav-slider-router :items="this.tabs" />
        </div>
        <div class="card-body pb-0 p-3 overflow-auto">
          <router-view name="studentRouter"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavSliderRouter from "@/components/NavSliderRouter.vue";

  export default {
    components: {
      NavSliderRouter,
    },
    data() {
      return {
        tabs: [
          {
            text: "시간표",
            link: "/student/timeline",
          },
          {
            text: "상담 기록",
            link: "/student/consult-history",
          },
        ],
      };
    },
    mounted() {
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
  tbody tr.selected {
    color: rgb(27, 27, 27) !important;
    background-color: #e1ecf7 !important;
  }

  .h-40 {
    height: 40%;
  }
</style>
