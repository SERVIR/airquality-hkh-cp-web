<template>
  <div class="chart-locations d-flex flex-column align-center">
    <div class="chart-legend">
      <div class="legend-item" v-for="location in locations" :key="location.name">
        <ns-switch v-model="location.show" @click="onLegendItemClick(location)" />
        <div class="legend-item-color" :style="{ background: location.color }" @click="onLegendItemClick(location)" />
        <div @click="onLegendItemClick(location)">{{ location.name }}</div>
      </div>
    </div>

    <v-dialog v-model="isDialogOpen" scrollable width="420">
      <template #activator="{ props }">
        <v-btn
          class="manage-location-btn font-weight-bold bg-primary mt-2"
          prepend-icon="mdi-plus"
          color="primary"
          v-bind="props"
        >
          {{ $t("chart.manageLocations") }}
        </v-btn>
      </template>

      <v-card>
        <v-card-title>{{ $t("chart.addLocation") }}</v-card-title>

        <v-card-text>
          <v-text-field
            v-model="search"
            variant="outlined"
            prepend-inner-icon="mdi-magnify"
            density="compact"
            clearable
            :label="$t('chart.searchLocation')"
            :error-messages="filteredLocations.length == 0 ? $t('chart.noLocationFoundMessage') : ''"
            @click:clear="search = ''"
          />
          <div style="height: 300px; overflow-y: auto">
            <v-checkbox
              v-for="location in filteredLocations"
              :key="location"
              v-model="selectedLocationIds"
              :value="location.id"
              color="primary"
              density="compact"
              :label="location.name"
              :disabled="!selectedLocationIds.includes(location.id) && selectedLocationIds.length == 4"
              hide-details
            />
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="isDialogOpen = false">{{ $t("dictionary.close") }}</v-btn>
          <v-btn color="primary" @click="setLocations">{{ $t("dictionary.apply") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { CHART_COLORS } from "@/data/chart";

const sharedState = inject("sharedState");
const locations = computed(() => sharedState.locations.filter((location) => location.selected));
const isDialogOpen = ref(false);
const search = ref("");
const selectedLocationIds = ref([]);
watch(isDialogOpen, (isDialogOpen) => {
  if (isDialogOpen) {
    selectedLocationIds.value = sharedState.locations
      .filter((location) => location.selected)
      .map((location) => location.id);
  }
});
const filteredLocations = computed(() =>
  sharedState.locations.filter((location) => location.name.toLowerCase().includes(search.value.toLowerCase()))
);

const setLocations = () => {
  let colorRunner = 0;
  sharedState.locations.forEach((location) => {
    const selected = selectedLocationIds.value.includes(location.id);
    if (selected && !location.selected) location.show = true;
    location.selected = selected;
    location.color = selected ? CHART_COLORS[colorRunner++] : "";
  });
  isDialogOpen.value = false;
};

const onLegendItemClick = (location) => (location.show = !location.show);
</script>

<style lang="scss">
.chart-locations {
  .chart-legend {
    width: 240px;

    .legend-item {
      display: flex;
      align-items: center;
      font-size: 15px;
      cursor: pointer;

      .legend-item-color {
        width: 20px;
        height: 20px;
        border-radius: 4px;
        margin: 0px 8px;
      }
    }
  }

  .manage-location-btn {
    width: 240px;
  }
}
</style>
