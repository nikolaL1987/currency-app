<template>
  <form class="currencies-form" @submit.prevent="onSubmitCreate">
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
          v-model="ISO"
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
          v-model="symbol"
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
      ID: null,
      ISO: "",
      symbol: ""
    };
  },
  created() {
    this.$validator.extend("currencyUnique", {
      getMessage: field => `The ${field} value is not unique.`,
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
