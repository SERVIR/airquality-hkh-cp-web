import { TAB_ID_ARCHIVE, TAB_ID_RECENT, TAB_ID_FORECAST } from "@/data/tabs";
import moment from "moment";

export const FORECAST_CATALOG_DATE = new moment().subtract(1, "day").utcOffset(0).format("YYYYMMDD");

const COMMON_PARAMS = {
  selected: false,
  show: true,
  isPlaying: false,
  showExpansionPanelToggle: true,
  showPlayButton: true,
  showNoDataBadge: false,
  showOpacitySlider: true,
};

const RECENT_LAYERS = [
  {
    name: "TerraModis-TrueColor",
    ...COMMON_PARAMS,
    selected: true,
    showExpansionPanelToggle: false,
    showPlayButton: false,
    showOpacitySlider: false,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl:
        "http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/RecentAndArchive/TerraMODIS-TrueColor1km/catalog.xml",
      urlWithoutNC:
        "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/TerraMODIS-TrueColor1km/",
      config: {
        format: "image/png",
        transparent: true,
        SLD_BODY:
          '<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sldStyledLayerDescriptor.xsd"                       xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"                       xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink"                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:resc="http://www.resc.reading.ac.uk">    <NamedLayer>     <se:Name>red</se:Name>        <UserStyle>            <se:Name>Thesholded colour scheme</se:Name>            <se:CoverageStyle>                <se:Rule>                    <resc:RasterRGBSymbolizer>                        <se:Opacity>1.0</se:Opacity>                        <se:ColorMap>                            <resc:RedBand>                                <resc:BandName>red</resc:BandName>                                <resc:Range>                                    <resc:Minimum>0</resc:Minimum>                                    <resc:Maximum>255</resc:Maximum>                                </resc:Range>                            </resc:RedBand>                            <resc:GreenBand>                                <resc:BandName>green</resc:BandName>                                <resc:Range>                                    <resc:Minimum>0</resc:Minimum>                                    <resc:Maximum>255</resc:Maximum>                                </resc:Range>                            </resc:GreenBand>                            <resc:BlueBand>                                <resc:BandName>blue</resc:BandName>                                <resc:Range>                                    <resc:Minimum>1</resc:Minimum>                                    <resc:Maximum>255</resc:Maximum>                                    <resc:Spacing>linear</resc:Spacing>                                </resc:Range>                            </resc:BlueBand>                        </se:ColorMap>                    </resc:RasterRGBSymbolizer>                </se:Rule>            </se:CoverageStyle>        </UserStyle>    </NamedLayer></StyledLayerDescriptor>',
        layers: "red",
        layer: "PM2p5",
        opacity: 0.5,
      },
    },
  },
  {
    name: "Surface Observation-AOD (AERONET)",
    ...COMMON_PARAMS,
    showPlayButton: false,
    showOpacitySlider: false,
    legendImage: {
      src: "http://smog.spatialapps.net:8080/geoserver/AirQuality/wms?request=GetLegendGraphic&version=1.1.1&format=image/png&width=20&height=20&layer=AirQuality:aeronet_aod",
      style: "width: 25px; height: 25px;",
    },
  },
  {
    name: "Ground Observation-PM2.5 (AirNow)",
    ...COMMON_PARAMS,
    selected: true,
    showPlayButton: false,
    showOpacitySlider: false,
    legendImage: {
      src: "http://smog.spatialapps.net:8080/geoserver/AirQuality/wms?request=GetLegendGraphic&version=1.1.1&format=image/png&width=20&height=20&layer=AirQuality:us_embassy_pm2p5",
      style: "width: 25px; height: 25px;",
    },
  },
];

