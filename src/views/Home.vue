<template>
  <v-container>
    <v-layout
      v-if="getMovies.length > 0"
      justify-center
      align-center
      wrap
    >
      <v-flex
        v-for="movie in getMovies"
        :key="movie.id"
        xs11 sm4 md3 lg2
        class="mx-2 my-2"
      >
        <v-card class="mycard">
          <v-card-media
            :src="`http://image.tmdb.org/t/p/w200/${movie.poster_path}`"
            height="350"
          />
          <v-card-title>
            <b>{{ movie.title }}</b>
          </v-card-title>
          <v-card-text>
            <div
              v-for="item in movie.genre_ids"
              :key="item"
              class="genres"
            >
              #{{ getGenres.find(x => x.id === item).name }}
            </div>
          </v-card-text>
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
    getGenres(): T.IGenre[] {
      return this.$store.getters.getGenres;
    },
  },
  created() {
    this.$store.dispatch('fetchData');
  },
});
</script>

<style lang="stylus" scoped>
.mycard
  min-height: 550px;
  transition .2s linear
  &:hover
    cursor pointer
    transform scale(1.02)
    box-shadow 0 2px 10px lightblue + 50%
  .genres
    font-weight bold
    color blue + 30%

</style>
