<template>
  <form class="currencies-form" @submit.prevent="onSubmitUpdate">
    <div class="form-group">
      <label for="currency_code" class="col-form-label">Currency Code</label>
      <div class="col-sm-8 pr-0">
        <input
          name="currency_code"
          v-validate="'required|currency_code|max:3'"
          data-vv-as="Currency Code"
          class="form-control"
          :class="{ input: true, 'is-danger': errors.has('currency_code') }"
          type="text"
          id="currency_code"
          v-model="currency.ISO"
        />
        <span v-show="errors.has('currency_code')" class="help is-danger">{{
          errors.first("currency_code")
        }}</span>
      </div>
    </div>
    <div class="form-group">
      <label for="currency_symbol" class="col-form-label"
        >Currency Symbol</label
      >
      <div class="col-sm-8 pr-0">
        <input
          name="currency_symbol"
          v-validate="'required'"
          data-vv-as="Currency Symbol"
          class="form-control"
          :class="{ input: true, 'is-danger': errors.has('currency_symbol') }"
          type="text"
          id="currency_symbol"
          v-model="currency.symbol"
        />
        <span v-show="errors.has('currency_symbol')" class="help is-danger">{{
          errors.first("currency_symbol")
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
    this.$validator.extend("currency_code", {
      getMessage: `Already exists`,
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
    onSubmitUpdate() {
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
      this.$validator.reset();
    }
  }
};
</script>

<style></style>
