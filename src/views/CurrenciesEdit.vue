<template>
  <div class="col-lg-6 col-md-9 col-sm-12 p-0">
    <h4 class="form-title">Edit Currency</h4>
    <CurrenciesFormEdit />
  </div>
</template>

<script>
import CurrenciesFormEdit from "@/components/CurrenciesFormEdit.vue";

export default {
  components: {
    CurrenciesFormEdit
  }
};
</script>
