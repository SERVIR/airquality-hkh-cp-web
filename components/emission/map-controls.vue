<template>
  <div class="emission-map-controls">
    <v-select
      v-for="dropdown in dropdowns"
      :key="dropdown.key"
      v-model="sharedState.mapControls[dropdown.key.toLowerCase()]"
      variant="underlined"
      :label="dropdown.key"
      :density="vSelectDensity"
      :items="dropdown.items"
    />
  </div>
</template>

<script setup>
const sharedState = inject("sharedState");
const vSelectDensity = "compact";

const dropdowns = [
  {
    key: "Inventory",
    items: ["GAINS", "REAS", "EDGAR"],
  },
  {
    key: "Pollutant",
    items: ["BC", "CO", "NOx", "OC", "PM10", "PM2p5", "SO2"],
  },
  {
    key: "Sector",
    items: ["Total", "Residential", "Industry", "Transport", "Energy"],
  },
  {
    key: "Year",
    items: ["1990", "1995", "2000", "2005", "2010", "2015"],
  },
];
</script>

<style lang="scss"></style>
