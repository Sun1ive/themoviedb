<template>
  <v-app>
    <Toolbar />
    <v-content fill-height>
      <v-container>
        <transition name="fade" mode="out-in">
          <Loader
            v-if="loading"
            :animation-duration="2000"
            :size="100"
            style="margin: 0 auto;"
            color="#1976D2"
          />
          <router-view v-else/>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Toolbar from '@/components/Toolbar.vue';
import Loader from '@/components/Loader.vue';

export default Vue.extend({
  components: { Toolbar, Loader },
  computed: {
    loading(): boolean {
      return this.$store.getters.isLoading;
    },
  },
});
</script>


<style lang="stylus">
#app
  background-image url('./assets/bg.jpg')
  background-repeat repeat

.fade-enter, .fade-leave-to
  opacity 0
.fade-enter-active, .fade-leave-active
  transition .5s
</style>
