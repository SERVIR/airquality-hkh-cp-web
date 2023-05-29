<template>
  <div class="map-control d-flex justify-center align-center">
    <v-icon :icon="icon" />
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss">
.map-control {
  position: absolute;
  left: 12px;
  width: 30px;
  height: 30px;
  background: white;
  border: 2px solid #c0beb8;
  border-radius: 4px;
  cursor: pointer;

  .v-icon {
    font-size: 20px;
  }
}
</style>
