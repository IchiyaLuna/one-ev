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
            <button @click="this.addSubjectBtn" class="text-nowrap btn btn-icon btn-primary mb-0" type="button">
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-grid-2-plus"></i></span>
              <span class="btn-inner--text">분류 추가</span>
            </button>
          </div>
        </div>
        <!-- Table section -->
        <div class="table-responsive">
          <table class="table table-hover dt-center" id="subjectTable">
            <thead id="groupTableHeader">
              <tr>
                <th>id</th>
                <th>분류</th>
                <th>수업 수</th>
              </tr>
            </thead>
            <tbody></tbody>
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
            <button
              @click="addClassBtn"
              :disabled="this.currentSubjectId == 0 ? true : false"
              class="text-nowrap btn btn-icon btn-primary mb-0"
              type="button"
            >
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
                <th>id</th>
                <th>수업명</th>
                <th>강사명</th>
                <th>수강생</th>
              </tr>
            </thead>
            <tbody></tbody>
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
                  :disabled="this.currentClass.id == 0 ? true : false"
                  v-model="this.currentClass.name"
                  class="form-control"
                  type="text"
                  placeholder="강의명"
                  onfocus="focused(this)"
                  onfocusout="defocused(this)"
                />
              </div>
            </div>
            <div class="col-6">
              <label class="form-label">강사</label>
              <div class="input-group">
                <select
                  :disabled="this.currentClass.id == 0 ? true : false"
                  v-model="this.currentClass.teacher_id"
                  class="form-control"
                  name="choices-button"
                  id="choices-button"
                >
                  <option value="0">강사 선택</option>
                  <option v-for="teacher in fetchedTeacher" :key="teacher.id" :value="teacher.id">{{ teacher.name }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <label class="form-label">강의실</label>
              <select
                :disabled="this.currentClass.id == 0 ? true : false"
                v-model="this.currentClass.room_id"
                class="form-control"
                name="choices-button"
                id="choices-button"
              >
                <option value="0">강의실 선택</option>
                <option v-for="roomData in fetchedRoom" :key="roomData.id" :value="roomData.id">
                  {{ this.getHallNameById(this, roomData.hall_id) + " - " + roomData.name }}
                </option>
              </select>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="example-number-input" class="form-control-label">정원</label>
                <input
                  :disabled="this.currentClass.id == 0 ? true : false"
                  v-model="this.currentClass.full_student"
                  class="form-control"
                  type="number"
                  placeholder="6"
                />
              </div>
            </div>
          </div>
          <div class="btn-group float-end" role="group">
            <button
              @click="switchRedBtn"
              :disabled="this.currentClass.id == 0 ? true : false"
              class="btn btn-sm btn-icon mb-0 btn-outline-danger"
              type="button"
            >
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-trash-can"></i></span>
              <span class="btn-inner--text">{{ this.currentClass.id <= 0 ? "추가 취소" : "수업 삭제" }}</span>
            </button>
            <button
              @click="switchGreenBtn"
              :disabled="this.currentClass.id == 0 ? true : false"
              class="btn btn-sm btn-icon mb-0 bg-gradient-success"
              type="button"
            >
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-plus"></i></span>
              <span class="btn-inner--text">{{ this.currentClass.id <= 0 ? "수업 추가" : "수업 수정" }}</span>
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
  import axios from "axios";
  import Swal from "../plugins/sweetalert2";

  export default {
    inject: ["API_KEY"],
    data() {
      return {
        fetchedSubject: [],
        fetchedClass: [],
        fetchedTeacher: [],
        fetchedHall: [],
        fetchedRoom: [],

        subject: [],
        class: [],
        teacher: [],

        newSubjectName: "", //for Swal
        currentSubjectId: 0,
        subjectTable: null,

        hallRoom: [],

        currentClass: {
          id: "",
          room_id: "0",
          name: "",
          subject_id: "",
          teacher_id: "0",
          full_student: 0,
          time: {},
        },

        classTable: null,
      };
    },
    watch: {
      subject() {
        this.subjectTable.clear();
        this.subjectTable.rows.add(this.subject).draw();
      },
      class() {
        this.classTable.clear();
        this.classTable.rows.add(this.class).draw();
      },
      currentSubjectId() {
        this.processClass(this);
      },
    },
    async mounted() {
      this.getHall(this);
      this.getRoom(this);
      this.getTeacher(this);
      this.getClass(this);
      await this.getSubject(this);

      this.subjectTable = $("#subjectTable").DataTable({
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
        language: {
          zeroRecords: "수업 분류가 없습니다.",
        },
      });

      let view = this;

      this.subjectTable.on("select", function (e, dt, type, indexes) {
        view.currentSubjectId = view.subjectTable.rows(indexes).data().toArray()[0].id;
        view.currentClass.subject_id = view.currentSubjectId;
      });

      this.subjectTable.on("deselect", function () {
        view.currentSubjectId = 0;
        view.currentClass = {};
        view.currentClass.id = 0;
      });

      //Header Fix
      $("#groupTableHeader > tr > th").css("background-color", "white");
      $("#groupTableHeader > tr > th").css("position", "sticky");
      $("#groupTableHeader > tr > th").css("top", "0");

      this.classTable = $("#classTable").DataTable({
        paging: false,
        searching: true,
        sDom: "ltr",
        info: false,
        select: true,
        columns: [{ data: "id" }, { data: "name" }, { data: "teacher" }, { data: "student_count" }],
        columnDefs: [
          {
            targets: [0],
            visible: false,
            searchable: false,
          },
          {
            targets: [1, 2, 3],
            className: "dt-center",
          },
        ],
        language: {
          zeroRecords: "검색 결과가 없습니다",
        },
      });

      this.classTable.on("select", function (e, dt, type, indexes) {
        view.currentClass.id = view.classTable.rows(indexes).data().toArray()[0].id;
        view.currentClass = view.getClassById(view, view.currentClass.id);
      });

      this.classTable.on("deselect", function () {
        view.currentClass = {};
        view.currentClass.id = 0;
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
    methods: {
      processSubject(view) {
        view.subject = [];
        for (const subjectData of view.fetchedSubject) {
          view.subject.push({
            id: subjectData.id,
            name: subjectData.name,
            class_count: view.countClassBySubjectId(view, subjectData.id),
          });
        }
      },
      processClass(view) {
        view.class = [];
        for (const classData of view.fetchedClass.filter((x) => x.subject_id == this.currentSubjectId)) {
          view.class.push({
            id: classData.id,
            name: classData.name,
            teacher: view.getTeacherNameById(view, classData.teacher_id),
            student_count: "0",
          });
        }
      },
      async getSubject(view) {
        const response = await axios.get("https://oneapi.lunabi.co.kr/subject", {
          params: {
            key: view.API_KEY,
          },
        });
        view.fetchedSubject = response.data.subject;
      },
      async getClass(view) {
        const response = await axios.get("https://oneapi.lunabi.co.kr/class", {
          params: {
            key: view.API_KEY,
          },
        });
        view.fetchedClass = response.data.class;
      },
      async getTeacher(view) {
        const response = await axios.get("https://oneapi.lunabi.co.kr/teacher", {
          params: {
            key: view.API_KEY,
          },
        });

        view.fetchedTeacher = response.data.teacher;
      },
      async getHall(view) {
        axios
          .get("https://oneapi.lunabi.co.kr/hall", {
            params: {
              key: view.API_KEY,
            },
          })
          .then(function (res) {
            view.fetchedHall = res.data.hall;
          })
          .catch(function (err) {
            console.log(err);
          })
          .then(function () {});
      },
      async getRoom(view) {
        axios
          .get("https://oneapi.lunabi.co.kr/room", {
            params: {
              key: view.API_KEY,
            },
          })
          .then(function (res) {
            view.fetchedRoom = res.data.room;
          })
          .catch(function (err) {
            console.log(err);
          })
          .then(function () {});
      },
      postSubject(view) {
        axios
          .post(
            "https://oneapi.lunabi.co.kr/subject",
            {},
            {
              headers: {
                "Content-Type": "application/json",
              },
              params: {
                key: view.API_KEY,
                name: view.newSubjectName,
              },
            }
          )
          .then(function (res) {
            console.log(res);
            view.getSubject(view);
          })
          .catch(function (err) {
            console.log(err);
          })
          .then(function () {});
      },
      postClass(view) {
        axios
          .post(
            "https://oneapi.lunabi.co.kr/class",
            {},
            {
              headers: {
                "Content-Type": "application/json",
              },
              params: {
                key: view.API_KEY,
                room_id: view.currentClass.room_id,
                name: view.currentClass.name,
                subject_id: view.currentClass.subject_id,
                teacher_id: view.currentClass.teacher_id,
                full_student: view.currentClass.full_student,
                time: view.currentClass.time,
              },
            }
          )
          .then(function (res) {
            console.log(res);
            view.getClass(view);
          })
          .then(function () {
            view.processSubject(view);
            view.processClass(view);
          })
          .catch(function (err) {
            console.log(err);
          })
          .then(function () {});
      },
      getClassById(view, id) {
        return view.fetchedClass.find((x) => x.id == id);
      },
      countClassBySubjectId(view, subject_id) {
        return view.fetchedClass.filter((x) => x.subject_id == subject_id).length;
      },
      getTeacherNameById(view, teacher_id) {
        return view.fetchedTeacher.find((x) => x.id == teacher_id).name;
      },
      getHallNameById(view, hall_id) {
        console.log(hall_id);
        return view.fetchedHall.find((x) => x.id == hall_id).name;
      },

      addSubjectBtn() {
        const addSwal = Swal.mixin({
          customClass: {
            confirmButton: "btn bg-gradient-success",
            cancelButton: "btn bg-gradient-danger",
          },
          buttonsStyling: !1,
        });

        addSwal
          .fire({
            title: "분류 추가",
            input: "text",
            reverseButtons: !0,
            inputAttributes: {
              autocapitalize: "off",
            },
            showCancelButton: !0,
            cancelButtonText: "취소",
            confirmButtonText: "추가",
          })
          .then((e) => {
            this.newSubjectName = e.value;
            e.isConfirmed ? this.postSubject(this) : "";
          });
      },
      addClassBtn() {
        this.currentClass.id = -1;
      },
      cancelAdd() {
        this.currentClass.id = 0;
      },
      switchRedBtn() {
        if (this.currentClass.id < 0) {
          const cancelSwal = Swal.mixin({
            customClass: {
              confirmButton: "btn bg-gradient-success",
              cancelButton: "btn bg-gradient-danger",
            },
            buttonsStyling: !1,
          });

          cancelSwal
            .fire({
              title: "수업 추가 취소",
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
              title: "수업을 삭제할까요?",
              text: "수업 정보가 영구히 삭제됩니다!",
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
        if (this.currentClass.id < 0) {
          const addSwal = Swal.mixin({
            customClass: {
              confirmButton: "btn bg-gradient-success",
              cancelButton: "btn bg-gradient-danger",
            },
            buttonsStyling: !1,
          });

          addSwal
            .fire({
              title: "수업 추가",
              text: "새로운 수업이 추가됩니다.",
              showCancelButton: !0,
              reverseButtons: !0,
              cancelButtonText: "취소",
              confirmButtonText: "추가",
            })
            .then((e) => {
              e.isConfirmed ? this.postClass(this) : "";
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
              title: "수업 정보 업데이트",
              text: "수업 정보를 수정할까요?",
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
