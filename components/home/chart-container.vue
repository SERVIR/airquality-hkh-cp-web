<template>
  <div class="chart-container">
    <div id="c3js-chart"></div>
    <v-overlay :model-value="loading" contained class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="64" />
    </v-overlay>
  </div>
</template>

<script setup>
import c3 from "c3";

import getChartData from "@/utils/home-chart/get-chart-data";
import getChartConfig from "@/utils/home-chart/get-chart-config";

const loading = ref(true);
const sharedState = inject("sharedState");

let chart;

const refreshChart = () => {
  if (chart) {
    try {
      chart?.destroy();
    } catch (error) {
      console.log(error);
    }
    document.getElementById("c3js-chart").setAttribute("style", "");
  }

  setTimeout(async () => {
    loading.value = true;
    try {
      const chartData = await getChartData(sharedState);
      const chartConfig = await getChartConfig(chartData);
      window.HOME_PAGE_CHART = chart = c3.generate(chartConfig);
    } catch (error) {
      console.log(error);
    }
    loading.value = false;
  }, 100);
};

watch(
  () => ({
    locations: sharedState.locations.filter((source) => source.selected).map((source) => source.show),
    sources: sharedState.sources.map((source) => source.selected),
    isFullscreen: sharedState.chart.isFullscreen,
  }),
  refreshChart,
  { deep: true }
);

onMounted(refreshChart);
</script>

<style lang="scss">
@import "c3/c3.min.css";

.chart-container {
  height: 100%;
  min-height: 220px;
  flex-grow: 1;
  position: relative;

  #c3js-chart {
    height: 100%;
  }

  .v-overlay__scrim {
    background: transparent;
  }
}

.c3-region {
  &.region-1 {
    fill: rgb(0, 228, 0);
    fill-opacity: 1 !important;
  }
  &.region-2 {
    fill: rgb(255, 255, 0);
  }
  &.region-3 {
    fill: rgb(255, 126, 0);
  }
  &.region-4 {
    fill: rgb(255, 0, 0);
  }
  &.region-5 {
    fill: rgb(143, 63, 151);
  }
  &.region-6 {
    fill: rgb(126, 0, 35);
  }
}
</style>
