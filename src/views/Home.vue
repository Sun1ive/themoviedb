<template>
  <v-container v-if="getMovies.length > 0">
    <v-layout justify-center align-center wrap>
      <v-flex
        v-for="movie in getMovies"
        :key="movie.id"
        xs11 sm4 md2
        class="mx-2 my-2"
      >
        <v-card class="mycard">
          <v-card-media
            :src="`http://image.tmdb.org/t/p/w200/${movie.poster_path}`"
            height="350"
          />
          <v-card-title>{{ movie.title }}</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import * as T from '@/Types/index.d.ts';

export default Vue.extend({
  computed: {
    getMovies(): T.IMovie[] {
      return this.$store.getters.getMovies;
    },
  },
  created() {
    this.$store.dispatch('fetchData');
  },
});
</script>

<style lang="stylus" scoped>
.mycard
  min-height 440px
</style>
