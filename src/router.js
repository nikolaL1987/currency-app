import Vue from "vue";
import Router from "vue-router";
import CurrenciesAdd from "./views/CurrenciesAdd.vue";
import CurrenciesEdit from "./views/CurrenciesEdit.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/currencies",
      name: "currencies"
    },
    {
      path: "/currencies/add",
      name: "currencies-add",
      component: CurrenciesAdd
    },
    {
      path: "/currencies/edit/:id",
      name: "currencies-edit",
      component: CurrenciesEdit,
      props: true
    }
  ]
});
