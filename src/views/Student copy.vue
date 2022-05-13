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
            <input class="form-control" placeholder="학생 검색" onfocus="focused(this)" onfocusout="defocused(this)" />
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
          <table class="table table-hover text-center">
            <thead>
              <tr>
                <th class="p-3">이름<i class="ms-2 fa-duotone fa-arrow-down-arrow-up"></i></th>
                <th class="p-3">최근 상담일<i class="ms-2 fa-duotone fa-arrow-down-arrow-up"></i></th>
              </tr>
            </thead>
            <tbody></tbody>
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
                <input class="form-control" type="text" placeholder="이름" />
              </div>
            </div>
            <div class="col-3">
              <label class="form-label">성별</label>
              <div class="input-group">
                <div class="form-check form-check-inline">
                  <input type="radio" value="0" />
                  <label class="custom-control-label" for="male">남</label>
                </div>
                <div class="form-check form-check-inline">
                  <input type="radio" value="1" />
                  <label class="custom-control-label" for="female">여</label>
                </div>
              </div>
            </div>
            <div class="col-3">
              <label class="form-label">학생 핸드폰</label>
              <div class="input-group">
                <input class="form-control" type="text" placeholder="010-0000-0000" />
              </div>
            </div>
            <div class="col-3">
              <label class="form-label">학부모 핸드폰</label>
              <div class="input-group">
                <input class="form-control" type="text" placeholder="010-0000-0000" />
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-3">
              <label class="form-label">학교</label>
              <div class="input-group">
                <input class="form-control" type="text" placeholder="학교" />
              </div>
            </div>
          </div>
          <div class="btn-group float-end" role="group">
            <button class="btn btn-sm btn-icon mb-0 btn-outline-danger" type="button">
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-user-slash"></i></span>
              <span class="btn-inner--text">{{}}</span>
            </button>
            <button class="btn btn-sm btn-icon mb-0 bg-gradient-success" type="button">
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-user-plus"></i></span>
              <span class="btn-inner--text">{{}}</span>
            </button>
          </div>
        </div>
      </div>
      <!-- Bottom panel -->
      <div class="card mt-3 flex-fill overflow-auto">
        <div class="card-header p-3 pb-0">
          <div class="nav-wrapper position-relative end-0">
            <ul class="nav nav-pills nav-fill p-1" role="tablist">
              <li class="nav-item">
                <router-link to="/student/timeline" class="nav-link mb-0 px-0 py-1 active" role="tab">시간표</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/student/consult-history" class="nav-link mb-0 px-0 py-1" role="tab">상담 기록</router-link>
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

<script setup>
  import { ref, watch } from "vue";
  import { initNavs } from "../plugins/NavPlus";
  import { useAuthStore } from "../stores/auth";
  import { useStudentStore } from "../stores/student";

  /////////////////

  const auth = useAuthStore();
  const student = useStudentStore();

  const searchKeyword = ref("");

  let students = [];
  let currentStudent = {};

  /////////////////

  /////////////////

  watch(searchKeyword, (newKeyword, oldKeyword) => {
    (students = student.getStudentByName), newKeyword;
  });

  initNavs(document);

  /////////////////
  student.fetchStudent(auth.getApiKey);
  students = student.getStudent;
</script>

<style>
  tbody tr.selected {
    color: rgb(27, 27, 27) !important;
    background-color: #e1ecf7 !important;
  }

  .table {
    width: 100% !important;
  }

  .h-40 {
    height: 40%;
  }
</style>
