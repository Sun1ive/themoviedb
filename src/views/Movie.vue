<template>
  <v-container>
    <v-layout v-if="movie" justify-space-between>
      <v-flex xs10 sm8 md7 class="mr-2">
        <v-card>
          <v-card-title>
            <h2>{{ movie.title }}</h2>
          </v-card-title>
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
          <v-card-actions>
            <v-icon large color="orangered">star</v-icon>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex lg3>
        <v-layout>
          <v-flex>
            <h3>Recommendations</h3>
          </v-flex>
        </v-layout>
        <v-layout
          v-for="movie in recommendations"
          :key="movie.id"
          class="my-2"
        >
          <v-flex>
            <v-card>
              <v-card-media :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" height="300"/>
              <v-card-title>
              <v-icon class="mr-2">title</v-icon>Title: <strong>{{ movie.title }}</strong></v-card-title>
              <v-card-text>
              <v-icon class="mr-2">star</v-icon>Rating: {{ movie.vote_average }}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { IMovie, IGenre } from '@/Types/index.d.ts';

export default Vue.extend({
  data: () => ({
    movie: null as IMovie | null,
    recommendations: null as IMovie[] | null,
  }),
  computed: {
    getMovies(): IMovie[] {
      return this.$store.getters.getMovies;
    },
    getGenres(): IGenre[] {
      return this.$store.getters.getGenres;
    },
  },
  async created() {
    const { id } = this.$route.params;
    this.recommendations = await this.$store.dispatch('fetchRecommendations', id);
    // @ts-ignore
    this.movie = this.getMovies.find((m: IMovie) => m.id === parseInt(id, 0));
    if (typeof this.movie === 'undefined') {
      this.$router.push('/');
    }
  },
});
</script>
