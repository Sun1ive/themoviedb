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
      >
        <v-card class="mycard">
          <v-card-media
            :src="`http://image.tmdb.org/t/p/w200/${movie.poster_path}`"
            class="mycard__media"
            height="350"
          ><div class="overflow" @click="$router.push(`/${movie.id}`)"/></v-card-media>
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
          <v-card-actions style="margin-top: auto">
            <v-btn flat fab @click="addToFavorites(movie.id)">
              <v-icon
                :color="isFavorite(movie.id)"
                large
              >star</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import * as T from '@/Types/index.d.ts';
import LocalStorage from '@/utils';

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
    const favorites = LocalStorage.get('favoriteMovies');
    this.$store.commit('setFavorites', favorites);
  },
  methods: {
    addToFavorites(id: number) {
      const favorites = LocalStorage.get('favoriteMovies');
      if (!favorites) {
        const favArr: number[] = [];
        favArr.push(id);
        LocalStorage.set('favoriteMovies', favArr);
      } else {
        favorites.push(id);
        LocalStorage.set('favoriteMovies', favorites);
      }
      this.$store.commit('addToFavorite', id);
    },
    isFavorite(id: number): string {
      const favorites = LocalStorage.get('favoriteMovies');
      if (favorites) {
        return favorites.includes(id) ? 'orange' : 'grey';
      }
      return 'grey';
    },
  },
});
</script>

<style lang="stylus" scoped>
.mycard
  min-height: 650px;
  transition .2s linear
  justify-content space-between
  display flex
  flex-flow column
  .mycard__media
    position relative
  .overflow
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-color #fff
    z-index 5
    opacity 0
    transition .2s
    &:hover
      opacity 0.2
  &:hover
    cursor pointer
    box-shadow 0 2px 10px lightblue + 50%
  .genres
    font-weight bold
    color blue + 30%
.search__box
  padding .5rem 3rem
  margin-bottom 2rem

</style>
