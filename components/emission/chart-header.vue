<template>
  <div class="emission-chart-header" :class="{ 'emission-chart-header-mobile': sharedState.isMobile }">
    <v-select
      v-model="params.type"
      :items="TYPES"
      variant="underlined"
      label="Type"
      density="compact"
      hide-details
      style="max-width: 186px"
    />
    <v-menu :close-on-content-click="false">
      <template #activator="{ props }">
        <v-text-field
          v-bind="props"
          :model-value="formattedParams"
          variant="underlined"
          label="Params"
          density="compact"
          hide-details
          readonly
          style="max-width: 186px"
        />
      </template>

      <v-sheet class="pa-5" elevation="4">
        <v-select
          v-for="dropdown in dropdowns"
          :key="dropdown.paramKey"
          v-model="params[dropdown.paramKey]"
          :items="dropdown.items"
          :label="dropdown.paramKey.charAt(0).toUpperCase() + dropdown.paramKey.slice(1)"
          :menu-props="{ location: 'right' }"
          item-title="name"
          item-value="name"
          variant="underlined"
          density="compact"
        />
      </v-sheet>
    </v-menu>
    <v-btn prepend-icon="mdi-refresh" color="primary" @click="onRefresh"> Refresh </v-btn>
  </div>
</template>

<script setup>
import { INVENTORIES, POLLUTANTS, YEARS, SECTORS, TYPES } from "@/data/emission";

const emit = defineEmits(["refresh"]);
const sharedState = inject("sharedState");

const params = ref({
  type: "Inventory comparison",
  inventory: "REAS",
  pollutant: "PM2p5",
  sector: "Total",
  year: "2015",
});

const dropdownMap = {
  "Selector share (%)": [
    { items: INVENTORIES, paramKey: "inventory" },
    { items: POLLUTANTS, paramKey: "pollutant" },
    { items: YEARS, paramKey: "year" },
  ],
  "Selector contribution": [
    { items: INVENTORIES, paramKey: "inventory" },
    { items: POLLUTANTS, paramKey: "pollutant" },
    { items: YEARS, paramKey: "year" },
  ],
  "Time series": [
    { items: INVENTORIES, paramKey: "inventory" },
    { items: POLLUTANTS, paramKey: "pollutant" },
    { items: SECTORS, paramKey: "sector" },
  ],
  "Inventory comparison": [
    { items: POLLUTANTS, paramKey: "pollutant" },
    { items: SECTORS, paramKey: "sector" },
    { items: YEARS, paramKey: "year" },
  ],
};

const dropdowns = computed(() => dropdownMap[params.value.type]);
const formattedParams = computed(() => dropdowns.value.map((dropdown) => params.value[dropdown.paramKey]).join(" / "));

const onRefresh = () => emit("refresh", params.value);

onMounted(onRefresh);
</script>

<style lang="scss">
.emission-chart-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  &.emission-chart-header-mobile {
    flex-direction: column;
    gap: 16px;
    padding-top: 16px;
    margin-bottom: 16px;

    .v-input {
      width: 100%;
    }
  }
}
</style>
