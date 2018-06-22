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
            <v-btn flat fab @click="handleFavorites(movie.id)">
              <v-icon
                :color="$store.getters.getFavorites.indexOf(movie.id) > -1 ? 'orange' : 'grey'"
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
          v-model="page"
        />
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
    page: 1 as number,
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
    getFavorites(): number[] {
      return this.$store.getters.getFavorites;
    },
    getPages(): number {
      return this.$store.getters.getPages;
    },
  },
  methods: {
    handleFavorites(id: number) {
      if (this.getFavorites.indexOf(id) !== -1) {
        this.$store.commit('removeFromFavorite', id);
      } else {
        this.$store.commit('addToFavorite', id);
      }
      LocalStorage.set('favoriteMovies', this.getFavorites);
    },
  },
});
</script>

<style lang="stylus" scoped>

</style>
