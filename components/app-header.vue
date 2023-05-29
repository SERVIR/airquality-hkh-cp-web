<template>
  <v-app-bar :class="props.isMobile ? 'px-3' : 'px-6'" dark app color="primary">
    <router-link to="/">
      <img src="/logo.png" class="app-logo" :class="{ 'app-logo-mobile': props.isMobile }" />
    </router-link>

    <v-app-bar-title class="flex text-center" :style="{ 'font-size': `${props.isMobile ? 16 : 20}px` }">
      {{ $t("header.title") }}
    </v-app-bar-title>

    <v-app-bar-nav-icon
      v-if="props.isMobile"
      :icon="isNavigationDrawerOpen ? 'mdi-close' : '$menu'"
      @click="$emit('toggleNavigationDrawer')"
    />
    <app-header-nav v-else />
  </v-app-bar>
</template>

<script setup>
const props = defineProps({
  isMobile: { type: Boolean },
  isNavigationDrawerOpen: { type: Boolean },
});
const $emit = defineEmits(["toggleNavigationDrawer"]);
</script>

<style lang="scss">
.v-app-bar {
  .v-toolbar__content {
    .app-logo {
      margin-top: 10px;
      width: 120px;
      height: 30px;
      object-fit: contain;

      &.app-logo-mobile {
        width: 80px;
      }
    }

    .v-btn:last-child {
      margin: 0px;
    }
  }
}
</style>
