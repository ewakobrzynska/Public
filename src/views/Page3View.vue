<template>
  <v-container fluid class="pa-0 ma-0" style="background-color:#c2c2c2;height:100%">
      <v-row class="text-center pa-0 ma-0">
        <router-link to="/" class="pa-0 ma-0"><div class="arrowback"></div></router-link>
      </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Page3View',
});

</script>
<style>
.arrowback{
    position: absolute;
    background-size: cover;
    background-position: 50% 50%;
    background-image: url("../assets/arrowback.png");
    height: 60px;
    width: 60px;
    top:8px;
    left: 2px;
}
.arrowback:hover{
  transform: scale(1.12);
  transition: 0.4s;
}
</style>