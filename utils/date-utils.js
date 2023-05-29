import moment from "moment-timezone";

export const FORMAT_DATE = "YYYY-MM-DD";

export const FORMAT_DATETIME = "YYYY-MM-DD HH:mm:ss";

export const FORMAT_DATETIME_AMPM = "YYYY-MM-DD hh:mm:ss a";

export const utcDateStrToTimzezoneTimestamp = (dateStr, timezone) => {
  return moment.utc(dateStr, FORMAT_DATETIME).tz(timezone).format(FORMAT_DATETIME_AMPM);
};

export const jsDateToUtcStr = (date, timezone) => {
  const utcDate = timezone === "UTC" ? moment(date) : moment.tz(date, "UTC");
  return utcDate.format(FORMAT_DATETIME);
};
