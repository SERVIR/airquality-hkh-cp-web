<template>
  <v-tabs class="map-controls-tabs" v-model="sharedState.tabId">
    <v-tab v-for="tab in TABS" :key="tab.id" class="flex-grow-1" density="compact" :value="tab.id">
      {{ $t(`dictionary.${tab.id.toLowerCase()}`) }}
    </v-tab>
  </v-tabs>

  <v-window v-model="sharedState.tabId" class="h-100">
    <v-window-item class="py-2" v-for="tab in TABS" :key="tab.id" :value="tab.id">
      <HomeMapControlsTimezone />
      <HomeMapControlsDatepickers />
      <HomeMapControlsAnimation v-if="sharedState.tabId != TAB_ID_RECENT" />
      <HomeMapControlsLayers />

      <!-- Footer -->
      <div class="d-flex justify-space-between mt-2 px-4">
        <v-btn
          class="font-weight-bold"
          prepend-icon="mdi mdi-download"
          variant="text"
          :loading="isMapDownloading"
          @click="downloadMap"
        >
          {{ $t("map.downloadMap") }}
        </v-btn>
        <v-btn
          class="font-weight-bold"
          prepend-icon="mdi mdi-sync"
          variant="text"
          @click="() => props.mapContainer?.refreshMap()"
        >
          {{ $t("map.refreshMap") }}
        </v-btn>
      </div>
    </v-window-item>
  </v-window>
</template>

<script setup>
import { TABS, TAB_ID_RECENT } from "@/data/tabs";

const sharedState = inject("sharedState");
const props = defineProps({
  mapContainer: Object,
});

const isMapDownloading = ref(false);
const downloadMap = async () => {
  isMapDownloading.value = true;
  nextTick(async () => {
    await props.mapContainer?.downloadMap();
    isMapDownloading.value = false;
  });
};
</script>

<style lang="scss">
.map-controls-tabs {
  height: 32px;

  .v-tab {
    height: 32px;
    &.v-tab--selected {
      background: var(--color--primary);
      color: white;
      border-radius: 0px;
    }
  }
}
</style>
