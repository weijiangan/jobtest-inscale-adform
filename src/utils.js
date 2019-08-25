import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

function dateInRange(start, end, date) {
  if (!date) {
    date = dayjs();
  }
  return (
    (date.isAfter(start) || date.isSame(start, "day")) &&
    (date.isBefore(end) || date.isSame(end, "day"))
  );
}

function parseDate(str, format) {
  const parsed = dayjs(str, format);
  console.log(parsed);
  if (parsed.isValid()) {
    return parsed.toDate();
  }
  return undefined;
}

function formatDate(date, format) {
  return dayjs(date).format(format);
}

export { dateInRange, parseDate, formatDate };
