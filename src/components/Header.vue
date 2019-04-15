<template>
  <!-- Header -->
  <header class="header">
    <h4 class="header-title">
      <img
        class="header-title-icon"
        width="13"
        height="13"
        src="../assets/icons/icon-currency.png"
        alt="Currency icon"
      />
      Currencies
    </h4>
  </header>
</template>
<style lang="scss">
.header {
  background-color: #ff6600;
  min-height: 61px;
  padding: 15px 30px;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  &-title {
    margin: 0;
    font-size: 10px;
    line-height: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: #fff;
    &-icon {
      display: inline-block;
      vertical-align: bottom;
    }
  }
}
</style>
