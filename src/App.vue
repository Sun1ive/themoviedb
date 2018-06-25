<template>
  <v-app>
    <Toolbar />
    <v-content fill-height>
      <v-container fluid>
        <transition name="slide" mode="out-in">
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
  transition .15s

.slide-enter-active
  animation-name slideRight
.slide-leave-active
  animation-name slideLeft
.slide-enter-active,
.slide-leave-active
  animation-duration .65s
  animation-fill-mode forwards

@keyframes slideLeft {
  from {
    transform translateX(0)
    opacity 1
  } to {
    transform translateX(30%)
    opacity 0
  }
}
@keyframes slideRight {
  from {
    transform translateX(30%)
    opacity 0
  } to {
    transform translateX(0%)
    opacity 1
  }
}
</style>
