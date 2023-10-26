<script>
import { RouterLink } from "vue-router";
import { mapActions } from "pinia";
import { useGgStore } from "../stores/goldenGames";
// import { io } from "socket.io-client";
import { state } from "@/socket";
import { socket } from "@/socket";

export default {
  name: "ConnectionState",
  data() {
    return {
      searchName: "",
      isLoading: false,
      value: "",
    };
  },
  methods: {
    ...mapActions(useGgStore, ["getLogout"]),

    connect() {
      socket.connect();
    },
    disconnect() {
      socket.disconnect();
    },

    foo() {
      socket.foo();
    },

    onSubmit() {
      this.isLoading = true;

      socket.emit("create-something", this.value, () => {
        this.isLoading = false;        
      });

      this.value = ""
    },

    showMessages(){
      console.log('halo halo')
    },

    handleSearch() {
      // this.$router.push('/products?name=' + this.searchName)
      // this.fetchProducts({name: this.searchName})
    },
  },
  mounted() {
    // const socket = io("http://localhost:3000");
    // socket.on("hellow", (arg) => {
    //   console.log(arg);
    // });
    console.log(this.fooEvents)

  },
  computed: {
    connected() {
      return state.connected;
    },
    fooEvents() {
      return state.fooEvents;
    },
  },
};
</script>
<template>
  <header
    class="navbar navbar-expand-lg bd-navbar sticky-top navbar-dark bg-dark"
  >
    <nav class="container-fluid bd-gutter flex-wrap flex-lg-nowrap">
      <a class="navbar-brand" style="margin-left: 20px" href="#"
        >GoldenFreeGames</a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas-body p-4 pt-0 p-lg-0" id="navbarNav">
        <ul class="navbar-nav flex-row flex-wrap bd-navbar-nav">
          <li class="nav-item col-6 col-lg-auto active">
            <RouterLink v-if="this.$route.path !== '/'" class="nav-link" to="/">Home</RouterLink>
          </li>
          <!-- <li class="nav-item col-6 col-lg-auto">
            <RouterLink class="nav-link" to="/products">Product</RouterLink>
          </li>
          <li class="nav-item col-6 col-lg-auto">
            <RouterLink class="nav-link" to="/wishlist">Wishlist</RouterLink>
          </li> -->
          <li v-if="this.$route.path !== '/'" class="nav-item col-6 col-lg-auto">
            <a class="nav-link" @click.prevent="getLogout">Logout</a>
          </li>
          <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
            <!-- <li>
              <form
                @submit.prevent="handleSearch"
                class="form-inline"
                style="display: flex; gap: 10px"
              >
                <input
                  v-model="searchName"
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  class="btn btn-outline-light my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </li> -->
          </ul>
          <ul>
            <li>
              <button
                class="btn btn-warning"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                Show chat
              </button>
            </li>
          </ul>
        </ul>
      </div>
    </nav>
  </header>

  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasRightLabel">
        State : {{ connected }}
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <ul id="messages">
        <li v-for="msg in fooEvents">{{ msg }}</li>
      </ul>
      <form @submit.prevent="onSubmit()" id="form" action="">
        <input v-model="value" id="input" autocomplete="off" /><button>Send</button>
      </form>
    </div>
  </div>
</template>
