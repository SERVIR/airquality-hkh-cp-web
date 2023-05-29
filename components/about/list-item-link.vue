<template>
  <v-list-item>
    <v-list-item-title>
      <a :href="props.link" target="_blank"> {{ props.text }} </a>
    </v-list-item-title>
    <v-list-item-subtitle> {{ props.link }} </v-list-item-subtitle>
  </v-list-item>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss"></style>
