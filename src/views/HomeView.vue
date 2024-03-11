<template>
    <Home />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Home from '../components/HomePage.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    Home,
  },
});
</script>