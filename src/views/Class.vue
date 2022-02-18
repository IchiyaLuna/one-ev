<template>
  <!-- Main panel -->
  <div class="row">
    <!-- First panel -->
    <div class="col-4 main-panel">
      <div class="card h-100">
        <!-- Top section -->
        <div class="d-flex p-3">
          <div class="d-flex align-items-center">
            <h5 class="mb-0 text-muted">
              <i class="fa-regular fa-grid-2"></i>
              수업 분류
            </h5>
          </div>

          <div class="flex-fill text-end">
            <button class="text-nowrap btn btn-icon btn-primary mb-0" type="button">
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-grid-2-plus"></i></span>
              <span class="btn-inner--text">분류 추가</span>
            </button>
          </div>
        </div>
        <!-- Table section -->
        <div class="table-responsive">
          <table class="table table-hover dt-center" id="groupTable">
            <thead id="groupTableHeader">
              <tr>
                <th>분류</th>
                <th>수업 수</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>국어</td>
                <td>3</td>
              </tr>
              <tr>
                <td>수학</td>
                <td>7</td>
              </tr>
              <tr>
                <td>과탐</td>
                <td>4</td>
              </tr>
              <tr>
                <td>사탐</td>
                <td>3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Second panel -->
    <div class="col-4 main-panel">
      <div class="card h-100">
        <!-- Top section -->
        <div class="d-flex p-3">
          <div class="input-group flex-nowrap me-3">
            <span class="input-group-text text-body"><i class="fa-duotone fa-magnifying-glass"></i></span>
            <input
              class="form-control column_filter input-border-fix"
              id="class_filter"
              placeholder="수업 검색"
              type="text"
              onfocus="focused(this)"
              onfocusout="defocused(this)"
            />
          </div>

          <div class="flex-fill">
            <button class="text-nowrap btn btn-icon btn-primary mb-0" type="button">
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-chalkboard-user"></i></span>
              <span class="btn-inner--text">수업 추가</span>
            </button>
          </div>
        </div>
        <!-- Table section -->
        <div class="table-responsive">
          <table class="table table-hover dt-center" id="classTable">
            <thead id="classTableHeader">
              <tr>
                <th>수업명</th>
                <th>강사</th>
                <th>인원</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>중학교 국어</td>
                <td>김수학</td>
                <td>3/4</td>
              </tr>
              <tr>
                <td>고등 문학</td>
                <td>김소월</td>
                <td class="text-danger">6/6</td>
              </tr>
              <tr>
                <td>고등 문법</td>
                <td>이방원</td>
                <td class="text-success">0/6</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Third panel -->
    <div class="col-4 d-flex flex-column main-panel">
      <!-- Top panel -->
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-6">
              <label class="form-label">강의명</label>
              <div class="input-group">
                <input
                  id="studentName"
                  name="studentName"
                  class="form-control"
                  type="text"
                  placeholder="강의명"
                  required="required"
                  onfocus="focused(this)"
                  onfocusout="defocused(this)"
                />
              </div>
            </div>
            <div class="col-6">
              <label class="form-label">강사</label>
              <div class="input-group">
                <select class="form-control" name="choices-button" id="choices-button" placeholder="Departure">
                  <option value="Choice 1" selected="">김소월</option>
                  <option value="Choice 2">김수학</option>
                  <option value="Choice 3">이방원</option>
                  <option value="Choice 4">박세종</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <label class="form-label">강의실</label>
              <select class="form-control" name="choices-button" id="choices-button" placeholder="Departure">
                <option value="Choice 1" selected="">1관 - 1강의실</option>
                <option value="Choice 2">1관 - 2강의실</option>
                <option value="Choice 3">1관 - 3강의실</option>
                <option value="Choice 4">1관 - 4강의실</option>
              </select>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="example-number-input" class="form-control-label">정원</label>
                <input class="form-control" type="number" value="6" id="example-number-input" />
              </div>
            </div>
          </div>
          <div class="btn-group float-end" role="group">
            <button class="btn btn-sm btn-icon mb-0 btn-outline-danger" type="button">
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-trash-can"></i></span>
              <span class="btn-inner--text">수업 삭제</span>
            </button>
            <button class="btn btn-sm btn-icon mb-0 bg-gradient-success" type="button">
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-plus"></i></span>
              <span class="btn-inner--text">수업 추가</span>
            </button>
          </div>
        </div>
      </div>
      <!-- Bottom panel -->
      <div class="card mt-3 flex-fill overflow-auto">
        <div class="card-header p-3">
          <h6>수강 학생 목록</h6>
        </div>
        <div class="card-body pt-0 p-3 overflow-auto">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th class="text-secondary text-xxs font-weight-bolder opacity-7">이름</th>
                <th class="text-secondary text-xxs font-weight-bolder opacity-7">비고</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>a</td>
                <td>a</td>
              </tr>
            </tbody>
          </table>
          <div class="bottomPanel d-flex justify-content-end pt-2 pb-2">
            <button class="text-nowrap btn btn-sm btn-icon bg-gradient-success mb-0" type="button">
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-user-plus"></i></span>
              <span class="btn-inner--text">새 학생 추가</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      $("#groupTable").DataTable({
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
      });
      //Header Fix
      $("#groupTableHeader > tr > th").css("background-color", "white");
      $("#groupTableHeader > tr > th").css("position", "sticky");
      $("#groupTableHeader > tr > th").css("top", "0");

      $("#classTable").DataTable({
        paging: false,
        searching: true,
        sDom: "ltr",
        info: false,
        select: true,
        columnDefs: [
          {
            targets: [0, 1, 2],
            className: "dt-center",
          },
        ],
        language: {
          zeroRecords: "검색 결과가 없습니다",
        },
      });
      //Header Fix
      $("#classTableHeader > tr > th").css("background-color", "white");
      $("#classTableHeader > tr > th").css("position", "sticky");
      $("#classTableHeader > tr > th").css("top", "0");

      //Search
      function searchName() {
        $("#classTable").DataTable().column("0").search($("#class_filter").val()).draw();
      }

      $("input.column_filter").on("keyup click", function () {
        searchName();
      });

      $(".bottomPanel").css("background-color", "white");
      $(".bottomPanel").css("position", "sticky");
      $(".bottomPanel").css("bottom", "0");
      $(".bottomPanel").css("z-index", "1020");
    },
  };
</script>
