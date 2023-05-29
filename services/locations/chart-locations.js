import * as api from "@/api";
import { CHART_COLORS } from "@/data/chart";

const DEFAULT_LOCATIONS = ["Dhaka", "Lahore", "Kolkata", "New Delhi"];

let cachedLocations = [];
let colorRunner = 0;

const getIsSelected = (locationName) => DEFAULT_LOCATIONS.includes(locationName);
const getColor = (locationName) => (getIsSelected(locationName) ? CHART_COLORS[colorRunner++] : "");

export default async () => {
  if (!cachedLocations.length) {
    try {
      const response = await api.getLocations();

      cachedLocations = response.data.data.map(({ id, site, latitude, longitude }) => ({
        id,
        name: site,
        lat: latitude,
        lng: longitude,
        selected: getIsSelected(site),
        show: true,
        color: getColor(site),
      }));
    } catch (error) {
      console.log(error);
    }
  }

  return cachedLocations;
};
