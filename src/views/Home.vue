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
            <tbody>
              <tr v-for="(timeObject, timeIndex) in this.times" :key="timeIndex">
                <th class="position-relative text-end border" scope="row">
                  <div class="h-100">
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

  export default {
    data() {
      return {
        currentDragId: -1,
        currentOverPosition: {
          time: -1,
          classroom: -1,
        },
        classrooms: ["1강의실", "2강의실", "3강의실", "4강의실", "5강의실", "6강의실", "7강의실"],
        times: [
          ["09:00", "13:00"],
          ["13:30", "17:30"],
          ["18:00", "22:00"],
        ],
        items: [
          {
            id: 0,
            classroom: 2,
            time: 0,
            class: "미적분",
            teacher: "김국어",
          },
          {
            id: 1,
            classroom: 4,
            time: 1,
            class: "국어",
            teacher: "이세종",
          },
          {
            id: 2,
            classroom: 5,
            time: 2,
            class: "사회",
            teacher: "마르크스",
          },
        ],
      };
    },
    computed: {},
    methods: {
      checkIndex(time, classroom) {
        var index = this.items.findIndex((x) => x.time === time && x.classroom === classroom);
        return index !== -1;
      },
      getIndex(time, classroom) {
        return this.items.findIndex((x) => x.time === time && x.classroom === classroom);
      },
      isVisible(index) {
        return this.items[index].visible;
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
        let item = this.items.find((x) => x.id == id);
        item.time = time;
        item.classroom = classroom;
        this.currentDragId = -1;
      },
      onOver(event, time, classroom) {
        event.preventDefault();
        if (this.currentOverPosition.time !== time || this.currentOverPosition.classroom !== classroom) {
          this.currentOverPosition.time = time;
          this.currentOverPosition.classroom = classroom;
        } else {
          return;
        }
        let item = this.items.find((x) => x.id == this.currentDragId);
        item.time = time;
        item.classroom = classroom;
      },
    },
    mounted() {
      var total = document.querySelectorAll(".nav-pills");
      function initNavs() {
        total.forEach(function (l) {
          var s = document.createElement("div"),
            t = l.querySelector("li:first-child .nav-link").cloneNode();
          (t.innerHTML = "-"), s.classList.add("moving-tab", "position-absolute", "nav-link"), s.appendChild(t), l.appendChild(s);
          l.getElementsByTagName("li").length;
          (s.style.padding = "0px"),
            (s.style.width = l.querySelector("li:nth-child(1)").offsetWidth + "px"),
            (s.style.transform = "translate3d(0px, 0px, 0px)"),
            (s.style.transition = ".5s ease"),
            (l.onmouseover = function (e) {
              let t = getEventTarget(e),
                i = t.closest("li");
              if (i) {
                let a = Array.from(i.closest("ul").children),
                  n = a.indexOf(i) + 1;
                l.querySelector("li:nth-child(" + n + ") .nav-link").onclick = function () {
                  s = l.querySelector(".moving-tab");
                  let e = 0;
                  if (l.classList.contains("flex-column")) {
                    for (var t = 1; t <= a.indexOf(i); t++) e += l.querySelector("li:nth-child(" + t + ")").offsetHeight;
                    (s.style.transform = "translate3d(0px," + e + "px, 0px)"),
                      (s.style.height = l.querySelector("li:nth-child(" + t + ")").offsetHeight);
                  } else {
                    for (t = 1; t <= a.indexOf(i); t++) e += l.querySelector("li:nth-child(" + t + ")").offsetWidth;
                    (s.style.transform = "translate3d(" + e + "px, 0px, 0px)"),
                      (s.style.width = l.querySelector("li:nth-child(" + n + ")").offsetWidth + "px");
                  }
                };
              }
            });
        });
      }
      function getEventTarget(e) {
        return (e = e || window.event).target || e.srcElement;
      }
      initNavs();
    },
    components: {
      InfoCard,
      ClassCard,
    },
  };
</script>

<style>
  .draggable-card {
    transform: translate(0, 0);
  }
</style>
