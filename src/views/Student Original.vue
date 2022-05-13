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
              v-model="studentSearchKeyword"
              class="form-control column_filter input-border-fix"
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
          <table class="table table-hover text-center">
            <thead>
              <tr>
                <th class="p-3">이름<i class="ms-2 fa-duotone fa-arrow-down-arrow-up"></i></th>
                <th class="p-3">최근 상담일<i class="ms-2 fa-duotone fa-arrow-down-arrow-up"></i></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>이름이</td>
                <td>기록 없음</td>
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
                  :disabled="this.currentStudent.id == undefined ? true : false"
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
                    :disabled="this.currentStudent.id == undefined ? true : false"
                    class="form-check-input"
                    type="radio"
                    value="0"
                    v-model="this.currentStudent.gender"
                  />
                  <label class="custom-control-label" for="male">남</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    :disabled="this.currentStudent.id == undefined ? true : false"
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
                  :disabled="this.currentStudent.id == undefined ? true : false"
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
                  :disabled="this.currentStudent.id == undefined ? true : false"
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
                  :disabled="this.currentStudent.id == undefined ? true : false"
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
              :class="this.currentStudent.id == undefined ? 'disabled' : ''"
              class="btn btn-sm btn-icon mb-0 btn-outline-danger"
              type="button"
            >
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-user-slash"></i></span>
              <span class="btn-inner--text">{{
                this.currentStudent.id == undefined || this.currentStudent.id < 0 ? "추가 취소" : "학생 삭제"
              }}</span>
            </button>
            <button
              @click="switchGreenBtn(this)"
              :class="this.currentStudent.id == undefined ? 'disabled' : ''"
              class="btn btn-sm btn-icon mb-0 bg-gradient-success"
              type="button"
            >
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-user-plus"></i></span>
              <span class="btn-inner--text">{{
                this.currentStudent.id == undefined || this.currentStudent.id < 0 ? "학생 추가" : "학생 수정"
              }}</span>
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
        fetchedStudent: [],
        student: [],

        currentStudent: {},
      };
    },
    async mounted() {
      let view = this;

      await view.getStudent(view);
      await view.processStudent(view);

      //Header Fix
      $("#studentTableHeader > tr > th").css("background-color", "white");
      $("#studentTableHeader > tr > th").css("position", "sticky");
      $("#studentTableHeader > tr > th").css("top", "0");
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
      studentSearchKeyword() {
        this.studentTable.column("1").search(this.studentSearchKeyword).draw();
      },
      student() {
        //this.studentTable.clear();
        //this.studentTable.draw();
      },
      studentPhone() {
        this.currentStudent.student_phone = this.studentPhone.length > 13 ? this.studentPhone.substr(0, 13) : this.studentPhone;
      },
      parentPhone() {
        this.currentStudent.parent_phone = this.parentPhone.length > 13 ? this.parentPhone.substr(0, 13) : this.parentPhone;
      },
    },
    methods: {
      isEmpty(target) {
        if (target == null) return true;
        if (target == undefined) return true;
        if (typeof target === "undefined") return true;
        if (typeof target === "string" && target === "") return true;
        if (typeof target === "string" && target === "undefined") return true;
        return false;
      },
      sortByName() {
        this.processStudent(this);
      },
      startAdd() {
        this.studentTable.rows().deselect();
        this.currentStudent.id = -1;
      },
      cancelAdd() {
        this.currentStudent = {};
      },
      async processStudent(view) {
        view.student = [];

        for (const student of view.fetchedStudent) {
          view.student.push({
            id: student.id,
            name: student.name,
            last_consult: student.last_consult ? student.last_consult : "기록 없음",
          });
        }

        //view.studentTable.clear();
        //view.studentTable.rows.add(view.student).draw();
      },
      getStudentById(view, id) {
        return view.fetchedStudent.find((x) => x.id == id);
      },
      async postStudent(view) {
        if (view.isEmpty(view.currentStudent.name)) {
          view.errorSwal("이름을 입력해주세요");
          return;
        }

        const response = await axios.post(
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
        );
        await view.getStudent(view);
        await view.processStudent(view);
        view.studentTable.clear().rows.add(view.student).draw();
        view.currentStudent = response.data.student;
      },
      async updateStudent(view) {
        if (view.isEmpty(view.currentStudent.name)) {
          view.errorSwal("이름을 입력해주세요");
          return;
        }

        const response = await axios.put(
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
        );
        await view.getStudent(view);
        await view.processStudent(view);
        view.studentTable.clear().rows.add(view.student).draw();
        view.currentStudent = response.data.student;
      },
      async deleteStudent(view) {
        const response = await axios.delete("https://oneapi.lunabi.co.kr/student", {
          params: {
            key: view.API_KEY,
            id: view.currentStudent.id,
          },
        });
        await view.getStudent(view);
        await view.processStudent(view);
        view.studentTable.clear().rows.add(view.student).draw();
        view.currentStudent = {};
        if (response.data.ok) Swal.fire("학생 삭제 완료", "학생 정보를 삭제했습니다", "success");
        else Swal.fire("오류!", "학생을 삭제하지 못했습니다", "error");
      },
      switchRedBtn() {
        if (this.currentStudent.id < 0) {
          const cancelSwal = Swal.mixin({
            customClass: {
              confirmButton: "btn bg-gradient-success",
              cancelButton: "btn bg-gradient-danger",
            },
            buttonsStyling: !1,
          });

          cancelSwal
            .fire({
              title: "학생 추가 취소",
              text: "입력한 내용이 사라집니다",
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
              title: "학생 삭제",
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
        if (view.currentStudent.id < 0) {
          const addSwal = Swal.mixin({
            customClass: {
              confirmButton: "btn bg-gradient-success",
              cancelButton: "btn bg-gradient-danger",
            },
            buttonsStyling: !1,
          });

          addSwal
            .fire({
              title: "학생 추가",
              text: "새로운 학생이 추가됩니다",
              showCancelButton: !0,
              reverseButtons: !0,
              cancelButtonText: "취소",
              confirmButtonText: "추가",
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
              title: "학생 정보 수정",
              text: "학생 정보를 수정합니다",
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
      errorSwal(text) {
        Swal.fire({
          icon: "error",
          title: "오류",
          text: text,
        });
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
