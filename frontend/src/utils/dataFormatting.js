
// Restructures an event object from Full Calendar into something 
// that is parse-able by the database
function restructureEvent(event) {
  return {
    name: event.title,
    description: event.extendedProps?.description || "",
    date: event.start,
    startTime: event.extendedProps?.eventStart || "",
    endTime: event.extendedProps?.eventEnd || "",
  };
}