const ARCHIVE_LAYERS = [
  ...JSON.parse(JSON.stringify(RECENT_LAYERS)),
  {
    name: "Model-PM2.5 (GEOS)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl:
        "http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/RecentAndArchive/PM/GEOS-PM2p5/catalog.xml",
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/PM/GEOS-PM2p5/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,500",
        layer: "PM2p5",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/PM/GEOS-PM2p5/Geos-PM2p5-2023-03-03-00-30.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=PM2p5&COLORSCALERANGE=0,500&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Model-O3 (GEOS)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl:
        "http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/RecentAndArchive/O3/GEOS-O3/catalog.xml",
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/O3/GEOS-O3/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,80",
        layer: "O3",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/O3/GEOS-O3/Geos-O3-2023-03-03-00-30.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=O3&COLORSCALERANGE=0,80&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Model-SO2 (GEOS)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl:
        "http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/RecentAndArchive/SO2/GEOS-SO2/catalog.xml",
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/SO2/GEOS-SO2/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLOƒRSCALERANGE: "0,10",
        layer: "SO2",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/SO2/GEOS-SO2/Geos-SO2-2023-03-03-00-30.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=SO2&COLORSCALERANGE=0,10&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Model-NO2 (GEOS)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl:
        "http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/RecentAndArchive/NO2/GEOS-NO2/catalog.xml",
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/NO2/GEOS-NO2/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,10",
        layer: "NO2",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/NO2/GEOS-NO2/Geos-NO2-2023-03-03-00-30.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=NO2&COLORSCALERANGE=0,10&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Model-CO (GEOS)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl:
        "http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/RecentAndArchive/CO/GEOS-CO/catalog.xml",
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/CO/GEOS-CO/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,500",
        layer: "CO",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/CO/GEOS-CO/Geos-CO-2023-03-03-00-30.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=CO&COLORSCALERANGE=0,500&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Satellite-SO2 (TROPOMI-GEE)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl:
        "http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/RecentAndArchive/SO2/TROPOMI-SO2/catalog.xml",
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/SO2/TROPOMI-SO2/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,1",
        layer: "SO2",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/SO2/TROPOMI-SO2/TROPOMI-SO2-2023-03-03.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=SO2&COLORSCALERANGE=0,1&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Satellite-NO2 (TROPOMI-GEE)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl:
        "http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/RecentAndArchive/NO2/TROPOMI-NO2/catalog.xml",
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/NO2/TROPOMI-NO2/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,10",
        layer: "NO2",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/NO2/TROPOMI-NO2/TROPOMI-NO2-2023-03-03.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=NO2&COLORSCALERANGE=0,10&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Satellite-CO (TROPOMI-GEE)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl:
        "http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/RecentAndArchive/CO/TROPOMI-CO/catalog.xml",
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/CO/TROPOMI-CO/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,4",
        layer: "CO",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/CO/TROPOMI-CO/TROPOMI-CO-2023-03-03.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=CO&COLORSCALERANGE=1,4&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Satellite-SO2 (TROPOMI-SERVIR AST)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl:
        "http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/RecentAndArchive/SO2/AST-HKH-SO2/catalog.xml",
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/SO2/AST-HKH-SO2/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,10",
        layer: "SO2",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/SO2/AST-HKH-SO2/dataS5P_NRTI_L3__SO2_hkh_2023-03-05.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=SO2&COLORSCALERANGE=0,10&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Satellite-NO2 (TROPOMI-SERVIR AST)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl:
        "http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/RecentAndArchive/NO2/AST-HKH-NO2/catalog.xml",
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/NO2/AST-HKH-NO2/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,10",
        layer: "NO2",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/NO2/AST-HKH-NO2/dataS5P_NRTI_L3__NO2_hkh_2023-03-05.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=NO2&COLORSCALERANGE=0,10&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Satellite-CO (TROPOMI-SERVIR AST)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl:
        "http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/RecentAndArchive/CO/AST-HKH-CO/catalog.xml",
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/CO/AST-HKH-CO/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "1,4",
        layer: "vertical_column",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/CO/AST-HKH-CO/S5P_NRTI_L3__CO_hkh_2023-03-05.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=vertical_column&COLORSCALERANGE=1,4&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Satellite-AOD (Terra-MODIS)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl:
        "http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/RecentAndArchive/PM/TerraModis-AOD/catalog.xml",
      urlWithoutNC:
        "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/PM/TerraModis-AOD/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,1",
        layer: "aod_550",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/PM/TerraModis-AOD/Terra-MODIS-AOD-2023-03-04.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=aod_550&COLORSCALERANGE=0.01,1&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
];

const FORECAST_LAYERS = [
  {
    name: "Model-PM2.5 (GEOS)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl: `http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/Forecast/PM/GEOS-PM2p5/${FORECAST_CATALOG_DATE}/catalog.xml`,
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/PM/GEOS-PM2p5/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,500",
        layer: "PM2p5",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.icimod.org/apps/airqualitynp/WMSProxy/http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/PM/GEOS-PM2p5/20230310/Geos-PM2p5-2023-03-10-12-30.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=PM2p5&COLORSCALERANGE=0,500&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Model-O3 (GEOS)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl: `http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/Forecast/O3/GEOS-O3/${FORECAST_CATALOG_DATE}/catalog.xml`,
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/O3/GEOS-O3/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,80",
        layerName: "O3_TOTCOL",
        layer: "O3",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.icimod.org/apps/airqualitynp/WMSProxy/http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/O3/GEOS-O3/20230310/Geos-O3-2023-03-10-12-30.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=O3&COLORSCALERANGE=0,80&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Model-SO2 (GEOS)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl: `http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/Forecast/SO2/GEOS-SO2/${FORECAST_CATALOG_DATE}/catalog.xml`,
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/SO2/GEOS-SO2/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,10",
        layerName: "SO2_SFC",
        layer: "SO2",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.icimod.org/apps/airqualitynp/WMSProxy/http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/20230310/aero_trgas.d01.2023031012.latlon.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=SO2_SFC&COLORSCALERANGE=0,10&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Model-NO2 (GEOS)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl: `http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/Forecast/NO2/GEOS-NO2/${FORECAST_CATALOG_DATE}/catalog.xml`,
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/NO2/GEOS-NO2/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,10",
        layer: "NO2",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.icimod.org/apps/airqualitynp/WMSProxy/http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/NO2/GEOS-NO2/20230310/Geos-NO2-2023-03-10-12-30.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=NO2&COLORSCALERANGE=0,10&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Model-CO (GEOS)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl: `http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/Forecast/CO/GEOS-CO/${FORECAST_CATALOG_DATE}/catalog.xml`,
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/CO/GEOS-CO/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,500",
        layer: "CO",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.icimod.org/apps/airqualitynp/WMSProxy/http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/CO/GEOS-CO/20230310/Geos-CO-2023-03-10-12-30.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=CO&COLORSCALERANGE=0,500&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Model-PM2.5 (WRF-Chem)",
    ...COMMON_PARAMS,
    selected: true,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl: `http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/${FORECAST_CATALOG_DATE}/catalog.xml`,
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,100",
        layer: "PM25_SFC",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.icimod.org/apps/airqualitynp/WMSProxy/http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/20230310/aero_trgas.d01.2023031012.latlon.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=PM25_SFC&COLORSCALERANGE=0,100&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Model-O3 (WRF-Chem)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl: `http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/${FORECAST_CATALOG_DATE}/catalog.xml`,
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,80",
        layer: "O3_TOTCOL",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.icimod.org/apps/airqualitynp/WMSProxy/http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/20230310/aero_trgas.d01.2023031012.latlon.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=O3_TOTCOL&COLORSCALERANGE=0,80&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Model-SO2 (WRF-Chem)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl: `http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/${FORECAST_CATALOG_DATE}/catalog.xml`,
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,10",
        layer: "SO2_SFC",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.icimod.org/apps/airqualitynp/WMSProxy/http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/20230310/aero_trgas.d01.2023031012.latlon.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=SO2_SFC&COLORSCALERANGE=0,10&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Model-NO2 (WRF-Chem)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl: `http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/${FORECAST_CATALOG_DATE}/catalog.xml`,
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,10",
        layer: "NO2_SFC",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.icimod.org/apps/airqualitynp/WMSProxy/http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/20230310/aero_trgas.d01.2023031012.latlon.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=NO2_SFC&COLORSCALERANGE=0,10&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
  {
    name: "Model-CO (WRF-Chem)",
    ...COMMON_PARAMS,
    wms: {
      allNcs: [],
      ncs: [],
      ncIndex: 0,
      catalogUrl: `http://smog.spatialapps.net:8080/thredds/catalog/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/${FORECAST_CATALOG_DATE}/catalog.xml`,
      urlWithoutNC: "http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/",
      config: {
        format: "image/png",
        transparent: true,
        styles: "default-scalar/x-Rainbow",
        COLORSCALERANGE: "0,500",
        layer: "CO_SFC",
        opacity: 0.5,
      },
    },
    legendImage: {
      src: "http://smog.icimod.org/apps/airqualitynp/WMSProxy/http://smog.spatialapps.net:8080/thredds/wms/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/20230310/aero_trgas.d01.2023031012.latlon.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=CO_SFC&COLORSCALERANGE=0,500&STYLES=default-scalar/x-Rainbow",
      style: "",
    },
  },
];

const LAYERS = [
  ...ARCHIVE_LAYERS.map((layer) => ({ tabId: TAB_ID_ARCHIVE, ...layer })),
  ...RECENT_LAYERS.map((layer) => ({ tabId: TAB_ID_RECENT, ...layer })),
  ...FORECAST_LAYERS.map((layer) => ({ tabId: TAB_ID_FORECAST, ...layer })),
];

LAYERS.forEach((layer) => {
  layer.id = `${layer.tabId}-${layer.name}`;
  if (layer.wms) layer.wms.loading = false;
});

export default LAYERS;
