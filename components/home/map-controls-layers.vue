<template>
  <div class="map-controls-layers">
    <div class="d-flex justify-space-between align-center px-4">
      <div>{{ $t("layers.layers") }}</div>
      <HomeManageLayers />
    </div>

    <div class="map-controls-layer" v-for="layer in selectedLayers" :key="layer.id">
      <!-- Header -->
      <div class="map-controls-layer-header">
        <ns-switch v-model="layer.show" class="mr-2" />
        <v-btn
          v-if="layer.showPlayButton"
          class="layer-play-btn px-1 mr-1 justify-start"
          :prepend-icon="layer.isPlaying ? 'mdi mdi-pause' : 'mdi mdi-play'"
          variant="text"
          size="small"
          :width="64"
          @click.stop="onPlayButtonClick(layer)"
        >
          {{ layer.isPlaying ? "Pause" : "Play" }}
        </v-btn>
        <v-list-item-title>{{ layer.name }}</v-list-item-title>
        <v-badge v-if="layer.showNoDataBadge" class="mt-2" color="error" :content="$t('layers.noDataBadge')" inline />
        <v-btn
          v-if="layer.showExpansionPanelToggle"
          density="compact"
          variant="text"
          :icon="expandedLayerId === layer.id ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="expandLayer(layer)"
        />
      </div>

      <!-- Legend Image -->
      <v-expand-transition v-if="layer.legendImage">
        <v-card v-show="expandedLayerId === layer.id" :elevation="0">
          <v-img
            :src="layer.legendImage.src"
            class="legend-image ml-9"
            style="margin: 6px 0px"
            :style="layer.legendImage.style"
            eager
          />
        </v-card>
      </v-expand-transition>

      <!-- Opacity slider -->
      <div v-if="layer.showOpacitySlider" class="d-flex align-center">
        <v-slider
          v-model="layer.wms.config.opacity"
          class="opacity-slider flex-grow-1 ma-0"
          :min="0"
          :max="1"
          :step="0.01"
          :disabled="!layer.show"
          density="compact"
          color="primary"
          hide-details
        />
        <div class="ml-2 text-right" style="width: 40px">{{ Math.round(layer.wms.config.opacity * 100) + "%" }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const sharedState = inject("sharedState");
const expandedLayerId = ref();
const expandLayer = (layer) => {
  if (expandedLayerId.value === layer.id) expandedLayerId.value = null;
  else expandedLayerId.value = layer.id;
};

const tabLayers = computed(() => sharedState.layers.filter((layer) => layer.tabId === sharedState.tabId));
const selectedLayers = computed(() => tabLayers.value.filter((layer) => layer.selected));
const playingLayer = ref();

const { play, pause } = useControlledInterval(() => {
  const wms = playingLayer.value.wms;

  if (!wms.loading) {
    if (wms.ncIndex < wms.ncs.length - 1) {
      wms.ncIndex++;
    } else if (wms.ncIndex == wms.ncs.length - 1) {
      if (sharedState.animation.repeat) {
        wms.ncIndex = 0;
      } else {
        pause();
        playingLayer.value.isPlaying = false;
      }
    }
  }
}, sharedState);

watch(
  () => sharedState.animation.fps,
  (fps) => {
    if (playingLayer.value?.isPlaying) {
      pause();
      play(fps);
    }
  }
);

const onPlayButtonClick = (layer) => {
  sharedState.layers.forEach((l) => {
    if (l.id === layer.id) {
      layer.isPlaying = !layer.isPlaying;
      if (layer.isPlaying) {
        playingLayer.value = layer;
        play(sharedState.animation.fps);
      } else {
        pause();
        playingLayer.value = null;
      }
    } else if (l.isPlaying) {
      l.isPlaying = false;
    }
  });
};
</script>

<style lang="scss">
.map-controls-layers {
  font-size: 14px;
  margin-top: 8px;

  .map-controls-layer {
    padding: 0px 16px;
    margin-bottom: 8px;

    .map-controls-layer-header {
      display: flex;
      align-items: center;

      .layer-play-btn {
        .v-btn__prepend {
          margin-right: 2px;

          .v-icon {
            &::before {
              font-size: 18px !important;
            }
          }
        }
        .v-btn__content {
          font-size: 14px;
          font-weight: bold;
        }
      }

      .v-list-item-title {
        flex: 1;
        font-size: inherit;
      }
    }

    .legend-image {
      max-width: 80px;
      max-height: 180px;
    }

    .opacity-slider {
      .v-input__control {
        min-height: 20px;
        .v-slider-thumb {
          z-index: 1;
        }
      }
    }
  }
}
</style>
