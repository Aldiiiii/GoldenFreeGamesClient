<script>
import { useGgStore } from "../stores/goldenGames";
import { mapActions, mapState } from "pinia";
import { RouterView, RouterLink } from "vue-router";
import Card from "../components/Card.vue";

export default {
  components: {
    Card,
  },
  methods: {
    ...mapActions(useGgStore, ["getLogout", "fetchAllFreeGames"]),

    changePage(page) {
      if(this.$route.query.name){
        this.$router.push('?name='+ this.$route.query.name + '&page=' + page)
      }else{
        this.$router.push('?page=' + page)
      }      
      let name = this.$route.query.name ? this.$route.query.name : ''
      this.fetchAllFreeGames({ page, name })
    },

    countPagination(){
      let count = []
      if(this.currentPage < 5){
        for(let i = 1; i > 5; i++){
          count.push(i)
        }
      }
      return count
    },

    nextPage() {
      let next = +this.currentPage + 1
      return this.changePage(next)
    },
    previosPage() {
      let previous = +this.currentPage - 1
      return this.changePage(previous)
    }
  },  
  computed: {
    ...mapState(useGgStore, ["listGames", "currentPage", "totalPages", "showPage"]),
  },
  mounted() {
    let page = this.$route.query.page ? this.$route.query.page : ''
    let name = this.$route.query.name ? this.$route.query.name : ''
    this.fetchAllFreeGames({ page, name })
  }
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
            <RouterLink to="/collections" class="btn btn-dark my-2"
              >Your Collections</RouterLink
            >
            <span>
              <a @click.prevent="getLogout" class="btn btn-danger my-2"
                >Logout</a
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
        <div class="mt-5">
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="currentPage == 1 ? 'disabled' : ''">
                <a @click="previosPage" href="#" class="page-link">Previous</a>
              </li>
              <li v-for="page in showPage" class="page-item">
                <a @click="changePage(page)" class="page-link" :class="+currentPage === +page ? 'active' : '' " href="#">{{
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
      <p class="float-end mb-1">
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
