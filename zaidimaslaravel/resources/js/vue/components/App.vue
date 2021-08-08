<template>
  <div id="app">
    <game/>
  </div>
</template>

<script>

import Vue from "vue";

export default {
  name: 'App',
  components: {
    Game: () => import('./Game')
  },
  data() {
    return {
      game: {
        id: '',
        finished: '',
        slot: '',
        action: ''
      }
    }
  },

}
</script>

<style>
:root {
  --theme-color: 64, 64, 64;
  --gradient-color-base: 0, 102, 51;
}

body {
  margin: 0;
}
</style>
