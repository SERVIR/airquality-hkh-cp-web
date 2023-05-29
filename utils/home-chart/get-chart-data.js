import * as api from "@/api";
import moment from "moment";
import layers from "@/data/layers";

const getAirnowData = async ({ startDate, endDate, location }) => {
  return api.getHomeChartData({
    startDate,
    endDate,
    stationId: location.id,
    modelClass: "UsEmbassyPm",
    modelClassDataList: "UsEmbassyDataList",
    typeName: "pm",
  });
};

const getAeronetData = async ({ startDate, endDate, location }) => {
  return api.getHomeChartData({
    startDate,
    endDate,
    stationId: location.id,
    modelClass: "AeronetAod",
    modelClassDataList: "AeronetDataList",
    typeName: "aod",
  });
};

const getGeosData = async ({ location, geosNcs }) => {
  return api.getHomeChartModelGeosData({
    ncs: geosNcs,
    layer: "PM2p5",
    lat: location.lat,
    lng: location.lng,
  });
};

const getTerraModisData = async ({ location, terraModisNcs }) => {
  return api.getHomeChartModelGeosData({
    ncs: terraModisNcs,
    layer: "aod_550",
    lat: location.lat,
    lng: location.lng,
  });
};

const getData = async ({ startDate, endDate, source, location, geosNcs, terraModisNcs }) => {
  const handler = {
    AirNow: getAirnowData,
    AERONET: getAeronetData,
    GEOS: getGeosData,
    "Terra-MODIS": getTerraModisData,
  }[source.shortName];

  let data = [];
  try {
    data = await handler({ startDate, endDate, location, geosNcs, terraModisNcs });
  } catch (error) {
    console.log(error);
  }

  return {
    source,
    location,
    timestamps: data.map((e) => e.timestamp),
    aqis: data.map((e) => e.aqi),
  };
};

const getNcs = async (startDate, endDate, layer) => {
  const ncs = await api.getSlicedFromCatalog({
    startDate,
    endDate,
    url: layer.wms.catalogUrl,
  });
  const prefix = layer.name.includes("GEOS") ? "GEOS-PM2p5" : "TerraModis-AOD";

  return ncs.data.data.map((nc) => `HKHAirQualityWatch/RecentAndArchive/PM/${prefix}/${nc}`);
};

export default async (sharedState) => {
  const sources = sharedState.sources.filter((source) => source.selected);
  const locations = sharedState.locations.filter((location) => location.selected && location.show);
  const DATE_FORMAT = "YYYY-MM-DD";
  const startDate = moment().subtract(5, "days").format(DATE_FORMAT); //sharedState.startDate.split(" ")[0];
  const endDate = moment().add(2, "days").format(DATE_FORMAT); //sharedState.endDate.split(" ")[0];

  let geosNcs = [];
  let terraModisNcs = [];

  if (sources.some((source) => source.shortName === "GEOS")) {
    geosNcs = await getNcs(startDate, endDate, layers[3]);
  }
  if (sources.some((source) => source.shortName === "Terra-MODIS")) {
    terraModisNcs = await getNcs(startDate, endDate, layers[14]);
  }

  const promises = [];
  sources.forEach((source) => {
    locations.forEach((location) => {
      promises.push(
        getData({
          source,
          location,
          startDate,
          endDate,
          geosNcs,
          terraModisNcs,
        })
      );
    });
  });

  const names = {};
  const xs = {};
  const json = {};
  const colors = {};
  const responses = await Promise.all(promises);

  responses.forEach(({ source, location, timestamps, aqis }, index) => {
    const dataKey = `data${index + 1}`;
    const xKey = `x${index + 1}`;

    names[dataKey] = `${location.name} (${source.shortName})`;
    xs[dataKey] = xKey;
    json[xKey] = timestamps;
    json[dataKey] = aqis;
    colors[dataKey] = location.color;
  });

  return { names, xs, json, colors };
};
