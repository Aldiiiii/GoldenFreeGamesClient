<script>
import { RouterLink } from 'vue-router'
import { mapActions } from 'pinia';
import { useGgStore } from '../stores/goldenGames';

export default {
  data(){
    return {
      searchName: ''
    }
  },
  methods: {
    ...mapActions(useGgStore, ['getLogout','fetchProducts']),

    handleSearch(){
        // this.$router.push('/products?name=' + this.searchName)
        // this.fetchProducts({name: this.searchName})
    },
  }
}
</script>
<template>
  <header class="navbar navbar-expand-lg bd-navbar sticky-top navbar-dark bg-dark">
    <nav class="container-fluid bd-gutter flex-wrap flex-lg-nowrap">
      <a class="navbar-brand" style="margin-left: 20px" href="#">GoldenFreeGames</a>
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
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li class="nav-item col-6 col-lg-auto">
            <RouterLink class="nav-link" to="/products">Product</RouterLink>
          </li>
          <li class="nav-item col-6 col-lg-auto">
            <RouterLink class="nav-link" to="/wishlist">Wishlist</RouterLink>
          </li>
          <li class="nav-item col-6 col-lg-auto">
            <a class="nav-link" @click.prevent="getLogout">Logout</a>
          </li>
          <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
            <li>
              <form @submit.prevent="handleSearch" class="form-inline" style="display: flex; gap: 10px">
                <input
                  v-model="searchName"
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
              </form>
            </li>            
          </ul>
          <ul>
            
            <li>
              <button class="btn btn-warning" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Show chat</button>
            </li>
          </ul>
        </ul>
      </div>
    </nav>
  </header>


<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    ...
  </div>
</div>
</template>
