class Pollutant {
  constructor({ id, type, name, urlName, yAxisLabel }) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.urlName = urlName || name;
    this.yAxisLabel = yAxisLabel;
  }
}

export const PM2P5 = new Pollutant({
  id: 1,
  type: "PM",
  name: "PM2.5",
  urlName: "PM2p5",
  yAxisLabel: "PM 2.5 (μg/m3)",
});

export const O3 = new Pollutant({
  id: 2,
  type: "O3",
  name: "O3",
  yAxisLabel: "ppb",
});

export const SO2 = new Pollutant({
  id: 3,
  type: "SO2",
  name: "SO2",
  yAxisLabel: "molecules/cm2",
});

export const NO2 = new Pollutant({
  id: 4,
  type: "NO2",
  name: "NO2",
  yAxisLabel: "molecules/cm2",
});

export const CO = new Pollutant({
  id: 5,
  type: "CO",
  name: "CO",
  yAxisLabel: "molecules/cm2",
});
