<template>
  <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="false">
    <div class="container-fluid py-1 px-3">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
          <li class="breadcrumb-item text-sm text-white">
            <i class="fa-regular fa-cubes"></i>
          </li>
          <template v-for="(path, index) in navData.currentPath" :key="path">
            <li class="breadcrumb-item text-sm text-white" :class="navData.currentPath.length - 1 === index ? 'active' : ''">
              {{ path }}
            </li>
          </template>
        </ol>
        <h6 class="font-weight-bolder text-white mb-0">{{ navData.currentPage }}</h6>
      </nav>
      <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
        <div class="ms-md-auto pe-md-3 d-flex align-items-center">
          <!-- Top bar area -->
        </div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item dropdown pe-2 d-flex align-items-center">
            <a href="javascript:;" class="nav-link text-white p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa fa-bell cursor-pointer position-relative">
                <span class="position-absolute top-0 start-100 translate-middle badge badge-sm badge-circle bg-gradient-danger">
                  <span class="visually-hidden">New alerts</span>
                </span>
              </i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4 top-0" aria-labelledby="dropdownMenuButton">
              <li class="mb-2">
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="d-flex py-1">
                    <div class="avatar avatar-sm bg-gradient-success me-3 my-auto">
                      <i class="fa-solid fa-user-plus"></i>
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="text-sm font-weight-normal mb-1"><span class="font-weight-bold">신규 학생</span> 김야옹</h6>
                      <p class="text-xs text-secondary mb-0">
                        <i class="fa fa-clock me-1"></i>
                        13분 전
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="d-flex py-1">
                    <div class="avatar avatar-sm bg-gradient-danger me-3 my-auto">
                      <i class="fa-solid fa-brake-warning"></i>
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="text-sm font-weight-normal mb-1">학생 상담 필요</h6>
                      <p class="text-xs text-secondary mb-0">
                        <i class="fa fa-clock me-1"></i>
                        2일 전
                      </p>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "navbar",
    props: {
      navData: {
        type: Object,
        default: () => {
          return {
            currentPath: [],
            currentPage: "",
          };
        },
        description: "Navbar data",
      },
    },
  };
</script>
