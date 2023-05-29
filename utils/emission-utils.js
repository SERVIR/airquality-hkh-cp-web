import * as api from "@/api";

export const getLayerConfig = ({ inventory, pollutant, sector, year }) => {
  const baseUrl = `http://smog.spatialapps.net:8080/thredds/wms/HKHEmissions/${inventory}/${pollutant}/`;
  const nc = `${inventory}_${pollutant}_${year}.nc`;
  const opacity = 0.7;

  return {
    url: baseUrl + nc,
    config: {
      format: "image/png",
      transparent: true,
      SLD_BODY: `<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sldStyledLayerDescriptor.xsd"                       xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"                       xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink"                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">    <NamedLayer>        <se:Name>${sector}</se:Name>        <UserStyle>            <se:Name>Thesholded colour scheme</se:Name>            <se:CoverageStyle>                <se:Rule>                    <se:RasterSymbolizer>                        <se:Opacity>${opacity}</se:Opacity>                        <se:ColorMap>                            <se:Categorize fallbackValue="#00000000">                                <se:LookupValue>Rasterdata</se:LookupValue>                                <se:Value>#00008F</se:Value><se:Threshold>0.00001</se:Threshold><se:Value>#006BFF</se:Value><se:Threshold>0.0001</se:Threshold><se:Value>#00DBFF</se:Value><se:Threshold>0.001</se:Threshold><se:Value>#47FFB7</se:Value><se:Threshold>0.01</se:Threshold><se:Value>#B7FF47</se:Value><se:Threshold>0.1</se:Threshold><se:Value>#FFD700</se:Value><se:Threshold>1</se:Threshold><se:Value>#FF6700</se:Value><se:Threshold>10</se:Threshold><se:Value>#F60000</se:Value><se:Threshold>100</se:Threshold><se:Value>#8C0000</se:Value>                            </se:Categorize>                        </se:ColorMap>                    </se:RasterSymbolizer>                </se:Rule>            </se:CoverageStyle>        </UserStyle>    </NamedLayer></StyledLayerDescriptor>`,
      SRS: "EPSG:3857",
      layer: sector,
      TIME: `${year}-01-01T00:00:00.000Z`,
      opacity,
    },
  };
};

export const getInformation = async (mapControls) => {
  try {
    const apiResponse = await api.getEmissionInformation(mapControls);
    return apiResponse.data.reduce((info, { StatName, StatValue }) => {
      const key = (StatName.charAt(0).toLowerCase() + StatName.slice(1)).replace(" ", "");
      info[key] = StatValue;
      return info;
    }, {});
  } catch (error) {
    console.log(error);
  }
  return {};
};
