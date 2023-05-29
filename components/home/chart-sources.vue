<template>
  <div class="chart-sources d-flex flex-wrap justify-center">
    <v-checkbox
      v-for="source in sharedState.sources"
      :key="source"
      v-model="source.selected"
      :label="source.name"
      density="compact"
      color="primary"
      hide-details
    >
      <template #prepend>
        <v-icon :size="16">{{ source.icon }}</v-icon>
      </template>
    </v-checkbox>
  </div>
</template>

<script setup>
const sharedState = inject("sharedState");
</script>

<style lang="scss">
.chart-sources {
  .v-checkbox {
    max-width: fit-content;
    margin-right: 24px;

    .v-input__prepend {
      margin: 0px;
      padding-top: 6px;
    }

    .v-checkbox-btn {
      min-height: 24px;

      .v-selection-control__input i {
        font-size: 18px;
      }
    }
  }

  label {
    font-size: 14px;
  }
}
</style>
