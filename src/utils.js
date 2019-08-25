import dayjs from "dayjs";

function dateInRange(start, end, date) {
  if (!date) {
    date = dayjs();
  }
  return (
    (date.isAfter(start) || date.isSame(start, "day")) &&
    (date.isBefore(end) || date.isSame(end, "day"))
  );
}

export { dateInRange };
