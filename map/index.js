import L from "leaflet";
import "leaflet/dist/leaflet.css";

export const createMap = () => {
  const map = L.map("map", {
    minZoom: 5,
    maxZoom: 16,
    maxBounds: [
      [-10, 160],
      [50, 20],
    ],
  }).setView([25.87, 90.0925], 5);

  // add baseLayer OpenStreetMap.Mapnik from https://leaflet-extras.github.io/leaflet-providers/preview/
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  return map;
};

const getMarkerIcon = (params) =>
  L.divIcon({
    className: "ns-marker",
    iconSize: [16, 16], // set the size of the icon
    html: `<div class="${params.markerClass}" style="--ns-marker-color: ${params.color}"></div>`, // use an empty div as the icon content
    iconAnchor: [8, 8], // center the icon at the given coordinates
    popupAnchor: [0, -10], // show the popup above the icon
  });

const getMarkerPopupTemplate = (params) => {
  const hasValue = !!params.pollutantValue;
  const secondRow = hasValue
    ? `<div><b>${params.pollutantName}:</b> ${params.pollutantValue} (${params.pollutantUnit})</div>`
    : `<div>No Data Available</div>`;
  const thirdRow = hasValue ? `<div><b>Data for: </b>${params.date}</div>` : "";

  return `
      <div class="d-flex flex-column" style="gap: 2px;">
        <div><b>Station:</b> ${params.station}</div>
        ${secondRow}
        ${thirdRow}
      </div>
    `;
};

export const addMarkerLayer = ({ map, locations }) => {
  const markers = locations.map((location) => {
    const marker = L.marker(location.latlng, { icon: getMarkerIcon(location.markerParams) });

    marker.bindPopup(getMarkerPopupTemplate(location.markerParams), { className: "ns-popup" });
    marker.on("mouseover", () => marker.openPopup());
    marker.on("mouseout", () => setTimeout(() => marker.closePopup(), 300));
    return marker;
  });

  const layerGroup = L.layerGroup(markers);
  layerGroup.addTo(map);
  return layerGroup;
};

export const addWmsLayer = ({ map, url, config, events }) => {
  const leafletLayer = L.tileLayer.wms(url, config);

  if (events) Object.keys(events).forEach((eventKey) => leafletLayer.on(eventKey, events[eventKey]));
  leafletLayer.addTo(map);

  return leafletLayer;
};

export const clearAllMapLayersExceptBaseLayer = (map) => {
  map.eachLayer(function (layer) {
    if (!layer._url?.includes("openstreetmap.org")) {
      map.removeLayer(layer);
    }
  });
};

export const addSearchedLocationMarker = ({ map, latlng, onClick }) => {
  map.setView(latlng, 15);
  L.marker(latlng).on("click", onClick).addTo(map);
};

export const getLayers = (map) => {
  const layers = [];

  if (map) {
    map.eachLayer((layer) => {
      if (!layer._url?.includes("openstreetmap.org")) {
        layers.push(layer);
      }
    });
  }

  return layers;
};

export const getLayerByKeyValue = (map, key, value) =>
  getLayers(map).find((leafletLayer) => (leafletLayer[key] = value));

export const getLayerGroup = (map, layerId) => {
  let layerGroup = getLayers(map).find((layer) => (layer.id = layerId));

  if (!layerGroup) {
    layerGroup = L.layerGroup().addTo(map);
    layerGroup.id = layerId;
  }

  return layerGroup;
};
