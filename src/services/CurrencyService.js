import { eventBus } from "../main";

const CURRENCIES = "currencies";
const CURRENCIES_MODIFIED_BUS = "currencies-modified";

export default {
  getCurrency(id) {
    let currencies = JSON.parse(localStorage.getItem(CURRENCIES));
    return currencies[id];
  },
  getCurrencies() {
    if (
      localStorage.getItem(CURRENCIES) &&
      Object.keys(JSON.parse(localStorage.getItem(CURRENCIES))).length
    ) {
      return JSON.parse(localStorage.getItem(CURRENCIES));
    }
    return {};
  },
  createCurrency(currency) {
    let currencies = {};
    let index = 1;

    if (
      localStorage.getItem(CURRENCIES) &&
      Object.keys(JSON.parse(localStorage.getItem(CURRENCIES))).length
    ) {
      currencies = JSON.parse(localStorage.getItem(CURRENCIES));

      index = Math.max(...Object.keys(currencies)) + 1;
    }

    currency.ID = index;
    currencies[index] = currency;
    localStorage.setItem(CURRENCIES, JSON.stringify(currencies));
    eventBus.$emit(CURRENCIES_MODIFIED_BUS);
  },
  updateCurrency(id, currency) {
    const currencies = { ...this.getCurrencies(), [id]: currency };
    localStorage.setItem(
      CURRENCIES,
      JSON.stringify(this.normalizeObject(currencies))
    );

    eventBus.$emit(CURRENCIES_MODIFIED_BUS);
  },
  deleteCurrency(id) {
    let currencies = JSON.parse(localStorage.getItem(CURRENCIES));
    delete currencies[id];
    localStorage.setItem(CURRENCIES, JSON.stringify(currencies));

    eventBus.$emit(CURRENCIES_MODIFIED_BUS);
  },
  normalizeObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  getAllIsoCodes() {
    let currencies = this.getCurrencies();

    let isoCodes = [];
    Object.values(currencies).forEach(item => {
      isoCodes.push(item.ISO);
    });

    return isoCodes;
  }
};
