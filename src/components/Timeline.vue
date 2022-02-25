<template>
  <div class="d-flex flex-column flex-fill">
    <table class="table table-sm table-borderless text-center h-100">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">월</th>
          <th scope="col">화</th>
          <th scope="col">수</th>
          <th scope="col">목</th>
          <th scope="col">금</th>
          <th scope="col">토</th>
        </tr>
      </thead>
      <tbody class="flex-fill">
        <tr>
          <th class="position-relative text-end border" scope="row">
            <div class="h-100">
              <div class="position-absolute top-0 end-0 me-2">09:00</div>
              <div class="position-absolute top-50 end-0 translate-middle me-2">~</div>
              <div class="position-absolute bottom-0 end-0 me-2">13:00</div>
            </div>
          </th>
          <td></td>
          <td>
            <div class="card border h-100">
              <div class="h6 text-start ps-2 mb-0">논술 특강</div>
              <div class="text-start ps-2">알렉스T</div>
            </div>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <div class="card border h-100">
              <div class="h6 text-start ps-2 mb-0">보강</div>
              <div class="text-start ps-2">김보성T</div>
            </div>
          </td>
        </tr>

        <tr>
          <th class="position-relative text-end border" scope="row">
            <div class="h-100">
              <div class="position-absolute top-0 end-0 me-2">13:30</div>
              <div class="position-absolute top-50 end-0 translate-middle me-2">~</div>
              <div class="position-absolute bottom-0 end-0 me-2">17:30</div>
            </div>
          </th>
          <td>
            <div class="card border h-100">
              <div class="h6 text-start ps-2 mb-0">미적분II</div>
              <div class="text-start ps-2">김국어T</div>
            </div>
          </td>
          <td></td>
          <td>
            <div class="card border h-100">
              <div class="h6 text-start ps-2 mb-0">수학</div>
              <div class="text-start ps-2">한미적T</div>
            </div>
          </td>
          <td>
            <div class="card border h-100">
              <div class="h6 text-start ps-2 mb-0">수학</div>
              <div class="text-start ps-2">임확통T</div>
            </div>
          </td>
          <td></td>
          <td>
            <div class="card border h-100">
              <div class="h6 text-start ps-2 mb-0">수학</div>
              <div class="text-start ps-2">박기벡T</div>
            </div>
          </td>
        </tr>

        <tr>
          <th class="position-relative text-end border" scope="row">
            <div class="h-100">
              <div class="position-absolute top-0 end-0 me-2">18:00</div>
              <div class="position-absolute top-50 end-0 translate-middle me-2">~</div>
              <div class="position-absolute bottom-0 end-0 me-2">22:00</div>
            </div>
          </th>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <div class="card border h-100">
              <div class="h6 text-start ps-2 mb-0">수학</div>
              <div class="text-start ps-2">김국어T</div>
            </div>
          </td>
          <td>
            <div class="card border h-100">
              <div class="h6 text-start ps-2 mb-0">국어</div>
              <div class="text-start ps-2">세종T</div>
            </div>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    methods: {
      startDrag(event, item) {
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("itemID", item.id);
      },
    },
  };
</script>
