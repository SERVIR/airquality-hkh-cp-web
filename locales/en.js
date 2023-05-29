const dictionary = {
  emission: "Emission",
  about: "About",
  download: "Download",
  close: "Close",
  pause: "Pause",
  play: "Play",
  repeat: "Repeat",
  date: "Date",
  search: "Search",
  archive: "Archive",
  recent: "Recent",
  forecast: "Forecast",
  prev: "Prev",
  next: "Next",
  apply: "Apply",
  add: "Add",
  home: "Home",
  information: "Information",
  chart: "Chart",
};

const chart = {
  exitFullscreen: "Exit Fullscreen",
  viewFullscreen: "View Fullscreen",
  showChart: "Show Chart",
  hideChart: "Hide Chart",
  manageLocations: "Manage locations",
  searchLocation: "Search location",
  addLocation: "Add Location",
  noLocationFoundMessage: "No locations found for the given search",
};

const map = {
  startDate: "Start Date",
  endDate: "End Date",
  last24Hrs: "Last 24 Hours",
  mapControl: "Map Control",
  downloadMap: "Download Map",
  refreshMap: "Refresh Map",
  addLocationPopupMessage: "Do you want to add this location?",
  addLocationSuccessMessage: "New location saved!",
  search: {
    emptySearchResultMessage: "No results found!",
  },
};

const layers = {
  layers: "Layers",
  manageLayers: "Manage Layers",
  searchLayers: "Search Layers",
  noLayersFound: "No layers found for the given search",
  noDataBadge: "No Data Available",
};

const emission = {
  infoItems: {
    sum: "Sum",
    minimum: "Minimum",
    maximum: "Maximum",
    mean: "Mean",
    standardDeviation: "Standard Deviation",
  },
  sectors: {
    Total: "Total",
    Residential: "Residential",
    Industry: "Industry",
    Transport: "Transport",
    Energy: "Energy",
  },
};

const header = {
  logoAlt: "ICIMOD Air Quality Watch - HKH",
  title: "Air Quality Watch - HKH",
};

const about = {
  title: "Air Quality Information System",
  section_01: `ICIMOD is a regional intergovernmental learning and knowledge-sharing centre serving the eight regional member
  countries of the Hindu Kush Himalaya (HKH) - Afghanistan, Bangladesh, Bhutan, China, India, Myanmar, Nepal, and
  Pakistan. Working in partnership with regional and international organizations, ICIMOD aims to influence policy
  and practices to meet environmental and livelihood challenges emerging in the HKH. ICIMOD provides a platform for
  researchers, practitioners, and policy makers from the region and around the globe to generate and share
  knowledge, support evidence-based decision making, and encourage regional cooperation.`,
  section_02: {
    title: "ICIMOD works through its six regional programmes",
    list: {
      item_1: "1) Adaptation and Resilience Building,",
      item_2: "2) Transboundary Landscapes,",
      item_3: "3) River Basins and Cryosphere,",
      item_4: "4) Atmosphere,",
      item_5: "5) Mountain Environment Regional Information System, and",
      item_6: "6) Mountain Knowledge and Action Networks.",
    },
  },
  section_03: {
    title: "These regional programmes are supported by four thematic areas -",
    list: {
      item_1: "1) Livelihoods,",
      item_2: "2) Ecosystem Services,",
      item_3: "3) Water and Air, and",
      item_4: "4) Geospatial Solutions and underpinned by the Knowledge Management and Communication (KMC) Unit.",
    },
  },
  section_04: {
    title: "The Regional Atmosphere Programme involves in",
    list: {
      item_1: "1) Identifying, testing, and piloting mitigation solutions",
      item_2: "2) Building capacity and outreach",
      item_3: "3) Fostering regional collaboration and building cross-border networks and",
      item_4: "4) Contributing to policy at local, national, regional, and global levels.",
    },
  },
  section_05: `The Atmospheric Watch Initiative (AWI) was established in 2013 as part of our regional programme on Atmosphere.
    Until December 2019, this Initiative was known as the Atmosphere Initiative. AWI’s goal is to promote the adoption
    of effective measures and policies to reduce air pollution and its impacts within the HKH through improved
    knowledge and enhanced capacity of our regional partners. Its work includes improving scientific understanding of
    emissions sources, atmospheric processes and change, and air pollution impacts in the HKH.`,
  section_06: {
    title: "The initiative is involved in",
    list: {
      item_1: "1) Identifying, testing, and piloting mitigation solutions",
      item_2: "2) Building capacity and outreach",
      item_3: "3) Fostering regional collaboration and building cross-border networks",
      item_4: "4) Contributing to policy at local, national, regional, and global levels",
    },
  },
  section_07: `AWI is developing an integrated information platform linking air quality data from various platforms for enhanced
    decision support in the region. This open source platform provides data analysis support to professionals
    responsible for air quality management and regulators. Users of this system will be able to compare different
    pollutants as well as single pollutant observation from different publicly available data repositories (in-situ,
    satellite, model) giving a wider understanding of the observed situation.`,
  datasource: {
    title: "Acknowledgement for Current Data Source",
  },
  disclaimer: {
    title: "Disclaimer!",
    subTitle: [
      "Quality of the datasets are attributed to original data provider quality assurance/quality control.",
      "Additional datasets continue to be added as and when they are readily available.",
    ],
  },
  categories: {
    title: "Data Categories",
    items: [
      "Recent (Last 24 hours)",
      "Archive (Past 1 week)",
      "Forecast (Next 48 hours),",
      "Emission Inventory (Annual)",
    ],
  },
  contact: {
    title: "Contact",
    name: "Bhupesh Adhikary",
    designation: "Senior Air Quality Specialist, Water and Air",
  },
};

export default {
  dictionary,
  chart,
  map,
  layers,
  emission,
  header,
  about,
};
