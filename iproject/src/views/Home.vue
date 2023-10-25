<script>
import { useGgStore } from '../stores/goldenGames';
import { mapActions } from 'pinia';

export default {
    methods: {
        ...mapActions(useGgStore, ['getLogout'])
    }
}
</script>

<template>
    <h1>Home</h1>
    <a @click.prevent="getLogout">Logout</a>
</template>