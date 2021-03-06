<template>
  <v-container fluid fill-height>
    <v-layout
      v-if="favoritesList.length > 0"
      justify-center
      align-center
      wrap
    >
      <transition-group
        name="slideDown"
        mode="out-in"
        tag="div"
        class="layout align-center justify-center wrap"
      >
        <v-flex
          v-for="movie in favoritesList"
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
      </transition-group>
    </v-layout>
    <v-layout v-else justify-center>
      <v-flex xs10 sm6 lg4>
        <v-card>
          <v-card-title style="justify-content: center;">
            <h1>No favorites selected :(</h1>
          </v-card-title>
        </v-card>
        <v-card-actions style="justify-content: center;">
          <v-btn to="/" color="primary">Back to movies</v-btn>
        </v-card-actions>
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
      return this.$store.getters.getMovies.filter(
        (m: T.IMovie) => this.getFavorites.indexOf(m.id) > -1,
      );
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
      }
      LocalStorage.set('favoriteMovies', this.getFavorites);
    },
  },
});
</script>

<style lang="stylus" scoped>
.slideDown-enter-to, .slideDown-leave-active
  animation slide 1s
  transition 1s ease

@keyframes slide {
  from {
    transform translateY(0)
    opacity 1
  } to {
    transform translateY(100%)
    opacity 0
  }
}
</style>
