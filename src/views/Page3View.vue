<template>
  <v-container fluid class="pa-0 ma-0" style="background-color:#c2c2c2;height:100%">
      <v-row class="text-center pa-0 ma-0">
        <router-link to="/" class="pa-0 ma-0"><arrowback /></router-link>
      </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import arrowback from '../components/ArrowBack.vue'

export default defineComponent({
  name: 'Page3View',
  components: {
    arrowback
  }
});

</script>
<style>
</style>