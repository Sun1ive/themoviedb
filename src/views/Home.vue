<template>
  <v-container fluid>
    <v-snackbar
      :color="color"
      :timeout="timeout"
      v-model="status"
      top
    >
      {{ message }}
    </v-snackbar>
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
            :src="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`"
            class="mycard__media"
            height="350"
          ><div class="overflow" @click="$router.push(`/movie/${movie.id}`)"/></v-card-media>
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
            <v-btn flat fab @click="handleFavorites(movie.id)">
              <v-icon
                :color="$store.getters.isFavorite(movie.id)"
                large
              >star</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs10 sm6>
        <v-pagination
          :length="getPages"
          :total-visible="15"
          :value="page"
          @input="fetchNextPage"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import * as T from '@/Types/index.d.ts';
import LocalStorage from '@/utils';
import Snackbar from '../mixins/Snackbar';

export default Vue.extend({
  mixins: [Snackbar],
  data: () => ({
    query: '' as string,
  }),
  computed: {
    getMovies(): T.IMovie[] {
      if (this.query.length > 0) {
        return this.$store.getters.getMovies.filter((m: T.IMovie) =>
          m.title.toLowerCase().includes(this.query.toLowerCase()),
        );
      }
      return this.$store.getters.getMovies;
    },
    getGenres(): T.IGenre[] {
      return this.$store.getters.getGenres;
    },
    getFavorites(): number[] {
      return this.$store.getters.getFavorites;
    },
    getPages(): number {
      return this.$store.getters.getPages;
    },
    page(): number {
      return this.$store.getters.currentPage;
    },
  },
  methods: {
    handleFavorites(id: number) {
      if (this.getFavorites.indexOf(id) !== -1) {
        this.$store.commit('removeFromFavorite', id);
        // @ts-ignore
        this.message = 'Successfully removed from favorites';
        // @ts-ignore
        this.status = true;
      } else {
        this.$store.commit('addToFavorite', id);
        // @ts-ignore
        this.message = 'Successfully added to favorites';
        // @ts-ignore
        this.status = true;
      }
      LocalStorage.set('favoriteMovies', this.getFavorites);
    },
    fetchNextPage(value: number) {
      this.$store.commit('setPage', value);
      this.$store.dispatch('fetchData');
    },
  },
});
</script>

<style lang="stylus" scoped>
.search__wrapper
  padding 0.5rem 1.5rem
</style>
