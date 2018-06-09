<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex xs10>
        <v-text-field
          v-model.lazy.trim="query"
          class="search__input"
          label="Search"
          prepend-icon="search"
        />
      </v-flex>
    </v-layout>
    <v-layout
      v-if="getMovies.length > 0"
      justify-center
      align-center
      wrap
    >
      <v-flex
        v-for="movie in getMovies"
        :key="movie.id"
        class="mx-2 my-2"
        xs10 sm4 md3 lg2
        @click="$router.push(`/${movie.id}`)"
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
              # {{ getGenres.find(x => x.id === item).name }}
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
  data: () => ({
    query: '' as string,
  }),
  computed: {
    getMovies(): T.IMovie[] {
      if (this.query.length > 0) {
        return this.$store.getters.getMovies.filter((m: T.IMovie) =>
          m.title.toLowerCase().includes(this.query.toLowerCase()));
      }
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
  min-height: 600px;
  transition .2s linear
  &:hover
    cursor pointer
    transform scale(1.02)
    box-shadow 0 2px 10px lightblue + 50%
  .genres
    font-weight bold
    color blue + 30%
.search__box
  padding .5rem 3rem
  margin-bottom 2rem

.slider-enter-active,
.slider-leave-active
  transition .5s all ease

.slider-enter,
.slider-leave-to
  opacity 0
  transform translate(-30px)

</style>
