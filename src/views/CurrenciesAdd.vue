<template>
  <div class="col-sm-6 p-0">
    <h4 class="form-title">Add Currency</h4>
    <CurrenciesForm />
  </div>
</template>

<script>
import CurrenciesForm from "@/components/CurrenciesForm.vue";

export default {
  components: {
    CurrenciesForm
  }
};
</script>

<style lang="scss">
.form {
  &-title {
    padding-bottom: 5px;
    font-size: 15px;
    color: #ff6600;
    border-bottom: 1px solid #ff6600;
  }
}
</style>
