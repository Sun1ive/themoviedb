<template>
  <v-container>
    <v-layout>
      <v-flex xs10 md8 sm6>
        <v-card>
          <v-card-media
            :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
            height="400"
          />
          <v-card-text>
            <div><b>Genres:</b></div>
            <div
              v-for="item in movie.genre_ids"
              :key="item"
              class="genres"
            >
              # {{ getGenres.find(x => x.id === item).name }}
            </div>
          </v-card-text>
          <v-card-text>
            <div>
            <v-icon class="mr-2">text_fields</v-icon><b>Original language:</b> {{ movie.original_language }}</div>
            <div>
            <v-icon class="mr-2">title</v-icon><b>Original title:</b> {{ movie.original_title }}</div>
            <div>
            <v-icon class="mr-2">description</v-icon><b>Сюжет:</b> {{ movie.overview }}</div>
            <div>
            <v-icon class="mr-2">star</v-icon><b>Рейтинг:</b> {{ movie.vote_average }}</div>
            <div>
            <v-icon class="mr-2">date_range</v-icon><b>Дата выхода:</b> {{ movie.release_date }}</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { IMovie, IGenre } from '@/Types/index.d.ts';

export default Vue.extend({
  data: () => ({
    movie: {} as IMovie,
  }),
  computed: {
    getMovies(): IMovie[] {
      return this.$store.getters.getMovies;
    },
    getGenres(): IGenre[] {
      return this.$store.getters.getGenres;
    },
  },
  created() {
    const { id } = this.$route.params;
    // @ts-ignore
    this.movie = this.getMovies.find((m: IMovie) => m.id === parseInt(id, 0));
  },
});
</script>
