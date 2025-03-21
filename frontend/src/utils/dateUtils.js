export function convertToUTC(dateString) {
  const localDate = new Date(dateString);

  const utcYear = localDate.getUTCFullYear();
  const utcMonth = localDate.getUTCMonth();
  const utcDate = localDate.getUTCDate();
  const utcHours = localDate.getUTCHours();
  const utcMinutes = localDate.getUTCMinutes();
  const utcSeconds = localDate.getUTCSeconds();

  const utcDateObject = new Date(
    Date.UTC(utcYear, utcMonth, utcDate, utcHours, utcMinutes, utcSeconds),
  );

  return utcDateObject;
}

export function getDateOnly(date) {
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getHourAndMinuteOnly(date) {
  const dateObj = new Date(date);

  const hour = String(dateObj.getHours()).padStart(2, "0");
  const min = String(dateObj.getMinutes()).padStart(2, "0");

  return `${hour}:${min}`;
}
