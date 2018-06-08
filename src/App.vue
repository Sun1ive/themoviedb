<template>
  <v-app>
    <Toolbar />
    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Toolbar from '@/components/Toolbar.vue';

export default Vue.extend({
  components: { Toolbar },
});
</script>


<style lang="stylus">
</style>
