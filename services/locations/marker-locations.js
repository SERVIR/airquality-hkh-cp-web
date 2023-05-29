import * as api from "@/api";

const SOURCE_AERONET = "AERONET";
const SOURCE_AIRNOW = "AirNow";

let cachedLocations = {
  [SOURCE_AERONET]: [],
  [SOURCE_AIRNOW]: [],
};

const COLOR_RANGES = [
  { start: Number.MIN_SAFE_INTEGER, end: 12, color: "rgb(0, 228, 0)" },
  { start: 12.1, end: 35.4, color: "rgb(255, 255, 0)" },
  { start: 35.5, end: 55.4, color: "rgb(255, 126, 0)" },
  { start: 55.5, end: 150.4, color: "rgb(255, 0, 0)" },
  { start: 150.5, end: 250.4, color: "rgb(143, 63, 151)" },
  { start: 250.5, end: Number.MAX_SAFE_INTEGER, color: "rgb(126, 0, 35)" },
];

const getTimestampAndAqi = async ({ location, isAeronet, startDate, endDate }) => {
  let timestampAndAqi = { timestamp: null, aqi: 0 };

  try {
    const chartData = await api.getHomeChartData({
      startDate,
      endDate,
      stationId: location.id,
      modelClass: isAeronet ? "AeronetAod" : "UsEmbassyPm",
      modelClassDataList: isAeronet ? "AeronetDataList" : "UsEmbassyDataList",
      typeName: isAeronet ? "aod" : "pm",
    });

    if (chartData.length) timestampAndAqi = chartData.pop();
  } catch (error) {
    console.log(error);
  }

  return timestampAndAqi;
};

const getMarkerLocation = async ({ location, isAeronet, startDate, endDate }) => {
  const { timestamp, aqi } = await getTimestampAndAqi({ location, isAeronet, startDate, endDate });

  return {
    latlng: [location.latitude, location.longitude],
    markerParams: {
      station: location.site,
      pollutantName: "PM 2.5",
      pollutantValue: aqi,
      pollutantUnit: "μg/m3",
      date: timestamp,
      color: COLOR_RANGES.find(({ start, end }) => start <= aqi && aqi <= end).color,
      markerClass: isAeronet ? "ns-marker-aeronet" : "ns-marker-airnow",
    },
  };
};

export default async ({ isAeronet, startDate, endDate }) => {
  const cacheKey = isAeronet ? SOURCE_AERONET : SOURCE_AIRNOW;

  if (!cachedLocations[cacheKey].length) {
    const response = await (isAeronet ? api.getAeronetLocations() : api.getAirnowLocations());

    cachedLocations[cacheKey] = await Promise.all(
      response.data.data.map((location) => getMarkerLocation({ location, isAeronet, startDate, endDate }))
    );
  }

  return cachedLocations[cacheKey];
};
