<template>
  <v-container>
    <!-- <v-layout justify-center align-center>
      <v-flex xs10>
        <v-text-field
          v-model.lazy.trim="query"
          class="search__input"
          label="Search"
          prepend-icon="search"
        />
      </v-flex>
    </v-layout> -->
    <v-layout
      v-if="favoritesList.length > 0"
      justify-center
      align-center
      wrap
    >
      <v-flex
        v-for="movie in favoritesList"
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
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import * as T from '@/Types/index.d.ts';
import LocalStorage from '@/utils';

export default Vue.extend({
  computed: {
    favoritesList(): T.IMovie[] {
      return this.$store.getters.getMovies.filter((m: T.IMovie) => this.getFavorites.indexOf(m.id) > -1);
    },
    getFavorites(): number[] {
      return this.$store.getters.getFavorites;
    },
    getGenres(): T.IGenre[] {
      return this.$store.getters.getGenres;
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
