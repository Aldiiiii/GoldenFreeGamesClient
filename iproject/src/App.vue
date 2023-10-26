<script>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  created(){
    console.log(this.$route)
  }
}
</script>

<template>
  <Navbar v-if="this.$route.path !== '/login' && this.$route.path !== '/register'" />
  <RouterView />
</template>