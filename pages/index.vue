<template>
  <div class="home-page">
    <home-map-container v-show="!sharedState.chart.isFullscreen" ref="mapContainer" />
    <home-map-action-fullscreen v-if="!sharedState.chart.isFullscreen" />
    <home-map-action-search
      v-if="!sharedState.chart.isFullscreen"
      :addSearchedLocationMarker="mapContainer?.addSearchedLocationMarker"
    />

    <!-- Mobile -->
    <v-bottom-navigation v-if="sharedState.isMobile" height="60">
      <app-dialog value="mapControl" :label="$t('map.mapControl')" icon="mdi-map-outline">
        <home-map-controls :mapContainer="mapContainer" />
      </app-dialog>
      <app-dialog value="chart" :label="$t('dictionary.chart')" icon="mdi-chart-bar">
        <HomeChartLocations />
        <HomeChartContainer />
        <HomeChartSources />
      </app-dialog>
    </v-bottom-navigation>

    <!-- Desktop -->
    <template v-else>
      <v-expansion-panels
        v-if="!sharedState.chart.isFullscreen"
        v-model="openExpansionPanels"
        class="home-map-controls"
      >
        <v-expansion-panel :title="$t('map.mapControl')" value="map-controls">
          <v-expansion-panel-text>
            <home-map-controls :mapContainer="mapContainer" />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <div class="home-chart-desktop" :class="{ 'home-chart-desktop-fullscreen': sharedState.chart.isFullscreen }">
        <div class="home-chart-container" v-if="sharedState.chart.isShow">
          <HomeChartLocations />
          <div class="d-flex flex-column flex-grow-1 pr-6">
            <HomeChartContainer />
            <HomeChartSources />
          </div>
        </div>
        <home-chart-actions v-if="!sharedState.chart.hideActions" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { TAB_ID_RECENT, RECENT } from "@/data/tabs";
import layers from "@/data/layers";
import sources from "@/data/sources";
import { locationService } from "@/services";
import moment from "moment";

const sharedState = reactive({
  tabId: TAB_ID_RECENT,
  timezone: "UTC",
  startDate: `${RECENT.startDate} 00:00:00`,
  endDate: `${RECENT.endDate} 23:59:59`,
  layers,
  animation: {
    repeat: false,
    fps: 1,
    date: moment().format("YYYY-MM-dd") + " 12:30 AM",
  },
  locations: [],
  chart: {
    isShow: false,
    isFullscreen: false,
    hideActions: false,
  },
  sources,
  isMobile: false,
});

provide("sharedState", sharedState);

// locations
onBeforeMount(async () => {
  sharedState.locations = await locationService.getChartLocations();
});

const mapContainer = ref(null);
const openExpansionPanels = ref(["map-controls"]);
const { width } = useDisplay();

watch(width, (width) => (sharedState.isMobile = width < 900), { immediate: true });
</script>

<style lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;

  #map {
    flex-grow: 1;
    z-index: 0;
  }

  .map-action-fullscreen {
    top: 116px;
  }

  .home-map-controls {
    position: absolute;
    top: 8px;
    right: 24px;
    width: 348px;

    .v-expansion-panel-text__wrapper {
      padding: 0px;
    }
  }

  .home-chart-desktop {
    display: flex;
    flex-direction: column;

    .home-chart-container {
      height: 300px;
      display: flex;

      .chart-locations {
        padding: 24px 12px 0px 12px;

        .chart-legend {
          margin-bottom: 16px;

          .legend-item {
            margin: 8px 0px;
          }
        }
      }
    }
    .chart-actions {
      height: 56px;
      padding: 12px 24px 12px 24px;
    }

    &.home-chart-desktop-fullscreen {
      height: 100%;

      .home-chart-container {
        height: auto;
        flex: 1;
        flex-direction: column;

        .chart-locations {
          flex-direction: row !important;
          justify-content: center;

          .chart-legend {
            display: flex;
            gap: 24px;
            width: initial;
            margin-bottom: 0px;
            margin-right: 32px;
          }
        }
      }
    }
  }
}
</style>
