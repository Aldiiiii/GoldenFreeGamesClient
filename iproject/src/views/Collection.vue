<script>
import Card from "../components/Card.vue";
import { useGgStore } from "../stores/goldenGames";
import { mapActions, mapState } from "pinia";

export default {
  components: {
    Card,
  },
  computed: {
    ...mapState(useGgStore, ["collections"]),
  },
  methods: {
    ...mapActions(useGgStore, ["fetchCollections"]),
  },
  created() {
    this.fetchCollections();
  },
};
</script>

<template>
  <div class="album py-5 bg-body-tertiary">
    <div class="container">
      <h2
        style="
          text-align: center;
          font-family: Verdana, Geneva, Tahoma, sans-serif;
        "
      >
        Your Games Collections
      </h2>
      <!-- cards -->
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <Card
          v-if="this.$route.path === '/collections'"
          v-for="collection in collections"
          :key="collection.id"
          :collection="collection"
        />
      </div>
    </div>
  </div>
</template>
