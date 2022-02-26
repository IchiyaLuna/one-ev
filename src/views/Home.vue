<template>
  <!-- Main panel -->
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
      <div class="card-header p-3">
        <nav-slider :items="this.halls" />
      </div>
      <div class="card-body d-flex flex-column pt-0 p-3">
        <div class="d-flex flex-column flex-fill">
          <table class="table table-sm table-borderless text-center h-100">
            <thead>
              <tr>
                <th scope="col"></th>
                <th v-for="classroom in this.classrooms" :key="classroom" scope="col">{{ classroom }}</th>
              </tr>
            </thead>
            <tbody ref="timetablebody">
              <tr
                v-for="(timeObject, timeIndex) in this.times"
                :key="timeIndex"
                :style="{
                  height: this.rowHeight + 'px',
                }"
              >
                <th class="position-relative text-end border" scope="row">
                  <div>
                    <div class="position-absolute top-0 end-0 me-2">{{ timeObject[0] }}</div>
                    <div class="position-absolute top-50 end-0 translate-middle me-2">~</div>
                    <div class="position-absolute bottom-0 end-0 me-2">{{ timeObject[1] }}</div>
                  </div>
                </th>
                <td
                  v-for="(classroomNum, classroomIndex) in this.classrooms.length"
                  :key="classroomIndex"
                  @drop="onDrop($event, timeIndex, classroomIndex)"
                  @dragover="onOver($event, timeIndex, classroomIndex)"
                  @dragenter.prevent
                >
                  <class-card
                    class="draggable-card"
                    :class="this.items[getIndex(timeIndex, classroomIndex)].isPreview ? 'opacity-50' : ''"
                    v-if="checkIndex(timeIndex, classroomIndex)"
                    @dragstart="startDrag($event, this.items[getIndex(timeIndex, classroomIndex)])"
                    :data="this.items[getIndex(timeIndex, classroomIndex)]"
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
  import InfoCard from "@/components/InfoCard.vue";
  import ClassCard from "@/components/ClassCard.vue";
  import NavSlider from "@/components/NavSlider.vue";

  export default {
    components: {
      InfoCard,
      ClassCard,
      NavSlider,
    },
    data() {
      return {
        timetableHeight: 0,
        currentDragId: -1,
        currentOverPosition: {
          time: -1,
          classroom: -1,
        },
        halls: ["1관", "2관"],
        classrooms: ["1강의실", "2강의실", "3강의실", "4강의실", "5강의실", "6강의실", "7강의실"],
        times: [
          ["09:00", "13:00"],
          ["13:30", "17:30"],
          ["18:00", "22:00"],
        ],
        items: [
          {
            isPreview: false,
            isHidden: false,
            id: 0,
            classroom: 2,
            time: 0,
            class: "미적분",
            teacher: "김국어",
          },
          {
            isPreview: false,
            isHidden: false,
            id: 1,
            classroom: 4,
            time: 1,
            class: "국어",
            teacher: "이세종",
          },
          {
            isPreview: false,
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
    computed: {
      rowHeight() {
        return Math.floor(this.timetableHeight / this.times.length) - 8;
      },
    },
    methods: {
      getIndex(time, classroom) {
        return this.items.findIndex((x) => !x.isHidden && x.time === time && x.classroom === classroom);
      },
      checkIndex(time, classroom) {
        return this.getIndex(time, classroom) !== -1;
      },
      clearPreview() {
        const previews = [];
        let offset = 0;

        let index = this.items.findIndex((x) => x.isPreview);

        while (index !== -1) {
          previews.push(index);
          index = this.items.findIndex((x, i) => i > index && x.isPreview);
        }

        for (let index of previews) {
          this.items.splice(index - offset, 1);
          offset++;
        }
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
        event.dataTransfer.setData("itemID", item.id);
        this.currentDragId = item.id;
      },
      endDrag() {},
      onDrop(event, time, classroom) {
        let id = event.dataTransfer.getData("itemID");
        const item = this.items.find((x) => x.id == id);

        item.time = time;
        item.classroom = classroom;
        this.currentDragId = -1;
        this.currentOverPosition.time = -1;
        this.currentOverPosition.classroom = -1;
        this.clearPreview();
        this.restoreHidden();
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

        if (this.checkIndex(time, classroom) && !(time === draggingTime && classroom === draggingClassroom)) {
          const presentItem = this.items[this.getIndex(time, classroom)];

          //Set dragging item to hidden
          draggingItem.isHidden = true;
          //Set present item to hidden
          presentItem.isHidden = true;

          //Push current dragging item to present place
          this.items.push({
            isPreview: true,
            isHidden: false,
            time: time,
            classroom: classroom,
            class: draggingItem.class,
            teacher: draggingItem.teacher,
          });
          //Push present item to origin place
          this.items.push({
            isPreview: true,
            isHidden: false,
            time: draggingItem.time,
            classroom: draggingItem.classroom,
            class: presentItem.class,
            teacher: presentItem.teacher,
          });
        } else {
          this.items.push({
            isPreview: true,
            isHidden: false,
            time: time,
            classroom: classroom,
            class: draggingItem.class,
            teacher: draggingItem.teacher,
          });
        }
      },
    },
    mounted() {
      this.timetableHeight = this.$refs.timetablebody.clientHeight;
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
