<template>
  <div id="map"></div>
</template>

<script setup>
import * as mapHandlers from "@/map";
import * as mapUtils from "@/utils/map-utils";
import { locationService } from "@/services";
import html2canvas from "html2canvas";
import { FORECAST_CATALOG_DATE } from "@/data/layers";
import { TABS, TAB_ID_FORECAST } from "@/data/tabs";

const sharedState = inject("sharedState");

const tabLayers = computed(() => sharedState.layers.filter((layer) => layer.tabId === sharedState.tabId));
let map;
const wmsRegister = {
  // "nc": leafletLayer
};
const markerRegister = {};

const handleSelectedChange = async (layer) => {
  // wms
  const wms = layer.wms;
  if (wms) {
    if (layer.selected) {
      if (!wms.allNcs.length) wms.allNcs = await mapUtils.getNCs(layer, sharedState);

      wms.ncs = mapUtils.filterNcsByDate(wms.allNcs, sharedState);
      wms.ncIndex = 0;
      handleNcIndexChange(layer);
    } else {
      Object.keys(wmsRegister).forEach((ncKey) => {
        const leafletLayer = wmsRegister[ncKey];
        if (leafletLayer.layerId === layer.id) {
          map.removeLayer(leafletLayer);
          delete wmsRegister[ncKey];
        }
      });
    }
  }
  // marker
  else {
    if (layer.selected) {
      if (!markerRegister[layer.id]) {
        const leafletLayer = mapHandlers.addMarkerLayer({
          map,
          locations: await locationService.getMarkerLocations({
            isAeronet: layer.name.includes("AERONET"),
            startDate: sharedState.startDate.split(" ")[0],
            endDate: sharedState.endDate.split(" ")[0],
          }),
        });
        leafletLayer.layerId = layer.id;
        markerRegister[layer.id] = leafletLayer;
      }
      handleOpacityChange(layer);
    } else {
      const leafletLayer = markerRegister[layer.id];
      if (leafletLayer) {
        leafletLayer.eachLayer((l) => leafletLayer.removeLayer(l));
        map.removeLayer(leafletLayer);
      }
    }
  }
};

const handleNcIndexChange = (layer) => {
  if (!layer.wms.ncs.length) return;

  const nc = layer.wms.ncs[layer.wms.ncIndex];
  sharedState.animation.date = mapUtils.ncToDate(nc);
  Object.values(wmsRegister)
    .filter((leafletLayer) => leafletLayer.layerId == layer.id)
    .forEach((leafletLayer) => leafletLayer.setOpacity(0));

  if (!wmsRegister[nc]) {
    const forecastSuffix = TAB_ID_FORECAST === layer.tabId ? FORECAST_CATALOG_DATE + "/" : "";
    const leafletLayer = mapHandlers.addWmsLayer({
      map,
      url: layer.wms.urlWithoutNC + forecastSuffix + nc,
      config: layer.wms.config,
      events: {
        loading: () => (layer.wms.loading = true),
        load: () => (layer.wms.loading = false),
      },
    });
    leafletLayer.layerId = layer.id;
    wmsRegister[nc] = leafletLayer;
  }

  if (layer.show) wmsRegister[nc].setOpacity(layer.wms.config.opacity);
};

const handleOpacityChange = (layer) => {
  if (layer.wms) {
    if (!layer.wms.ncs.length) return;

    const nc = layer.wms.ncs[layer.wms.ncIndex];
    wmsRegister[nc]?.setOpacity(layer.show ? layer.wms.config.opacity : 0);
  } else {
    markerRegister[layer.id]?.eachLayer((l) => l.setOpacity(layer.show ? 1 : 0));
  }
};

const handleDateChange = async () => {
  Object.values(wmsRegister).forEach((leafletLayer) => leafletLayer.setOpacity(0));
  Object.values(markerRegister).forEach((leafletLayer) => leafletLayer.eachLayer((l) => l.setOpacity(0)));
  tabLayers.value.forEach((layer) => handleSelectedChange(layer));
};

const handleTabChange = async () => {
  const tab = TABS.find((t) => t.id == sharedState.tabId);
  sharedState.startDate = `${tab.startDate} 00:00:00`;
  sharedState.endDate = `${tab.endDate} 23:59:59`;
};

watch(
  () =>
    sharedState.layers.map((layer) => ({
      id: layer.id,
      selected: layer.selected,
      show: layer.show,
      ncIndex: layer.wms?.ncIndex,
      opacity: layer.wms?.config.opacity,
    })),
  (curr, old) => {
    tabLayers.value.forEach((layer) => {
      const currLayer = curr.find((l) => l.id === layer.id);
      const oldLayer = old.find((l) => l.id === layer.id);

      if (currLayer?.selected != oldLayer?.selected) handleSelectedChange(layer);
      if (currLayer?.ncIndex != oldLayer?.ncIndex) handleNcIndexChange(layer);
      if (currLayer?.show != oldLayer?.show) handleOpacityChange(layer);
      if (currLayer?.opacity != oldLayer?.opacity) handleOpacityChange(layer);
    });
  }
);
watch(() => sharedState.tabId, handleTabChange);
watch(() => sharedState.startDate + sharedState.endDate, handleDateChange);

defineExpose({
  downloadMap: async () => {
    const canvas = await html2canvas(map.getContainer(), { useCORS: true, logging: false });
    const link = document.createElement("a");

    link.href = canvas.toDataURL("image/png");
    link.download = "map.png";
    link.click();
  },
  refreshMap: () => {
    map.eachLayer(function (layer) {
      if (!layer._url?.includes("openstreetmap.org")) {
        layer.redraw?.();
      }
    });
  },
  addSearchedLocationMarker: async ({ latlng, onClick }) => {
    mapHandlers.addSearchedLocationMarker({ map, latlng, onClick });
  },
});

onMounted(() => {
  window.map = map = mapHandlers.createMap();
  handleTabChange();
  handleDateChange();
});
</script>

<style lang="scss">
.marker-icon-airnow {
  width: 16px !important;
  height: 16px !important;
  border: 2px solid #555;
}
.marker-icon-aeronet {
  width: 18px !important;
  height: 18px !important;
}

.ns-popup {
  margin-bottom: 16px !important;
}

.ns-marker {
  .ns-marker-airnow {
    width: 15px;
    height: 15px !important;
    height: 100%;
    background: var(--ns-marker-color);
    border: 1.5px solid black;
  }

  .ns-marker-aeronet {
    position: relative;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 8px 16px 8px;
    border-color: transparent transparent black transparent;

    &::before {
      content: "";
      position: absolute;
      top: 2.5px;
      left: -6px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 6px 12px 6px;
      border-color: transparent transparent var(--ns-marker-color) transparent;
    }
  }
}
</style>
