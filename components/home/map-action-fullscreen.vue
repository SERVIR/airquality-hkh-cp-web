<template>
  <map-action
    class="map-action-fullscreen"
    :icon="sharedState.chart.hideActions ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
    @click="setChartHideActions"
  />
</template>

<script setup>
const sharedState = inject("sharedState");

const setChartHideActions = () => {
  sharedState.chart.isShow = false;
  sharedState.chart.isFullscreen = false;
  sharedState.chart.hideActions = !sharedState.chart.hideActions;
};
</script>

<style lang="scss"></style>
