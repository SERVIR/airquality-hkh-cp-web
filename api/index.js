import axios from "axios";
import moment from "moment";
import emissionWkt from "@/data/emission-wkt";

const http = axios.create({
  baseURL: "//smog.icimod.org/apps/airquality",
});

export const getSlicedFromCatalog = async ({ startDate, endDate, url }) => {
  return http.post("/slicedfromcatalog/", {
    data_ext: ".nc",
    startDate,
    endDate,
    url,
  });
};

export const getCatalogXML = async (url) => http.get(url);

export const getHomeChartData = async ({ startDate, endDate, stationId, modelClass, modelClassDataList, typeName }) => {
  const payload = {
    StartDate: startDate, // ex. 2023-01-07
    EndDate: endDate,
    stId: stationId,
    ModelClass: modelClass,
    ModelClassDataList: modelClassDataList,
    typeName: typeName,
  };
  const response = await http.post("/getData/", payload);
  return response.data.SeriesData.map(([timestamp, aqi]) => ({
    timestamp: moment(timestamp).utcOffset(0).format("YYYY-MM-DDTHH:") + "00:00Z",
    aqi,
  }));
};

export const getHomeChartModelGeosData = async ({ ncs, layer, lat, lng }) => {
  const payload = {
    DATADIR: ncs,
    LAYER: layer,
    type: "Point",
    wkt: `POINT(${lng} ${lat})`,
  };
  const response = await http.post("/timeseriesmodeldata/", payload);
  return response.data.SeriesData.map(([timestamp, aqi]) => ({
    timestamp: moment(timestamp).utcOffset(0).format("YYYY-MM-DDTHH:") + "00:00Z",
    aqi,
  }));
};

/**************** Emission **********/
export const getEmissionInformation = ({ inventory, pollutant, sector, year }) =>
  http.post("/getLayerInfoStat/", {
    geometryType: "MultiPolygon",
    layerDetail: [inventory, pollutant, sector, year],
    wkt: emissionWkt,
  });

export const getEmissionChartData = ({ cascaderValue, plotType }) =>
  http.post("/getChartDataProcess/", {
    cascaderValue,
    geometryType: "MultiPolygon",
    plotType,
    wkt: emissionWkt,
  });

/***************** Deployed Server API *********************/
const apiPrefix = (process.env.NODE_ENV ? "//216.218.226.167" : "") + "/api/v1";

export const getLocations = () => axios.get(`${apiPrefix}/location/list/`);
export const getAirnowLocations = () => axios.get(`${apiPrefix}/location/source/air_now/list/`);
export const getAeronetLocations = () => axios.get(`${apiPrefix}/location/source/aero_not/list/`);
