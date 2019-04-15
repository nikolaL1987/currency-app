<template>
  <div class="col-sm-6 p-0">
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
