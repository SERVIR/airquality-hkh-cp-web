import * as tabs from "@/data/tabs";
import * as api from "@/api";
import moment from "moment";
import { FORMAT_DATETIME } from "@/utils/date-utils";

const ARCHIVE_START_DATE = moment().subtract(90, "days");

export const getNCs = async (layer, sharedState) => {
  if (tabs.TAB_ID_FORECAST === sharedState.tabId) {
    const response = await api.getCatalogXML(layer.wms.catalogUrl);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "text/xml");

    return Array.from(xmlDoc.children[0].children[1].children)
      .filter((e) => "dataset" === e.nodeName)
      .map((e) => e.attributes.getNamedItem("name").value);
  }

  const tab = tabs.TABS.find((tab) => tab.id === sharedState.tabId);
  let startDate = tab.startDate;

  if (tabs.TAB_ID_ARCHIVE === tab.id) {
    startDate = ARCHIVE_START_DATE.format(FORMAT_DATETIME);
  }

  const response = await api.getSlicedFromCatalog({
    startDate: startDate.split(" ")[0],
    endDate: tab.endDate.split(" ")[0],
    url: layer.wms.catalogUrl,
  });

  return response.data.data;
};

export const ncToDate = (nc) => {
  let date;
  const DISPLAY_DATE_FORMAT = "YYYY-MM-DD hh:mm A";

  const params = [
    {
      // aero_trgas.d01.2023041212.latlon.nc
      regex: /\d{10}/,
      inputFormat: "YYYYMMDDHHmm",
    },
    {
      // Geos-PM2p5-2023-03-24-06-30.nc
      regex: /\d{4}-\d{2}-\d{2}-\d{2}-\d{2}/,
      inputFormat: "YYYY-MM-DD-HH-mm",
    },
    {
      // ModisTerra-TrueColor-2023-03-25.nc
      regex: /\d{4}-\d{2}-\d{2}/,
      inputFormat: "YYYY-MM-DD",
    },
  ];
  for (const { regex, inputFormat } of params) {
    const matchResult = nc.match(regex);
    if (matchResult) {
      date = moment(matchResult[0], inputFormat).format(DISPLAY_DATE_FORMAT);
      break;
    }
  }

  return date;
};

export const filterNcsByDate = (ncs, sharedState) => {
  const startMoment = moment(sharedState.startDate, FORMAT_DATETIME);
  const endMoment = moment(sharedState.endDate, FORMAT_DATETIME);

  return ncs.filter((nc) => {
    const ncDate = moment(ncToDate(nc), FORMAT_DATETIME);
    return ncDate.isBetween(startMoment, endMoment, null, "[]");
  });
};

export const getLayers = (mapOrGroupLayer) => {
  const layers = [];
  mapOrGroupLayer.eachLayer((layer) => {
    if (!layer._url?.includes("openstreetmap.org")) {
      layers.push(layer);
    }
  });
  return layers;
};

export const getLayerById = (mapOrGroupLayer, id) => getLayers(mapOrGroupLayer).find((layer) => (layer.id = id));
