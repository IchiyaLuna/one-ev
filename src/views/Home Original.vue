<template>
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
      <div class="card-header d-flex p-3 pb-0">
        <div>
          <select v-model="this.currentWeekDay" class="form-control" name="choices-button" id="choices-button">
            <option v-for="(name, index) in weekday" :key="index" :value="index">
              {{ name }}
            </option>
          </select>
        </div>
        <div class="nav-wrapper flex-fill position-relative ms-3 end-0">
          <ul class="nav nav-pills nav-fill p-1" role="tablist">
            <li class="nav-item" v-for="(item, index) in this.hall" :key="item.id">
              <a @click="this.currentHall = item.id" class="nav-link mb-0 px-0 py-1" :class="index === 0 ? 'active' : ''" role="tab">
                {{ item.name }}
              </a>
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
                <th v-for="room in this.room" :key="room.id" scope="col">{{ room.name }}</th>
              </tr>
            </thead>
            <tbody ref="timetablebody">
              <tr
                v-for="(timeObject, timeIndex) in this.times"
                :key="timeIndex"
                :style="{
                  height: this.rowHeight + '%',
                }"
              >
                <th class="position-relative text-end border" scope="row">
                  <div>
                    <div class="position-absolute top-0 start-50 translate-middle-x">{{ timeObject[0] }}</div>
                    <div class="position-absolute top-50 start-50 translate-middle">~</div>
                    <div class="position-absolute bottom-0 start-50 translate-middle-x">{{ timeObject[1] }}</div>
                  </div>
                </th>
                <td
                  ref="timetableitem"
                  v-for="room in this.room"
                  :key="room.id"
                  :style="{
                    width: this.colWidth + '%',
                  }"
                  @drop="onDrop(currentWeekDay, timeIndex, room.id)"
                  @dragover="onOver($event, currentWeekDay, timeIndex, room.id)"
                  @dragenter.prevent
                >
                  <class-card
                    class="draggable-card opacity-50"
                    v-if="checkPreview(currentWeekDay, timeIndex, room.id)"
                    :data="getProcessedClassById(this, this.checkPreview(currentWeekDay, timeIndex, room.id))"
                  />
                  <class-card
                    class="draggable-card"
                    v-else-if="checkClass(currentWeekDay, timeIndex, room.id)"
                    @dragstart="startDrag($event, timeIndex, room.id, checkClass(currentWeekDay, timeIndex, room.id))"
                    @dragend="endDrag()"
                    :data="getProcessedClassById(this, checkClass(currentWeekDay, timeIndex, room.id))"
                  />
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
  import axios from "axios";
  import Swal from "../plugins/sweetalert2";
  import { initNavs } from "../plugins/NavPlus";

  import InfoCard from "@/components/InfoCard.vue";
  import ClassCard from "@/components/ClassCard.vue";

  export default {
    inject: ["API_KEY"],
    components: {
      InfoCard,
      ClassCard,
    },
    data() {
      return {
        hall: [],
        fetchedRoom: [],
        fetchedClass: [],
        fetchedTeacher: [],
        fetchedTimetable: [],

        currentDragId: -1,
        originPosition: {
          time: -1,
          room_id: -1,
        },
        currentOverPosition: {
          time: -1,
          room_id: -1,
        },
        preview: [],

        times: [
          ["09:00", "13:00"],
          ["13:30", "17:30"],
          ["18:00", "22:00"],
        ],
        weekday: ["일", "월", "화", "수", "목", "금", "토"],
        room: [],
        currentWeekDay: 0,
        currentHall: 0,
      };
    },
    async mounted() {
      let view = this;
      let today = new Date();
      view.currentWeekDay = today.getDay();

      await view.getHall(view);
      await view.getRoom(view);
      await view.getClass(view);
      await view.getTeacher(view);
      await view.getTimetable(view);

      await view.processClass(view);
      view.currentHall = view.hall[0].id;
      await initNavs(document);
    },
    watch: {
      currentHall() {
        this.room = this.getRoomByHallId(this, this.currentHall);
      },
    },
    computed: {
      rowHeight() {
        return Math.floor(100 / this.times.length);
      },
      colWidth() {
        return Math.floor(100 / this.room.length);
      },
    },
    methods: {
      async processClass(view) {
        view.class = [];

        for (const classData of view.fetchedClass) {
          view.class.push({
            isHidden: false,
            id: classData.id,
            name: classData.name,
            teacher: view.getTeacherById(view, classData.teacher_id).name,
          });
        }
      },
      async getHall(view) {
        const response = await axios.get("https://oneapi.lunabi.co.kr/hall", {
          params: {
            key: view.API_KEY,
          },
        });
        view.hall = response.data.hall;
      },
      async getRoom(view) {
        const response = await axios.get("https://oneapi.lunabi.co.kr/room", {
          params: {
            key: view.API_KEY,
          },
        });
        view.fetchedRoom = response.data.room;
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
      async getTimetable(view) {
        const response = await axios.get("https://oneapi.lunabi.co.kr/timetable", {
          params: {
            key: view.API_KEY,
          },
        });
        view.fetchedTimetable = response.data.timetable;
      },
      async putTimetable(view, id, weekday, time, room_id) {
        await axios.put(
          "https://oneapi.lunabi.co.kr/timetable",
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              key: view.API_KEY,
              id: id,
              weekday: weekday,
              time: time,
              room_id: room_id,
            },
          }
        );

        await view.getTimetable(view);
      },
      getTimetableId(view, weekday, time, room_id, class_id) {
        return view.fetchedTimetable.find((x) => x.weekday == weekday && x.time == time && x.room_id == room_id && x.class_id == class_id)
          .id;
      },
      getTimetableById(view, timetable_id) {
        return view.fetchedTimetable.find((x) => x.id == timetable_id);
      },
      getRoomByHallId(view, hall_id) {
        return view.fetchedRoom.filter((x) => x.hall_id == hall_id);
      },
      getTeacherById(view, teacher_id) {
        return view.fetchedTeacher.find((x) => x.id == teacher_id);
      },
      getProcessedClassById(view, class_id) {
        return view.class.find((x) => x.id == class_id);
      },
      getPreviewByClassId(view, class_id) {
        return view.preview.find((x) => x.class_id == class_id);
      },
      checkClass(weekday, time, room_id) {
        if (!this.fetchedTimetable) return false;
        if (typeof this.fetchedTimetable.find((x) => x.weekday == weekday && x.time == time && x.room_id == room_id) != "undefined") {
          return this.fetchedTimetable.find((x) => x.weekday == weekday && x.time == time && x.room_id == room_id).class_id;
        } else false;
      },
      checkPreview(weekday, time, room_id) {
        if (!this.preview) return false;
        if (typeof this.preview.find((x) => x.weekday == weekday && x.time == time && x.room_id == room_id) != "undefined") {
          return this.preview.find((x) => x.weekday == weekday && x.time == time && x.room_id == room_id).class_id;
        } else false;
      },
      clearPreview() {
        this.preview = [];
      },
      restoreHidden() {
        const hiddens = [];
        let index = this.class.findIndex((x) => x.isHidden);

        while (index !== -1) {
          hiddens.push(index);
          index = this.items.findIndex((x, i) => i > index && x.isHidden);
        }

        for (let index of hiddens) {
          this.class[index].isHidden = false;
        }
      },
      startDrag(event, time, room_id, class_id) {
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
        this.currentDragId = class_id;
        this.originPosition = {
          time: time,
          room_id: room_id,
        };
      },
      endDrag() {
        this.currentDragId = -1;
        this.currentOverPosition = {
          time: -1,
          room_id: -1,
        };
        this.clearPreview();
        this.restoreHidden();
      },
      onDrop(weekday, time, room_id) {
        if (this.currentDragId === -1) return;

        const draggingClass = this.getProcessedClassById(this, this.currentDragId);
        const draggingTimetableId = this.getTimetableId(
          this,
          weekday,
          this.originPosition.time,
          this.originPosition.room_id,
          this.currentDragId
        );

        if (this.checkClass(weekday, time, room_id)) {
          const presentClass = this.getProcessedClassById(this, this.checkClass(weekday, time, room_id));
          const presentTimetableId = this.getTimetableId(this, weekday, time, room_id, presentClass.id);

          const exchangeSwal = Swal.mixin({
            customClass: {
              confirmButton: "btn bg-gradient-success",
              cancelButton: "btn bg-gradient-danger",
            },
            buttonsStyling: !1,
          });

          exchangeSwal
            .fire({
              title: "수업 시간 변경",
              text: `${draggingClass.name}와 ${presentClass.name}의 시간을 교환할까요?`,
              showCancelButton: !0,
              reverseButtons: !0,
              cancelButtonText: "취소",
              confirmButtonText: "교환",
            })
            .then((e) => {
              if (e.isConfirmed) {
                this.putTimetable(this, presentTimetableId, weekday, this.originPosition.time, this.originPosition.room_id);
                this.putTimetable(this, draggingTimetableId, weekday, time, room_id);
              }
            });
        } else {
          const moveSwal = Swal.mixin({
            customClass: {
              confirmButton: "btn bg-gradient-success",
              cancelButton: "btn bg-gradient-danger",
            },
            buttonsStyling: !1,
          });

          moveSwal
            .fire({
              title: "수업 시간 이동",
              text: `${draggingClass.name} 수업의 시간을 이동할까요?`,
              showCancelButton: !0,
              reverseButtons: !0,
              cancelButtonText: "취소",
              confirmButtonText: "이동",
            })
            .then((e) => {
              if (e.isConfirmed) {
                this.putTimetable(this, draggingTimetableId, weekday, time, room_id);
              }
            });
        }
      },
      onOver(event, weekday, time, room_id) {
        if (this.currentDragId === -1) return;

        event.preventDefault();

        if (this.currentOverPosition.time !== time || this.currentOverPosition.room_id !== room_id) {
          this.currentOverPosition = {
            time: time,
            room_id: room_id,
          };
        } else return;

        this.clearPreview();
        this.restoreHidden();

        if (time === this.originPosition.time && room_id === this.originPosition.room_id) return;

        const draggingClass = this.getProcessedClassById(this, this.currentDragId);

        if (this.checkClass(weekday, time, room_id)) {
          const presentClass = this.getProcessedClassById(this, this.checkClass(weekday, time, room_id));

          //Push present item to origin place
          this.preview.push({
            weekday: weekday,
            time: this.originPosition.time,
            room_id: this.originPosition.room_id,
            class_id: presentClass.id,
          });
        }
        //Push current dragging item to present place
        this.preview.push({
          weekday: weekday,
          time: time,
          room_id: room_id,
          class_id: draggingClass.id,
        });
      },
    },
  };
</script>

<style>
  .opacity-50 {
    opacity: 0.5;
  }
  .draggable-card {
    transform: translate(0, 0);
  }
</style>
