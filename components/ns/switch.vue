<template>
  <v-switch color="primary" class="flex-grow-0" density="compact" hide-details />
</template>

<script setup></script>

<style lang="scss">
$height: 20px;

.v-switch {
  height: $height;

  .v-selection-control {
    min-height: $height;
    height: $height;

    .v-selection-control__wrapper {
      height: $height;

      .v-selection-control__input {
        height: $height;
      }
    }

    .v-label {
      height: 16px;
      line-height: 16px;
      color: black;
      margin-top: -3px;
    }
  }
}
</style>
