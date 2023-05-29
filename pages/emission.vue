<template>
  <div class="emission-page">
    <div id="map"></div>

    <v-bottom-navigation v-if="sharedState.isMobile" height="60">
      <app-dialog :label="$t('map.mapControl')" icon="mdi-map-outline">
        <emission-map-controls class="px-8 py-6" />
      </app-dialog>
      <app-dialog :label="$t('dictionary.information')" icon="mdi-information-box-outline">
        <emission-information class="pa-6" />
      </app-dialog>
      <app-dialog :label="$t('dictionary.chart')" icon="mdi-chart-bar">
        <emission-chart />
      </app-dialog>
    </v-bottom-navigation>

    <div v-else>
      <v-expansion-panels v-model="expansionPanelOpenItems" multiple>
        <!-- Map Controls -->
        <v-expansion-panel color="primary" :title="$t('map.mapControl')" value="mapControls">
          <v-expansion-panel-text>
            <emission-map-controls class="pt-2" />
          </v-expansion-panel-text>
        </v-expansion-panel>
        <!-- Information -->
        <v-expansion-panel color="primary" :title="$t('dictionary.information')" value="information">
          <v-expansion-panel-text>
            <emission-information />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <!-- Chart -->
      <v-expand-transition>
        <v-card v-show="sharedState.chart.isOpen" class="emission-chart-card px-1 py-4" width="540" height="320">
          <emission-chart />
        </v-card>
      </v-expand-transition>
      <v-btn
        class="emission-chart-activator"
        color="primary"
        size="large"
        width="540"
        @click="sharedState.chart.isOpen = !sharedState.chart.isOpen"
      >
        {{ $t(`chart.${sharedState.chart.isOpen ? "hideChart" : "showChart"}`) }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import * as mapHandlers from "@/map";
import { useDisplay } from "vuetify";
import { getLayerConfig, getInformation } from "@/utils/emission-utils";

const sharedState = ref({
  mapControls: {
    inventory: "REAS",
    pollutant: "PM2p5",
    sector: "Industry",
    year: "2005",
  },
  information: {
    isLoading: false,
    sum: 0,
    minimum: 0,
    maximum: 0,
    mean: 0,
    standardDeviation: 0,
  },
  chart: {
    isOpen: true,
    isLoading: true,
  },
  isMobile: false,
});

provide("sharedState", sharedState);

let map;

const handleLayerChange = () => {
  const { url, config } = getLayerConfig(sharedState.value.mapControls);
  mapHandlers.clearAllMapLayersExceptBaseLayer(map);
  mapHandlers.addWmsLayer({ map, url, config });
};

const handleInformation = async () => {
  const { mapControls, information } = sharedState.value;
  information.isLoading = true;
  sharedState.value.information = {
    isLoading: false,
    ...(await getInformation(mapControls)),
  };
};

onMounted(() => {
  map = mapHandlers.createMap();
  handleLayerChange();
  handleInformation(sharedState.value.mapControls);
});

watch(
  () => sharedState.value.mapControls,
  (mapControls) => {
    handleLayerChange();
    handleInformation(mapControls);
  },
  { deep: true }
);

// Misc
const expansionPanelOpenItems = ref(["mapControls", "information"]);
const { width } = useDisplay();
watch(width, (width) => (sharedState.value.isMobile = width < 900), { immediate: true });
</script>

<style lang="scss">
.emission-page {
  height: 100%;
  position: relative;

  #map {
    height: 100%;
    z-index: 0;
  }

  .v-expansion-panels {
    position: absolute;
    top: 0px;
    right: 24px;
    width: 340px;

    .v-expansion-panel {
      margin-top: 8px;

      .v-expansion-panel-text {
        .v-expansion-panel-text__wrapper {
          padding-bottom: 4px;
        }
      }
    }
  }

  .emission-chart-card {
    position: absolute;
    bottom: 60px;
    left: 16px;
  }
  .emission-chart-activator {
    position: absolute;
    bottom: 16px;
    left: 16px;
  }
}
</style>
