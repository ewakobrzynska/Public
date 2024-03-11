<template>
  <v-app>
    <v-main class="pa-0 ma-0">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition" :mode="route.meta.mode">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
<style>
</style>
