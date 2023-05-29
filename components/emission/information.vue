<template>
  <div class="emission-information">
    <v-progress-circular v-if="sharedState.information.isLoading" color="primary" indeterminate :size="60" :width="6" />

    <h3 class="text-center mt-2">{{ infoTitle }}</h3>

    <v-table style="height: 260px">
      <tbody v-if="!sharedState.information.isLoading">
        <tr v-for="infoKey in infoKeys" :key="infoKey">
          <td>{{ $t(`emission.infoItems.${infoKey}`) }}</td>
          <td>{{ sharedState.information[infoKey] }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
const sharedState = inject("sharedState");

const infoKeys = ["sum", "minimum", "maximum", "mean", "standardDeviation"];

const infoTitle = computed(() => {
  const { inventory, pollutant, sector, year } = sharedState.value.mapControls;
  return `${inventory} ${pollutant} ${sector} ${year} (kt)`;
});
</script>

<style lang="scss">
.emission-information {
  position: relative;

  .v-progress-circular {
    position: absolute;
    width: 100% !important;
    height: 100%;
    top: 130px;
    left: 0px;
  }

  table {
    td {
      font-size: 16px;
    }
  }
}
</style>
