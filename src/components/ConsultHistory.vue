<template>
  <div class="timeline timeline-one-side" data-timeline-axis-style="dotted">
    <div class="timeline-block">
      <span class="timeline-step">
        <i class="fa-solid fa-family text-info text-gradient"></i>
      </span>
      <div class="timeline-content">
        <h6 class="text-dark text-sm font-weight-bold mb-0">학부모 상담</h6>
        <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">2022 02 14</p>
        <p class="text-sm mt-3 mb-2">학부모랑도 상담했대~~~</p>
      </div>
    </div>
    <div class="timeline-block">
      <span class="timeline-step">
        <i class="fa-solid fa-family text-info text-gradient"></i>
      </span>
      <div class="timeline-content">
        <h6 class="text-dark text-sm font-weight-bold mb-0">학부모 상담</h6>
        <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">2022 02 14</p>
        <p class="text-sm mt-3 mb-2">학부모랑도 상담했대~~~</p>
      </div>
    </div>
    <div class="timeline-block">
      <span class="timeline-step">
        <i class="fa-solid fa-family text-info text-gradient"></i>
      </span>
      <div class="timeline-content">
        <h6 class="text-dark text-sm font-weight-bold mb-0">학부모 상담</h6>
        <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">2022 02 14</p>
        <p class="text-sm mt-3 mb-2">학부모랑도 상담했대~~~</p>
      </div>
    </div>
    <div class="timeline-block">
      <span class="timeline-step">
        <i class="fa-solid fa-graduation-cap text-warning text-gradient"></i>
      </span>
      <div class="timeline-content">
        <h6 class="text-dark text-sm font-weight-bold mb-0">학업 상담</h6>
        <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">2022 02 13</p>
        <p class="text-sm mt-3 mb-2">학업 상담이 필요했대~~~</p>
        <span class="badge badge-sm bg-gradient-warning me-2">상담</span>
        <span class="badge badge-sm bg-gradient-warning">학업</span>
      </div>
    </div>
    <div class="timeline-block">
      <span class="timeline-step">
        <i class="fa-solid fa-face-smile-plus text-success text-gradient"></i>
      </span>
      <div class="timeline-content">
        <h6 class="text-dark text-sm font-weight-bold mb-0">신규 등록</h6>
        <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">2022 02 12</p>
        <p class="text-sm mt-3 mb-2">새로 등록함~~ 상담 어쩌구 저ㄱ쩌구 함~~</p>
        <span class="badge badge-sm bg-gradient-info">신규</span>
      </div>
    </div>
  </div>
  <div class="bottomPanel d-flex justify-content-end pt-2 pb-2">
    <button class="text-nowrap btn btn-sm btn-icon bg-gradient-success mb-0" type="button">
      <span class="btn-inner--icon me-2"><i class="fa-solid fa-file-circle-plus"></i></span>
      <span class="btn-inner--text">새 상담 추가</span>
    </button>
  </div>
</template>

<script>
  export default {
    mounted() {
      $(".bottomPanel").css("background-color", "white");
      $(".bottomPanel").css("position", "sticky");
      $(".bottomPanel").css("bottom", "0");
      $(".bottomPanel").css("z-index", "1020");
    },
  };
</script>
