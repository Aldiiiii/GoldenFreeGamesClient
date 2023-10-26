<script>
import { mapActions, mapState } from 'pinia'
import { useGgStore } from '../stores/goldenGames'

export default {
  methods: {
    ...mapActions(useGgStore, ['gamesById'])

  },
  computed: {
    ...mapState(useGgStore, ['detailGame'])
  },
  beforeMount() {
    this.gamesById(this.$route.params.id)
  }
}
</script>
<template>
  <div class="justify-content-center" style="display: flex; max-height: 90vh">
    <div class="card mb-3 mt-5" style="width: 85vw; display: flex; align-items: center">
      <div class="row g-0" style="width: 85vw">
        <div class="col-md-4" style="display: flex; justify-content: center;">
          <img
            :src="detailGame.thumbnail"
            class="img-fluid rounded-start"
            style="width: 100%; height: auto;"
            alt="..."
          />
        </div>
        <div class="col-md-8" style="display: flex; align-items: center">
          <div class="card-body">
            <h5 class="card-title">{{ detailGame.title }}</h5>
            <p class="card-text">
              <small class="text-body-secondary">{{ detailGame.genre }}</small>
            </p>
              
            <hr />
            <p class="card-text">{{ detailGame.description }}</p>
            <p class="card-text">Developer: {{ detailGame.developer }}</p>
            <p class="card-text">Release Data: {{ detailGame.release_date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
