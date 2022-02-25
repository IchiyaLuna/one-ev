<template>
<!-- Main panel -->
  <div class="row">
    <!-- First panel -->
    <div class="col-4 main-panel">
      <div class="card h-100">
        <!-- Top section -->
        <div class="d-flex p-3">
          <div class="input-group flex-nowrap me-3">
            <span class="input-group-text text-body"><i class="fa-duotone fa-magnifying-glass"></i></span>
            <input
              class="form-control column_filter input-border-fix"
              id="name_filter"
              placeholder="강사 검색"
              type="text"
              onfocus="focused(this)"
              onfocusout="defocused(this)"
            />
          </div>

          <div class="flex-fill">
            <button class="text-nowrap btn btn-icon btn-primary mb-0" type="button">
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-user-plus"></i></span>
              <span class="btn-inner--text">추가</span>
            </button>
          </div>
        </div>
        <!-- Table section -->
        <div class="table-responsive">
          <table class="table table-hover dt-center" id="teacherTable">
            <thead id="teacherTableHeader">
              <tr>
                <th>이름</th>
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
              id="name_filter"
              placeholder="학생 검색"
              type="text"
              onfocus="focused(this)"
              onfocusout="defocused(this)"
            />
          </div>

        </div>
        <!-- Table section -->
        <div class="student-list table-responsive">
          <table class="table table-hover dt-center" id="studentTable">
            <thead id="studentTableHeader">
              <tr>
                <th>이름</th>
                <th data-type="date" data-format="YYYY/MM/DD">최근 상담일</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
    <!-- Third panel -->
    <div class="col-4 d-flex flex-column main-panel">
      <!-- Top panel -->
      <div class="card">
        <div class="card-header p-3">
            <h6>학생 정보</h6>
        </div>
        <div class="card-body pt-0 p-3 overflow-auto">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th class="text-secondary text-xxs font-weight-bolder opacity-7">이름</th>
                <th class="text-secondary text-xxs font-weight-bolder opacity-7">수강 중인 수업</th>
              </tr>
            </thead>           
            <tbody>
              <tr>
                <td>강따따</td>
                <td> 수리논술</td>
              </tr>
              <tr>
                <td></td>
                <td>화학</td>
              </tr>
              <tr>
                <td></td>
                <td>물리2</td>
              </tr>
            </tbody>
          </table>
        </div>
            
            
          
      
      </div>
      <!-- Bottom panel -->
      <div class="card mt-3 flex-fill overflow-auto">
        <div class="card-header p-3">
          <h6>학생 상담 내역</h6>
        </div>
        
        <div class="card-body pt-0 p-3 overflow-auto">
          <table class="table align-items-center mb-0">
            
            <tbody>
              <tr>
                <td>12월 30일 냥</td>
              </tr>
              <tr>
                <td>11월 23일 냥</td>
              </tr>
              <tr>
                <td>11월 16일 냥</td>
              </tr>
              <tr>
                <td>11월 9일 냥</td>
              </tr>
            </tbody>
          </table>
          <div class="bottomPanel d-flex justify-content-end pt-2 pb-2">
            <button class="text-nowrap btn btn-sm btn-icon bg-gradient-success mb-0" type="button">
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-user-plus"></i></span>
              <span class="btn-inner--text">상담 내역 추가</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>