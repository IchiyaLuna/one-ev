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
                <th scope="col">{{}}</th>
              </tr>
            </thead>
            <tbody ref="timetablebody"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import InfoCard from "../components/InfoCard.vue";

  import { useAuthStore } from "../stores/auth";
  import { useAcademyStore } from "../stores/academy";
  ///////
  const today = new Date();
  const auth = useAuthStore();
  const academy = useAcademyStore();
  ///////
  const weekday = ["일", "월", "화", "수", "목", "금", "토"];
  const currentWeekDay = today.getDay();
  ///////

  await auth.login("testID", "testPW");
  await academy.fetchAcademy(auth.getApiKey);
</script>

<style>
  .opacity-50 {
    opacity: 0.5;
  }
  .draggable-card {
    transform: translate(0, 0);
  }
</style>
