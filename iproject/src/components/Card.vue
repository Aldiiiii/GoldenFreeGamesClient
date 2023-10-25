<script>
import { mapActions } from 'pinia'
import { useGgStore } from '../stores/goldenGames'

export default {
  props: ['game', 'wishlist'],
  data() {
    return {
      title: '',
      thumbnail: '',
      genre: '',
      id: '',
      developer: '',
      platform: ''
    }
  },
  methods: {
    ...mapActions(useGgStore, ['addWishlist']),

    viewDetail(id) {
      this.$router.push('/products/' + id)
    },
    handleAddWishlist(productId) {
      this.addWishlist(productId)
    }
  },
  created() {
    if (this.$route.path === '/') {
      this.title = this.game.title
      this.thumbnail = this.game.thumbnail
      this.genre = this.game.genre
      this.id = this.game.id
      this.developer = this.game.developer
      this.platform = this.game.platform
    } 
    // else if (this.$route.path === '/products') {
    //   this.name = this.item.name
    //   ;(this.imgUrl = this.item.imgUrl),
    //     (this.CategoryName = this.item.Category.name),
    //     (this.id = this.item.id),
    //     (this.price = this.item.price)
    // }
  }
}
</script>

<template>
  <div class="col">
    <div class="card shadow-sm" style="width: 100%;
    margin-bottom: 0px;
    background: #ffffff;
    box-shadow: 1px 1px 1px #dfdfdf;
    box-sizing: border-box;
    height: 100% !important;">
      <img
        :src="thumbnail"
        class="bd-placeholder-img card-img-top"
        style="max-width: 100%; height: auto;"
      />
      <div class="card-body">
        <strong>{{ title }}</strong>
        <p class="card-text">
          <small class="text-body-secondary">{{ genre }}</small>
        </p>
        <p class="card-text">{{ developer }}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button
              @click.prevent="viewDetail(id)"
              type="button"
              class="btn btn-sm btn-outline-secondary"
            >
              View detail
            </button>
            <button
              v-if="this.$route.path !== '/wishlist'"
              @click.prevent="handleAddWishlist(id)"
              type="button"
              class="btn btn-sm btn-outline-secondary"
            >
              🖤 Wishlist
            </button>
          </div>
          <small class="text-body-secondary">{{ platform }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
