<script>
import { useGgStore } from "../stores/goldenGames";
import { mapActions, mapState } from "pinia";
import { RouterView, RouterLink } from "vue-router";
import Card from "../components/Card.vue"

export default {
    components: {
        Card
    },
  methods: {
    ...mapActions(useGgStore, ["getLogout", "fetchAllFreeGames"]),
  },
  created() {
    this.fetchAllFreeGames();
  },
  computed: {
    ...mapState(useGgStore, ["listGames"]),
  },
};
</script>

<template>
  <!-- home -->
  <main>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">GoldenFreeGames</h1>
          <p class="lead text-body-secondary">Welcome to GoldenFreeGames.</p>
          <p>
            <RouterLink to="/products" class="btn btn-dark my-2"
              >Profile</RouterLink
            >
            <span>
              <RouterLink to="/login" class="btn btn-light my-2"
                >Logout</RouterLink
              >
            </span>
          </p>
        </div>
      </div>
    </section>

    <!-- Products -->
    <div class="album py-5 bg-body-tertiary">
      <div class="container">
        <!-- cards -->
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <Card v-for="game in listGames" :key="game.id" :game="game" />
        </div>

        <!-- pagination -->
        <div class="mt-5" v-if="this.$route.path !== '/'">
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a
                  @click="previosPage"
                  href="#"
                  class="page-link"
                  v-if="currentPage > 1"
                  >Previous</a
                >
              </li>
              <li v-for="page in totalPages" class="page-item">
                <a @click="changePage(page)" class="page-link" href="#">{{
                  page
                }}</a>
              </li>
              <li class="page-item">
                <a
                  @click="nextPage"
                  v-if="currentPage < totalPages"
                  class="page-link"
                  href="#"
                  >Next</a
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </main>

  <footer class="text-body-secondary py-5">
    <div class="container">
      <p class="float-end mb-1" v-if="this.$route.path !== '/'">
        <a href="#">Back to top</a>
      </p>
      <p class="mb-1">
        <strong>GoldenGames</strong>
      </p>
      <p class="mb-0">
        This website using HTML, CSS, Javascript, Express and Vue.js <br />
        My Github profile is
        <a href="https://github.com/Aldiiiii" target="_blank">here</a>.
      </p>
    </div>
  </footer>
</template>
