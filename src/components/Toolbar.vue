<template>
  <v-toolbar color="primary">
    <v-toolbar-title class="white--text">Find movies</v-toolbar-title>
    <v-spacer />
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn dark flat to="/">Home</v-btn>
      <v-btn dark flat to="/favorites">Favorites</v-btn>
    </v-toolbar-items>
    <v-spacer />
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>
