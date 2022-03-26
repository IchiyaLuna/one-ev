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
              <h5 class="mb-1">{{ this.name }}</h5>
              <p class="mb-0 font-weight-bold text-sm">{{ this.tel }}</p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
            <div class="nav-wrapper position-relative end-0">
              <ul class="nav nav-pills nav-fill p-1 flex-row" role="tablist">
                <li class="nav-item">
                  <a
                    @click="setMenu(0)"
                    class="nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center active"
                    to=""
                    role="tab"
                  >
                    <i class="fa-solid fa-circle-info"></i>
                    <span class="ms-2">기본 정보</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a @click="setMenu(1)" class="nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center" to="" role="tab">
                    <i class="fa-solid fa-wrench"></i>
                    <span class="ms-2">시설 관리</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-4 flex-fill">
      <div class="card-header">
        <h5>{{ this.menu[this.currentMenu] }}</h5>
      </div>
      <div class="card-body pt-0">
        <div v-show="this.currentMenu == 0">
          <div class="row">
            <div class="col-6">
              <label class="form-label">학원명</label>
              <div class="input-group">
                <input
                  v-model="this.name"
                  class="form-control"
                  type="text"
                  placeholder="학원명"
                  onfocus="focused(this)"
                  onfocusout="defocused(this)"
                />
              </div>
            </div>
            <div class="col-6">
              <label class="form-label">전화번호</label>
              <div class="input-group">
                <input
                  v-model="this.tel"
                  class="form-control"
                  type="text"
                  placeholder="02-0000-0000"
                  onfocus="focused(this)"
                  onfocusout="defocused(this)"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-show="this.currentMenu == 1">
          <div class="row">
            <div class="col-6">
              <div class="flex-fill">
                <button @click="addHallBtn" class="text-nowrap btn btn-icon btn-primary mb-0" type="button">
                  <span class="btn-inner--icon me-2"><i class="fa-solid fa-building"></i></span>
                  <span class="btn-inner--text">관 추가</span>
                </button>
              </div>
              <table class="table table-hover dt-center" id="hallTable">
                <thead id="hallTableHeader">
                  <tr>
                    <th>ID</th>
                    <th>이름</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
            <div class="col-6">
              <div class="flex-fill">
                <button
                  @click="addRoomBtn"
                  :class="currentHallId == 0 ? 'disabled' : ''"
                  class="text-nowrap btn btn-icon btn-primary mb-0"
                  type="button"
                >
                  <span class="btn-inner--icon me-2"><i class="fa-solid fa-door-open"></i></span>
                  <span class="btn-inner--text">교실 추가</span>
                </button>
              </div>
              <table class="table table-hover dt-center" id="roomTable">
                <thead id="roomTableHeader">
                  <tr>
                    <th>ID</th>
                    <th>교실명</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import Swal from "../plugins/sweetalert2";
  import { initNavs } from "../plugins/NavPlus";

  export default {
    inject: ["API_KEY"],
    data() {
      return {
        menu: ["기본 정보", "시설 관리"],
        currentMenu: 0,
        name: "",
        tel: "",
        fetchedHall: [],
        hall: [],
        currentHallId: 0,
        hallTable: null,
        room: [],
        roomTable: null,
      };
    },
    watch: {
      hall() {
        this.hallTable.clear();
        this.hallTable.rows.add(this.hall).draw();
      },
      room() {
        this.roomTable.clear();
        this.roomTable.rows.add(this.room.filter((x) => x.hall_id == this.currentHallId)).draw();
      },
    },
    async mounted() {
      initNavs(document);
      this.getAcademy(this);

      let view = this;

      this.hallTable = $("#hallTable").DataTable({
        paging: false,
        searching: true,
        sDom: "ltr",
        info: false,
        select: true,
        columns: [{ data: "id" }, { data: "name" }],
        columnDefs: [
          {
            targets: [0],
            visible: false,
            searchable: false,
          },
          {
            targets: [1],
            className: "dt-center",
          },
        ],
        language: {
          zeroRecords: "등록된 관이 없습니다.",
        },
      });

      this.hallTable.on("select", function (e, dt, type, indexes) {
        view.currentHallId = view.hallTable.rows(indexes).data().toArray()[0].id;
        console.log(view.currentHallId);
        view.getRoom(view);
      });

      this.roomTable = $("#roomTable").DataTable({
        paging: false,
        searching: true,
        sDom: "ltr",
        info: false,
        select: true,
        columns: [{ data: "id" }, { data: "name" }],
        columnDefs: [
          {
            targets: [0],
            visible: false,
            searchable: false,
          },
          {
            targets: [1],
            className: "dt-center",
          },
        ],
        language: {
          zeroRecords: "해당 관에 교실이 없습니다.",
        },
      });

      await this.getHall(this);
      await this.getRoom(this);
    },
    methods: {
      setMenu(index) {
        this.currentMenu = index;
      },
      getAcademy(view) {
        axios
          .get("https://oneapi.lunabi.co.kr/academy", {
            params: {
              key: view.API_KEY,
            },
          })
          .then(function (res) {
            view.name = res.data.name;
            view.tel = res.data.tel;
            console.log(res);
          })
          .catch(function (err) {
            console.log(err);
          })
          .then(function () {});
      },
      async getHall(view) {
        view.hall = [];
        const response = await axios.get("https://oneapi.lunabi.co.kr/hall", {
          params: {
            key: view.API_KEY,
          },
        });
        view.hall = response.data.hall;
      },
      postHall(view, name) {
        axios
          .post(
            "https://oneapi.lunabi.co.kr/hall",
            {},
            {
              headers: {
                "Content-Type": "application/json",
              },
              params: {
                key: view.API_KEY,
                name: name,
              },
            }
          )
          .then(function (res) {
            console.log(res);
            view.getHall(view);
          })
          .catch(function (err) {
            console.log(err);
          })
          .then(function () {});
      },
      async getRoom(view) {
        view.room = [];
        const response = await axios.get("https://oneapi.lunabi.co.kr/room", {
          params: {
            key: view.API_KEY,
          },
        });
        view.room = response.data.room;
      },
      postRoom(view, name) {
        axios
          .post(
            "https://oneapi.lunabi.co.kr/room",
            {},
            {
              headers: {
                "Content-Type": "application/json",
              },
              params: {
                key: view.API_KEY,
                hall_id: view.currentHallId,
                name: name,
              },
            }
          )
          .then(function (res) {
            console.log(res);
            view.getRoom(view);
          })
          .catch(function (err) {
            console.log(err);
          })
          .then(function () {});
      },
      addHallBtn() {
        const addSwal = Swal.mixin({
          customClass: {
            confirmButton: "btn bg-gradient-success",
            cancelButton: "btn bg-gradient-danger",
          },
          buttonsStyling: !1,
        });

        addSwal
          .fire({
            title: "관 추가",
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
            e.isConfirmed ? this.postHall(this, e.value) : "";
          });
      },
      addRoomBtn() {
        const addSwal = Swal.mixin({
          customClass: {
            confirmButton: "btn bg-gradient-success",
            cancelButton: "btn bg-gradient-danger",
          },
          buttonsStyling: !1,
        });

        addSwal
          .fire({
            title: "교실 추가",
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
            e.isConfirmed ? this.postRoom(this, e.value) : "";
          });
      },
    },
  };
</script>
<style>
  .big-icon {
    font-size: 1.5rem !important;
  }
</style>
