<template>
  <div id="app">
    <div class="d-flex" id="wrapper">
      <!-- Sidebar -->
      <SideBar />
      <!-- Page Conent -->
      <div id="page-content-wrapper">
        <Header />
        <div class="page-content-inner">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SideBar from "@/components/SideBar.vue";
import Header from "@/components/Header.vue";

export default {
  components: {
    SideBar,
    Header
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
html,
body {
  font-family: "Open Sans", sans-serif;
  height: 100%;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
#page-content-wrapper {
  min-width: 100vw;
}
.page-content-inner {
  padding: 30px;
}
@media (min-width: 768px) {
  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }
}
</style>
