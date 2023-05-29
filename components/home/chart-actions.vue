<template>
  <div class="chart-actions d-flex">
    <v-spacer />
    <!-- Chart Download -->
    <home-chart-download />

    <!-- Chart Fullscreen -->
    <v-btn
      class="font-weight-bold mx-2"
      variant="text"
      :prepend-icon="sharedState.chart.isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
      :width="180"
      @click="toggleChartFullscreen"
    >
      {{ $t(`chart.${sharedState.chart.isFullscreen ? "exitFullscreen" : "viewFullscreen"}`) }}
    </v-btn>

    <!-- Chart Show/Hide -->
    <v-btn
      class="font-weight-bold"
      variant="text"
      :prepend-icon="sharedState.chart.isShow ? 'mdi-chevron-down' : 'mdi-chevron-up'"
      :width="140"
      @click="toggleChartShow"
    >
      {{ $t(`chart.${sharedState.chart.isShow ? "hideChart" : "showChart"}`) }}
    </v-btn>
  </div>
</template>

<script setup>
const sharedState = inject("sharedState");

const toggleChartShow = () => {
  sharedState.chart.isShow = !sharedState.chart.isShow;
  if (!sharedState.chart.isShow) sharedState.chart.isFullscreen = false;
};
const toggleChartFullscreen = () => {
  sharedState.chart.isFullscreen = !sharedState.chart.isFullscreen;
  if (sharedState.chart.isFullscreen) sharedState.chart.isShow = true;
};
</script>

<style lang="scss"></style>
