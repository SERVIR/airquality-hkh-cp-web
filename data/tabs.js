import moment from "moment-timezone";
import { FORMAT_DATE } from "@/utils/date-utils";

class Tab {
  constructor({ id, startDate, endDate }) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

const getDate = (method, days, unit) => moment()[method](days, unit).utc().format(FORMAT_DATE);

export const TAB_ID_RECENT = "Recent";
export const TAB_ID_ARCHIVE = "Archive";
export const TAB_ID_FORECAST = "Forecast";

export const ARCHIVE = new Tab({
  id: TAB_ID_ARCHIVE,
  startDate: getDate("subtract", 8, "days"),
  endDate: getDate("subtract", 1, "day"),
});

export const RECENT = new Tab({
  id: TAB_ID_RECENT,
  startDate: getDate("subtract", 1, "day"),
  endDate: getDate("subtract", 0, "day"),
});

export const FORECAST = new Tab({
  id: TAB_ID_FORECAST,
  startDate: getDate("add", 1, "day"),
  endDate: getDate("add", 2, "days"),
});

export const TABS = [ARCHIVE, RECENT, FORECAST];
