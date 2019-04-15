<template>
  <form class="currencies-form" @submit.prevent="updateCurrency">
    <div class="form-group">
      <label for="currencyUnique" class="col-form-label">Currency Code</label>
      <div class="col-sm-8 pr-0">
        <input
          name="currencyUnique"
          v-validate="'required|currencyUnique|max:3'"
          data-vv-as="Currency Code"
          class="form-control"
          :class="{ input: true, 'is-danger': errors.has('currencyUnique') }"
          type="text"
          id="currencyUnique"
          v-model="currency.ISO"
        />
        <span v-show="errors.has('currencyUnique')" class="help is-danger">{{
          errors.first("currencyUnique")
        }}</span>
      </div>
    </div>
    <div class="form-group">
      <label for="currency-symbol" class="col-form-label"
        >Currency Symbol</label
      >
      <div class="col-sm-8 pr-0">
        <input
          name="currency-symbol"
          v-validate="'required'"
          data-vv-as="Currency Symbol"
          class="form-control"
          :class="{ input: true, 'is-danger': errors.has('currency-symbol') }"
          type="text"
          id="currency-symbol"
          v-model="currency.symbol"
        />
        <span v-show="errors.has('currency-symbol')" class="help is-danger">{{
          errors.first("currency-symbol")
        }}</span>
      </div>
    </div>

    <div class="text-right">
      <button type="submit" class="btn btn-primary">SUBMIT</button>
    </div>
  </form>
</template>

<script>
import CurrencyService from "@/services/CurrencyService.js";

export default {
  data() {
    return {
      currency: {
        ID: null,
        ISO: "",
        symbol: ""
      }
    };
  },
  mounted() {
    this.currency = CurrencyService.getCurrency(this.$route.params.id);
  },
  created() {
    this.$validator.extend("currencyUnique", {
      getMessage: field => `The ${field} value in the list is the same.`,
      validate: value => {
        return new Promise(resolve => {
          const isoCodes = CurrencyService.getAllIsoCodes();
          resolve({
            valid: !isoCodes.includes(value)
          });
        });
      }
    });
  },
  methods: {
    updateCurrency() {
      this.$validator.validateAll().then(result => {
        CurrencyService.updateCurrency(this.$route.params.id, this.currency);
        if (result) {
          this.$router.push("/");
        }
      });
    }
  },
  watch: {
    "$route.params.id": function(id) {
      this.currency = CurrencyService.getCurrency(id);
    }
  }
};
</script>

<style></style>
