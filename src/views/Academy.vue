<template>
<!-- Left panel -->
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

          <div class="flex-fill">
            <button class="text-nowrap btn btn-icon btn-primary mb-0" type="button">
              <span class="btn-inner--icon me-2"><i class="fa-solid fa-user-plus"></i></span>
              <span class="btn-inner--text">추가</span>
            </button>
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
            <tbody>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
              <tr>
                <td>김야옹</td>
                <td>2022/02/13</td>
              </tr>
              <tr>
                <td>이멍멍</td>
                <td>2022/01/23</td>
              </tr>
              <tr>
                <td>최어흥</td>
                <td>2022/03/23</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div></template>
