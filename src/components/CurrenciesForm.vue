<template>
  <form class="currencies-form" @submit.prevent="onSubmitCreate">
    <div class="form-group">
      <label for="currency_code" class="col-form-label">Currency Code</label>
      <div class="col-sm-8 col-xs-9 pr-0">
        <input
          name="currency_code"
          v-validate="'required|currency_code|max:3'"
          data-vv-as="Currency Code"
          class="form-control"
          :class="{ input: true, 'is-danger': errors.has('currency_code') }"
          type="text"
          id="currency_code"
          v-model="ISO"
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
      <div class="col-sm-8 col-xs-9 pr-0">
        <input
          name="currency_symbol"
          v-validate="'required'"
          data-vv-as="Currency Symbol"
          class="form-control"
          :class="{ input: true, 'is-danger': errors.has('currency_symbol') }"
          type="text"
          id="currency_symbol"
          v-model="symbol"
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
      ID: null,
      ISO: "",
      symbol: ""
    };
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
    onSubmitCreate() {
      this.$validator.validateAll().then(result => {
        if (result) {
          let currenciesData = {
            ISO: this.ISO,
            symbol: this.symbol
          };
          CurrencyService.createCurrency(currenciesData);
          this.resetFormData();
        }
      });
    },
    resetFormData() {
      this.ISO = "";
      this.symbol = "";
      this.$validator.reset();
    }
  }
};
</script>

<style lang="scss">
.currencies-form {
  .form-group {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    margin-bottom: 7px;
    padding-bottom: 7px;
    border-bottom: 1px solid #ccc;
    &:last-child {
      border-bottom: none;
    }
  }
  label {
    color: #666;
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    padding-top: 10px;
  }
  .btn {
    background-color: #ff6600;
    padding: 5px 35px;
    border: none;
    outline: none;
    font-size: 12px;
    &:focus {
      border: none;
      outline: none;
      box-shadow: none;
    }
    &:hover,
    &:active {
      background-color: #e35b00 !important;
      border: none;
    }
  }
  .form-control {
    &.input {
      &.is-danger {
        border: 1px solid #ff6600;
      }
    }
  }
  .help {
    display: block;
    font-size: 12px;
    &.is-danger {
      color: #ff6600;
    }
  }
}
</style>
