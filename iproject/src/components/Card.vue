<script>
import { mapActions } from "pinia";
import { useGgStore } from "../stores/goldenGames";

export default {
  props: ["game", "collection"],
  data() {
    return {
      title: "",
      thumbnail: "",
      genre: "",
      id: "",
      gamesId: "",
      developer: "",
      platform: "",
      status: "",
    };
  },
  methods: {
    ...mapActions(useGgStore, ["addCollections", "changeStatus", "fetchCollections", "gamesById"]),

    handleChangeStatus(){
      const updateStatus = {
        newStatus: this.status,
        collectionId: this.id
      }
      return this.changeStatus(updateStatus)
    }
    
  },
  created() {
    if (this.$route.path === "/") {
      this.title = this.game.title;
      this.thumbnail = this.game.thumbnail;
      this.genre = this.game.genre;
      this.gamesId = this.game.id;
      this.developer = this.game.developer;
      this.platform = this.game.platform;
    } else if (this.$route.path === "/collections") {
      this.title = this.collection.title;
      this.thumbnail = this.collection.thumbnail;
      this.genre = this.collection.genre;
      this.id = this.collection.id;
      this.gamesId = this.collection.GamesId
      this.developer = this.collection.developer;
      this.platform = this.collection.platform;
      this.status = this.collection.status;
    }
  },
};
</script>

<template>
  <div class="col">
    <div
      class="card shadow-sm"
      style="
        width: 100%;
        margin-bottom: 0px;
        background: #ffffff;
        box-shadow: 1px 1px 1px #dfdfdf;
        box-sizing: border-box;
        height: 100% !important;
      "
    >
      <img
        :src="thumbnail"
        class="bd-placeholder-img card-img-top"
        style="max-width: 100%; height: auto"
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
              @click.prevent="gamesById(gamesId)"
              type="button"
              class="btn btn-sm btn-outline-secondary"
            >
              View detail
            </button>
            <button
              v-if="this.$route.path === '/'"
              @click.prevent="addCollections(game)"
              type="button"
              class="btn btn-sm btn-outline-secondary"
            >
              Add to Collection
            </button>            
            <select v-if="this.$route.path === '/collections'" @change="handleChangeStatus()" v-model="status" class="btn btn-sm btn-outline-secondary">
              <option :selected="status === '-'" disabled>-</option>
              <option value="Currently Playing" :selected="status === `Currently Playing`">Currently Playing</option>
              <option value="Played" :selected="status === `Played`">Played</option>
              <option value="Completed" :selected="status === `Completed`">Completed</option>
              <option value="Play Later" :selected="status === `Play Later`">Play Later</option>
            </select>
          </div>
          <small class="text-body-secondary">{{ platform }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
