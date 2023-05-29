<template>
  <v-dialog v-model="isOpen" scrollable transition="dialog-bottom-transition">
    <template #activator="{ props }">
      <v-btn v-bind="props" value="map-control">
        <v-icon>{{ icon }}</v-icon>
        {{ label }}
      </v-btn>
    </template>

    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ label }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="isOpen = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title>
        <slot />
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  label: String,
  icon: String,
});

const isOpen = ref(false);
</script>

<style lang="scss"></style>
