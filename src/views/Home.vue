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
      <div class="card-header p-3 pb-0">
        <div class="nav-wrapper position-relative end-0">
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
                  @drop="onDrop(timeIndex, room.id)"
                  @dragover="onOver($event, timeIndex, room.id)"
                  @dragenter.prevent
                >
                  <class-card
                    class="draggable-card opacity-50"
                    v-if="checkPreview(timeIndex, room.id)"
                    :data="getPreview(timeIndex, room.id)"
                  />
                  <class-card
                    class="draggable-card"
                    v-else-if="checkIndex(timeIndex, room.id)"
                    @dragstart="startDrag($event, getItem(timeIndex, room.id))"
                    @dragend="endDrag()"
                    :data="getItem(timeIndex, room.id)"
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
        currentDragId: -1,
        currentOverPosition: {
          time: -1,
          classroom: -1,
        },
        previews: [],
        hall: [],
        currentHall: 0,
        fetchedRoom: [],
        room: [],
        times: [
          ["09:00", "13:00"],
          ["13:30", "17:30"],
          ["18:00", "22:00"],
        ],
        items: [
          {
            isHidden: false,
            id: 0,
            classroom: 1,
            time: 0,
            class: "미적분",
            teacher: "김국어",
          },
          {
            isHidden: false,
            id: 1,
            classroom: 3,
            time: 1,
            class: "국어",
            teacher: "이세종",
          },
          {
            isHidden: false,
            id: 2,
            classroom: 5,
            time: 2,
            class: "사회",
            teacher: "마르크스",
          },
        ],
      };
    },
    async mounted() {
      let view = this;

      await view.getHall(view);
      await view.getRoom(view);
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
        console.log(this.room);
        return Math.floor(100 / this.room.length);
      },
    },
    methods: {
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
      getRoomByHallId(view, hall_id) {
        return view.fetchedRoom.filter((x) => x.hall_id == hall_id);
      },
      checkIndex(time, classroom) {
        console.log(classroom);
        return this.items.findIndex((x) => !x.isHidden && x.time === time && x.classroom == classroom) !== -1;
      },
      getItem(time, classroom) {
        return this.items.find((x) => x.time === time && x.classroom == classroom);
      },
      checkPreview(time, classroom) {
        return this.previews.findIndex((x) => x.time === time && x.classroom == classroom) !== -1;
      },
      getPreview(time, classroom) {
        return this.previews.find((x) => x.time === time && x.classroom == classroom);
      },
      clearPreview() {
        this.previews.splice(0, this.previews.length);
      },
      restoreHidden() {
        const hiddens = [];
        let index = this.items.findIndex((x) => x.isHidden);

        while (index !== -1) {
          hiddens.push(index);
          index = this.items.findIndex((x, i) => i > index && x.isHidden);
        }

        for (let index of hiddens) {
          this.items[index].isHidden = false;
        }
      },
      startDrag(event, item) {
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
        this.currentDragId = item.id;
      },
      endDrag() {
        this.currentDragId = -1;
        this.currentOverPosition.time = -1;
        this.currentOverPosition.classroom = -1;

        this.clearPreview();
        this.restoreHidden();
      },
      onDrop(time, classroom) {
        if (this.currentDragId === -1) return;

        const item = this.items.find((x) => x.id === this.currentDragId);

        if (this.checkIndex(time, classroom)) {
          const presentItem = this.getItem(time, classroom);

          presentItem.time = item.time;
          presentItem.classroom = item.classroom;
        }

        item.time = time;
        item.classroom = classroom;
      },
      onOver(event, time, classroom) {
        if (this.currentDragId === -1) return;

        event.preventDefault();

        if (this.currentOverPosition.time !== time || this.currentOverPosition.classroom !== classroom) {
          this.currentOverPosition.time = time;
          this.currentOverPosition.classroom = classroom;
        } else return;

        this.clearPreview();
        this.restoreHidden();

        const draggingItem = this.items.find((x) => x.id == this.currentDragId);
        const draggingTime = draggingItem.time;
        const draggingClassroom = draggingItem.classroom;

        if (time === draggingTime && classroom === draggingClassroom) return;

        if (this.checkIndex(time, classroom)) {
          const presentItem = this.getItem(time, classroom);

          //Push current dragging item to present place
          this.previews.push({
            time: time,
            classroom: classroom,
            class: draggingItem.class,
            teacher: draggingItem.teacher,
          });
          //Push present item to origin place
          this.previews.push({
            time: draggingItem.time,
            classroom: draggingItem.classroom,
            class: presentItem.class,
            teacher: presentItem.teacher,
          });
        } else {
          this.previews.push({
            time: time,
            classroom: classroom,
            class: draggingItem.class,
            teacher: draggingItem.teacher,
          });
        }
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
