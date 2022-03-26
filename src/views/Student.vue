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
            <button @click="startAdd" class="text-nowrap btn btn-icon btn-primary mb-0" type="button">
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
                <th>ID</th>
                <th>이름</th>
                <th>성별</th>
                <th>학생 휴대폰</th>
                <th>학부모 휴대폰</th>
                <th>학교</th>
                <th data-type="date" data-format="YYYY/MM/DD">최근 상담일</th>
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
                <input
                  :disabled="this.currentStudentId == 0 ? true : false"
                  v-model="this.currentStudent.name"
                  class="form-control"
                  type="text"
                  placeholder="이름"
                  onfocus="focused(this)"
                  onfocusout="defocused(this)"
                />
              </div>
            </div>
            <div class="col-3">
              <label class="form-label">성별</label>
              <div class="input-group">
                <div class="form-check form-check-inline">
                  <input
                    :disabled="this.currentStudentId == 0 ? true : false"
                    class="form-check-input"
                    type="radio"
                    value="0"
                    v-model="this.currentStudent.gender"
                  />
                  <label class="custom-control-label" for="male">남</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    :disabled="this.currentStudentId == 0 ? true : false"
                    class="form-check-input"
                    type="radio"
                    value="1"
                    v-model="this.currentStudent.gender"
                  />
                  <label class="custom-control-label" for="female">여</label>
                </div>
              </div>
            </div>
            <div class="col-3">
              <label class="form-label">학생 핸드폰</label>
              <div class="input-group">
                <input
                  :disabled="this.currentStudentId == 0 ? true : false"
                  v-model="this.currentStudent.student_phone"
                  class="form-control"
                  type="text"
                  placeholder="010-0000-0000"
                  onfocus="focused(this)"
                  onfocusout="defocused(this)"
                />
              </div>
            </div>
            <div class="col-3">
              <label class="form-label">학부모 핸드폰</label>
              <div class="input-group">
                <input
                  :disabled="this.currentStudentId == 0 ? true : false"
                  v-model="this.currentStudent.parent_phone"
                  class="form-control"
                  type="text"
                  placeholder="010-0000-0000"
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
                  :disabled="this.currentStudentId == 0 ? true : false"
                  v-model="this.currentStudent.school"
                  class="form-control"
                  type="text"
                  placeholder="학교"
                  onfocus="focused(this)"
                  onfocusout="defocused(this)"
                />
              </div>
            </div>
          </div>
          <div class="btn-group float-end" role="group">
            <button
              @click="switchRedBtn"
              :class="this.currentStudentId == 0 ? 'disabled' : ''"
              class="btn btn-sm btn-icon mb-0 btn-outline-danger"
              type="button"
            >
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-user-slash"></i></span>
              <span class="btn-inner--text">{{ this.currentStudentId <= 0 ? "추가 취소" : "학생 삭제" }}</span>
            </button>
            <button
              @click="switchGreenBtn(this)"
              :class="this.currentStudentId == 0 ? 'disabled' : ''"
              class="btn btn-sm btn-icon mb-0 bg-gradient-success"
              type="button"
            >
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-user-plus"></i></span>
              <span class="btn-inner--text">{{ this.currentStudentId <= 0 ? "학생 추가" : "학생 수정" }}</span>
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
  import axios from "axios";
  import Swal from "../plugins/sweetalert2";
  import NavSliderRouter from "@/components/NavSliderRouter.vue";

  export default {
    inject: ["API_KEY"],
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
        students: [],
        studentTable: null,
        currentStudentId: 0,
        currentStudent: {
          id: 0,
          name: "",
          gender: "",
          student_phone: "",
          parent_phone: "",
          school: "",
          last_consult: "",
        },
      };
    },
    mounted() {
      this.getStudents(this);

      this.studentTable = $("#studentTable").DataTable({
        paging: false,
        searching: true,
        sDom: "ltr",
        info: false,
        select: true,
        columns: [
          { data: "id" },
          { data: "name" },
          { data: "gender" },
          { data: "student_phone" },
          { data: "parent_phone" },
          { data: "school" },
          { data: "last_consult" },
        ],
        columnDefs: [
          {
            targets: [0, 2, 3, 4, 5],
            visible: false,
            searchable: false,
          },
          {
            targets: [1, 6],
            className: "dt-center",
          },
        ],
        order: [[1, "asc"]],
        language: {
          zeroRecords: "검색 결과가 없습니다",
        },
      });

      let view = this;

      this.studentTable.on("select", function (e, dt, type, indexes) {
        view.currentStudent = view.studentTable.rows(indexes).data().toArray()[0];
        view.currentStudentId = view.currentStudent.id;
      });

      this.studentTable.on("deselect", function () {
        view.currentStudent = {
          id: 0,
          name: "",
          gender: "",
          student_phone: "",
          parent_phone: "",
          school: "",
          last_consult: "",
        };
        view.currentStudentId = 0;
      });

      //Header Fix
      $("#studentTableHeader > tr > th").css("background-color", "white");
      $("#studentTableHeader > tr > th").css("position", "sticky");
      $("#studentTableHeader > tr > th").css("top", "0");

      $("input.column_filter").on("keyup click", function () {
        $("#studentTable").DataTable().column("1").search($("#name_filter").val()).draw();
      });
    },
    computed: {
      studentPhone() {
        if (!this.currentStudent.student_phone) {
          return "";
        }

        let value = this.currentStudent.student_phone.replace(/[^0-9]/g, "");

        let result = [];
        let restNumber = "";

        // 지역번호와 나머지 번호로 나누기
        if (value.startsWith("02")) {
          // 서울 02 지역번호
          result.push(value.substr(0, 2));
          restNumber = value.substring(2);
        } else if (value.startsWith("1")) {
          // 지역 번호가 없는 경우
          // 1xxx-yyyy
          restNumber = value;
        } else {
          // 나머지 3자리 지역번호
          // 0xx-yyyy-zzzz
          result.push(value.substr(0, 3));
          restNumber = value.substring(3);
        }

        if (restNumber.length === 7) {
          // 7자리만 남았을 때는 xxx-yyyy
          result.push(restNumber.substring(0, 3));
          result.push(restNumber.substring(3));
        } else {
          result.push(restNumber.substring(0, 4));
          result.push(restNumber.substring(4));
        }

        return result.filter((val) => val).join("-");
      },
      parentPhone() {
        if (!this.currentStudent.parent_phone) {
          return "";
        }

        let value = this.currentStudent.parent_phone.replace(/[^0-9]/g, "");

        let result = [];
        let restNumber = "";

        // 지역번호와 나머지 번호로 나누기
        if (value.startsWith("02")) {
          // 서울 02 지역번호
          result.push(value.substr(0, 2));
          restNumber = value.substring(2);
        } else if (value.startsWith("1")) {
          // 지역 번호가 없는 경우
          // 1xxx-yyyy
          restNumber = value;
        } else {
          // 나머지 3자리 지역번호
          // 0xx-yyyy-zzzz
          result.push(value.substr(0, 3));
          restNumber = value.substring(3);
        }

        if (restNumber.length === 7) {
          // 7자리만 남았을 때는 xxx-yyyy
          result.push(restNumber.substring(0, 3));
          result.push(restNumber.substring(3));
        } else {
          result.push(restNumber.substring(0, 4));
          result.push(restNumber.substring(4));
        }

        return result.filter((val) => val).join("-");
      },
    },
    watch: {
      students() {
        this.studentTable.clear();
        this.studentTable.rows.add(this.students).draw();
      },
      studentPhone() {
        this.currentStudent.student_phone = this.studentPhone.length > 13 ? this.studentPhone.substr(0, 13) : this.studentPhone;
      },
      parentPhone() {
        this.currentStudent.parent_phone = this.parentPhone.length > 13 ? this.parentPhone.substr(0, 13) : this.parentPhone;
      },
    },
    methods: {
      startAdd() {
        this.currentStudentId = -1;
        console.log(this.studentTable);
        this.studentTable.rows().deselect();
      },
      cancelAdd() {
        this.currentStudentId = 0;
      },
      getStudents(view) {
        axios
          .get("https://oneapi.lunabi.co.kr/student", {
            params: {
              key: view.API_KEY,
            },
          })
          .then(function (res) {
            view.students = res.data.student;
          })
          .catch(function (err) {
            console.log(err);
          })
          .then(function () {});
      },
      postStudent(view) {
        axios
          .post(
            "https://oneapi.lunabi.co.kr/student",
            {},
            {
              headers: {
                "Content-Type": "application/json",
              },
              params: {
                key: view.API_KEY,
                name: view.currentStudent.name,
                gender: view.currentStudent.gender,
                student_phone: view.currentStudent.student_phone,
                parent_phone: view.currentStudent.parent_phone,
                school: view.currentStudent.school,
                last_consult: view.currentStudent.last_consult,
              },
            }
          )
          .then(function (res) {
            console.log(res);
            view.currentStudentId = 0;
            view.currentStudent = {
              id: 0,
              name: "",
              gender: "",
              student_phone: "",
              parent_phone: "",
              school: "",
              last_consult: "",
            };
            view.getStudents(view);
          })
          .catch(function (err) {
            console.log(err);
          })
          .then(function () {});
      },
      updateStudent(view) {
        axios
          .put(
            "https://oneapi.lunabi.co.kr/student",
            {},
            {
              headers: {
                "Content-Type": "application/json",
              },
              params: {
                key: view.API_KEY,
                id: view.currentStudent.id,
                name: view.currentStudent.name,
                gender: view.currentStudent.gender,
                student_phone: view.currentStudent.student_phone,
                parent_phone: view.currentStudent.parent_phone,
                school: view.currentStudent.school,
                last_consult: view.currentStudent.last_consult,
              },
            }
          )
          .then(function (res) {
            console.log(res);
            view.currentStudentId = 0;
            view.currentStudent = {
              id: 0,
              name: "",
              gender: "",
              student_phone: "",
              parent_phone: "",
              school: "",
              last_consult: "",
            };
            view.getStudents(view);
          })
          .catch(function (err) {
            console.log(err);
          })
          .then(function () {});
      },
      deleteStudent(view) {
        axios
          .delete("https://oneapi.lunabi.co.kr/student", {
            params: {
              key: view.API_KEY,
              id: view.currentStudent.id,
            },
          })
          .then(function (res) {
            console.log(res);
            view.currentStudentId = 0;
            view.currentStudent = {
              id: 0,
              name: "",
              gender: "",
              student_phone: "",
              parent_phone: "",
              school: "",
              last_consult: "",
            };
            view.getStudents(view);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch(function (err) {
            console.log(err);
            Swal.fire("Error!", "Your file has been deleted.", "error");
          })
          .then(function () {});
      },
      switchRedBtn() {
        if (this.currentStudentId < 0) {
          const cancelSwal = Swal.mixin({
            customClass: {
              confirmButton: "btn bg-gradient-success",
              cancelButton: "btn bg-gradient-danger",
            },
            buttonsStyling: !1,
          });

          cancelSwal
            .fire({
              title: "취소하시겠습니까?",
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
              title: "학생을 삭제할까요?",
              text: "학생 정보가 영구히 삭제됩니다!",
              showCancelButton: !0,
              reverseButtons: !0,
              cancelButtonText: "취소",
              confirmButtonText: "삭제",
            })
            .then((e) => {
              e.isConfirmed ? this.deleteStudent(this) : "";
            });
        }
      },
      switchGreenBtn(view) {
        if (view.currentStudentId < 0) {
          const addSwal = Swal.mixin({
            customClass: {
              confirmButton: "btn bg-gradient-success",
              cancelButton: "btn bg-gradient-danger",
            },
            buttonsStyling: !1,
          });

          addSwal
            .fire({
              title: "학생을 추가하시겠습니까?",
              text: "새로운 학생이 추가됩니다.",
              showCancelButton: !0,
              reverseButtons: !0,
              cancelButtonText: "취소",
              confirmButtonText: "수정",
            })
            .then((e) => {
              e.isConfirmed ? this.postStudent(this) : "";
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
              title: "정보를 업데이트 하시겠습니까??",
              text: "수정은 되돌릴 수 없습니다.",
              showCancelButton: !0,
              reverseButtons: !0,
              cancelButtonText: "취소",
              confirmButtonText: "수정",
            })
            .then((e) => {
              e.isConfirmed ? this.updateStudent(this) : "";
            });
        }
      },
    },
  };
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
