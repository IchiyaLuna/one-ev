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
              placeholder="강사 검색"
              type="text"
              onfocus="focused(this)"
              onfocusout="defocused(this)"
            />
          </div>

          <div class="flex-fill">
            <button @click="startAdd" class="text-nowrap btn btn-icon btn-primary mb-0" type="button">
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-user-plus"></i></span>
              <span class="btn-inner--text">추가</span>
            </button>
          </div>
        </div>
        <!-- Table section -->
        <div class="table-responsive">
          <table class="table table-hover dt-center" id="teacherTable">
            <thead id="teacherTableHeader">
              <tr>
                <th>id</th>
                <th>이름</th>
                <th>담당 수업 수</th>
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
              <label class="form-label">강사 이름</label>
              <div class="input-group">
                <input
                  :disabled="this.currentTeacher.id == 0 ? true : false"
                  v-model="this.currentTeacher.name"
                  class="form-control"
                  type="text"
                  placeholder="이름"
                  onfocus="focused(this)"
                  onfocusout="defocused(this)"
                />
              </div>
            </div>
            <div class="col-3"></div>
            <div class="col-3"></div>
            <div class="col-3"></div>
          </div>
          <div class="btn-group float-end" role="group">
            <button
              @click="switchRedBtn"
              :disabled="this.currentTeacher.id == 0 ? true : false"
              class="btn btn-sm btn-icon mb-0 btn-outline-danger"
              type="button"
            >
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-user-slash"></i></span>
              <span class="btn-inner--text">{{ this.currentTeacher.id <= 0 ? "추가 취소" : "강사 삭제" }}</span>
            </button>
            <button
              @click="switchGreenBtn"
              :disabled="this.currentTeacher.id == 0 ? true : false"
              class="btn btn-sm btn-icon mb-0 bg-gradient-success"
              type="button"
            >
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-user-plus"></i></span>
              <span class="btn-inner--text">{{ this.currentTeacher.id <= 0 ? "강사 추가" : "강사 수정" }}</span>
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
                <router-link class="nav-link mb-0 px-0 py-1" to="/student/consult-history" role="tab">수강생</router-link>
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
  import axios from "axios";
  import Swal from "../plugins/sweetalert2";

  export default {
    inject: ["API_KEY"],
    components: {},
    data() {
      return {
        fetchedTeacher: [],
        teacher: [],
        currentTeacher: {
          id: 0,
          name: "",
        },
        currentTeacherId: 0,
        teacherTable: null,
        tempClass: [],
      };
    },
    mounted() {
      let view = this;
      this.getTeacher(view);

      this.teacherTable = $("#teacherTable").DataTable({
        paging: false,
        searching: true,
        sDom: "ltr",
        info: false,
        select: true,
        columns: [{ data: "id" }, { data: "name" }, { data: "class_count" }],
        columnDefs: [
          {
            targets: [0],
            visible: false,
            searchable: false,
          },
          {
            targets: [1, 2],
            className: "dt-center",
          },
        ],
        order: [[1, "asc"]],
        language: {
          zeroRecords: "등록된 강사가 없습니다",
        },
      });

      this.teacherTable.on("select", function (e, dt, type, indexes) {
        view.currentTeacher = view.studentTable.rows(indexes).data().toArray()[0];
        view.currentTeacherId = view.currentTeacher.id;
      });
    },
    computed: {},
    watch: {
      teacher() {
        this.teacherTable.clear();
        this.teacherTable.rows.add(this.teacher).draw();
      },
      fetchedTeacher() {
        this.teacher = [];
        for (const teacherData of this.fetchedTeacher) {
          this.getClassByTeacher(this, teacherData.id);
          this.teacher.push({
            id: teacherData.id,
            name: teacherData.name,
            class_count: this.tempClass.length,
          });
        }
      },
    },
    methods: {
      startAdd() {
        this.currentTeacher.id = -1;
        this.teacherTable.rows().deselect();
      },
      cancelAdd() {
        this.currentTeacher.id = 0;
      },
      getTeacher(view) {
        axios
          .get("https://oneapi.lunabi.co.kr/teacher", {
            params: {
              key: view.API_KEY,
            },
          })
          .then(function (res) {
            view.fetchedTeacher = res.data.teacher;
          })
          .catch(function (err) {
            console.log(err);
          })
          .then(function () {});
      },
      postTeacher(view) {
        axios
          .post(
            "https://oneapi.lunabi.co.kr/teacher",
            {},
            {
              headers: {
                "Content-Type": "application/json",
              },
              params: {
                key: view.API_KEY,
                name: view.currentTeacher.name,
              },
            }
          )
          .then(function (res) {
            console.log(res);
            view.currentTeacher = {
              id: 0,
              name: "",
            };
            view.getTeacher(view);
          })
          .catch(function (err) {
            console.log(err);
          })
          .then(function () {});
      },
      getClassByTeacher(view, teacher_id) {
        axios
          .get("https://oneapi.lunabi.co.kr/class/teacher", {
            params: {
              key: view.API_KEY,
              teacher_id: teacher_id,
            },
          })
          .then(function (res) {
            view.tempClass = res.data.teacher;
          })
          .catch(function (err) {
            console.log(err);
            view.tempClass = [];
          })
          .then(function () {});
      },
      switchRedBtn() {
        if (this.currentTeacher.id < 0) {
          const cancelSwal = Swal.mixin({
            customClass: {
              confirmButton: "btn bg-gradient-success",
              cancelButton: "btn bg-gradient-danger",
            },
            buttonsStyling: !1,
          });

          cancelSwal
            .fire({
              title: "강사 추가 취소",
              text: "입력한 내용이 사라집니다.",
              showCancelButton: !0,
              reverseButtons: !0,
              cancelButtonText: "계속 입력하기",
              confirmButtonText: "취소하기",
            })
            .then((e) => {
              e.isConfirmed ? this.cancelAdd(this) : "";
            });
        } else {
          const deleteSwal = Swal.mixin({
            customClass: {
              confirmButton: "btn bg-gradient-success",
              cancelButton: "btn bg-gradient-danger",
            },
            buttonsStyling: !1,
          });

          deleteSwal
            .fire({
              title: "강사를 삭제할까요?",
              text: "강사 정보가 영구히 삭제됩니다!",
              showCancelButton: !0,
              reverseButtons: !0,
              cancelButtonText: "취소",
              confirmButtonText: "삭제",
            })
            .then((e) => {
              e.isConfirmed ? "" : "";
            });
        }
      },
      switchGreenBtn() {
        if (this.currentTeacher.id < 0) {
          const addSwal = Swal.mixin({
            customClass: {
              confirmButton: "btn bg-gradient-success",
              cancelButton: "btn bg-gradient-danger",
            },
            buttonsStyling: !1,
          });

          addSwal
            .fire({
              title: "강사 추가",
              text: "새로운 강사가 추가됩니다.",
              showCancelButton: !0,
              reverseButtons: !0,
              cancelButtonText: "취소",
              confirmButtonText: "추가",
            })
            .then((e) => {
              e.isConfirmed ? this.postTeacher(this) : "";
            });
        } else {
          const updateSwal = Swal.mixin({
            customClass: {
              confirmButton: "btn bg-gradient-success",
              cancelButton: "btn bg-gradient-danger",
            },
            buttonsStyling: !1,
          });

          updateSwal
            .fire({
              title: "강사 정보 업데이트",
              text: "강사 정보를 수정할까요?",
              showCancelButton: !0,
              reverseButtons: !0,
              cancelButtonText: "취소",
              confirmButtonText: "수정",
            })
            .then((e) => {
              e.isConfirmed ? "" : "";
            });
        }
      },
    },
  };
</script>
