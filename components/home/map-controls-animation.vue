<template>
  <div class="map-controls-animation px-4 mt-3">
    <div class="d-flex justify-space-between align-center">
      <ns-switch v-model="sharedState.animation.repeat" :disabled="!playingLayer" :label="$t('dictionary.repeat')" />

      <div class="d-flex align-center" style="gap: 6px">
        <v-icon icon="mdi mdi-clock-time-four" color="lightgray" />
        <div style="width: 32px; margin: 0px 2px 0px 4px">{{ sharedState.animation.fps }} fps</div>
        <v-slider
          v-model="sharedState.animation.fps"
          class="fps-slider mr-3"
          density="compact"
          hide-details
          style="width: 30px"
          :min="1"
          :max="6"
          :step="1"
          :disabled="!playingLayer"
          color="primary"
        />
      </div>
    </div>

    <div class="d-flex justify-space-between align-center mt-2">
      <v-btn
        class="animation-btn"
        prepend-icon="mdi mdi-chevron-double-left"
        variant="text"
        size="small"
        :disabled="isPrevDisabled"
        @click="onPrevClick"
      >
        {{ $t("dictionary.prev") }}
      </v-btn>

      <div style="font-size: 15px">{{ sharedState.animation.date }}</div>

      <v-btn
        class="animation-btn"
        prepend-icon="mdi mdi-chevron-double-right"
        variant="text"
        size="small"
        :disabled="isNextDisabled"
        @click="onNextClick"
      >
        {{ $t("dictionary.next") }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
const sharedState = inject("sharedState");

const playingLayer = computed(() => {
  const layers = sharedState.layers.filter((layer) => layer.selected);
  const playEnabledLayer = layers.find((layer) => layer.isPlaying);
  if (playEnabledLayer) return playEnabledLayer;
  return layers.find((layer) => layer.showPlayButton);
});
const isPrevDisabled = computed(() => {
  if (!playingLayer.value) return true;
  return playingLayer.value.wms.ncIndex == 0;
});
const isNextDisabled = computed(() => {
  if (!playingLayer.value) return true;
  const { ncIndex, ncs } = playingLayer.value.wms;
  return !(ncIndex < ncs.length - 1);
});

const onPrevClick = () => playingLayer.value.wms.ncIndex--;
const onNextClick = () => playingLayer.value.wms.ncIndex++;
</script>

<style lang="scss">
.map-controls-animation {
  font-size: 14px;
  margin-top: 6px;

  .animation-btn {
    .v-btn__prepend {
      margin-right: 4px;
    }
    .v-btn__content {
      margin-top: -2px;
      font-size: 14px;
    }
  }

  .fps-slider {
    .v-input__control {
      min-height: 20px;
    }
  }
}
</style>
