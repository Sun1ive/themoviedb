<template>
  <v-app>
    <Toolbar />
    <v-content>
      <v-container>
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
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
#app
  background-image url('http://www.designbolts.com/wp-content/uploads/2013/02/crafted-paper-pattern-Grey-Seamless-Pattern-For-Website-Background.jpg')
  background-repeat repeat

.fade-enter, .fade-leave-to
  opacity 0
.fade-enter-active, .fade-leave-active
  transition .5s
</style>
