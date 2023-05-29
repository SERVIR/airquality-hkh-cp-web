<template>
  <v-app>
    <app-header
      :isMobile="isMobile"
      :isNavigationDrawerOpen="isNavigationDrawerOpen"
      @toggleNavigationDrawer="isNavigationDrawerOpen = !isNavigationDrawerOpen"
    />

    <v-navigation-drawer v-if="isMobile" v-model="isNavigationDrawerOpen" color="primary" location="right">
      <app-header-nav :isMobile="isMobile" />
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { width } = useDisplay();
const isMobile = computed(() => width.value < 900);

const isNavigationDrawerOpen = ref(false);
</script>

<style lang="scss"></style>
