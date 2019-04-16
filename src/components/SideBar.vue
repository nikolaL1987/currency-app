<template>
  <!-- Sidebar -->
  <div class="sidebar-wrapper">
    <div class="sidebar-header">
      <img src="../assets/logo.png" id="logo" alt="Logo" />
      <div class="search">
        <input
          type="text"
          class="form-control search-input"
          placeholder="Search"
          v-model="searchFilter"
        />
      </div>
    </div>
    <div class="sidebar-content">
      <h4 class="sidebar-heading">Currency List</h4>
      <ul class="sidber-items list-unstyled">
        <li
          v-for="(currency, index) in filteredCurrencies"
          :key="index"
          class="sidebar-item"
          @mouseover="active = true"
          @mouseleave="active = false"
        >
          <router-link
            class="sidebar-item-link"
            :to="{ name: 'currencies-edit', params: { id: currency.ID } }"
          >
            {{ currency.ISO }}
          </router-link>
          <span
            v-show="active"
            class="sidebar-item-delete"
            @click="deleteCurrency(currency.ID)"
          >
            Delete
          </span>
        </li>
      </ul>
      <span class="sidebar-item-add">
        <router-link
          class="sidebar-item-add-link"
          :to="{ name: 'currencies-add' }"
        >
          <img
            class="sidebar-item-add-icon"
            witdh="20"
            height="20"
            src="../assets/icons/icon-add.png"
            alt="Add currency"
          />
          <span class="sidebar-item-add-text">ADD CURRENCY</span>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main";
import CurrencyService from "@/services/CurrencyService.js";

export default {
  props: ["id"],
  data() {
    return {
      currencies: {},
      active: false,
      searchFilter: ""
    };
  },
  mounted() {
    this.currencies = CurrencyService.getCurrencies();

    eventBus.$on("currencies-modified", () => {
      this.currencies = CurrencyService.getCurrencies();
    });
  },
  methods: {
    deleteCurrency(id) {
      CurrencyService.deleteCurrency(id);
      this.$router.push("/");
    }
  },
  computed: {
    filteredCurrencies() {
      if (this.searchFilter === "") return this.currencies;

      return Object.values(this.currencies).filter(currency => {
        return (
          currency.ISO.toLowerCase().includes(
            this.searchFilter.toLowerCase()
          ) ||
          currency.symbol
            .toLowerCase()
            .includes(this.searchFilter.toLowerCase())
        );
      });
    }
  }
};
</script>

<style lang="scss">
.sidebar {
  &-wrapper {
    background-color: #eee;
    @media (min-width: 992px) {
      width: 33%;
    }
    @media (min-width: 767px) {
      min-height: 100vh;
    }
  }
  &-header {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    padding: 15px 30px;
    box-sizing: border-box;
    background-color: #e35b00;
    @media (max-width: 767px) {
      padding: 15px;
    }
    .search {
      width: 100%;
    }
  }
  &-content {
    padding: 30px;
    @media (max-width: 767px) {
      padding: 15px;
    }
  }
  &-heading {
    margin: 0;
    padding-bottom: 5px;
    font-size: 15px;
    color: #ff6600;
    border-bottom: 1px solid #ff6600;
  }
  &-item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    &-link {
      text-decoration: none;
      color: #666;
      &:hover {
        text-decoration: none;
        color: #ff6600;
      }
    }
    &-add {
      &-link {
        display: block;
        &:hover {
          text-decoration: none;
          color: #e35b00;
        }
      }
      &-text {
        display: inline-block;
        font-size: 10px;
        line-height: 21px;
        font-weight: 600;
        color: #ff6600;
        vertical-align: baseline;
      }
    }
    &-delete {
      float: right;
      font-size: 10px;
      cursor: pointer;
      margin-top: 5px;
    }
  }
}
#logo {
  display: block;
  margin-right: 20px;
}
.search {
  &-input {
    height: 30px !important;
    font-size: 11px !important;
  }
}
</style>
