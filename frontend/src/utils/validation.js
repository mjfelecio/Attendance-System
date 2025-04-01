import { parse, isValid, isAfter } from 'date-fns';

export function isValidName(name) {
  // Check if the name is not null or an empty string
  return name !== null && name.trim() !== "";
}

export function isValidDateFormat(dateString) {
  if (!dateString) return false;

  // Try parsing the date string in the 'yyyy-MM-dd' format
  const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());

  // Check if the parsed date is valid
  return isValid(parsedDate);
}

export function isValidTimeFormat(timeString) {
  if (!timeString) return false;

  // Try parsing the time string in the 'HH:mm' format (military time)
  const parsedTime = parse(timeString, 'HH:mm', new Date());

  // Check if the parsed time is valid
  return isValid(parsedTime);
}

export function validateEventInput(eventObj) {
	const { name, description, date: startDate, endDate, startTime, endTime } = eventObj;
  
	// Validate name
	if (!isValidName(name)) {
	  console.error("Invalid name");
	  return false;
	}
  
	// Validate start date
	if (!isValidDateFormat(startDate)) {
	  console.error("Invalid start date format");
	  return false;
	}
  
	// If endDate exists, validate it
	if (endDate && !isValidDateFormat(endDate)) {
	  console.error("Invalid end date format");
	  return false;
	}
  
	// Check if endDate is after startDate, but only if endDate is provided
	if (endDate) {
	  const parsedStartDate = parse(startDate, 'yyyy-MM-dd', new Date());
	  const parsedEndDate = parse(endDate, 'yyyy-MM-dd', new Date());
	  
	  if (!isAfter(parsedEndDate, parsedStartDate)) {
		console.error("End date must be after start date");
		return false;
	  }
	}
  
	// Validate start time and end time
	if (!isValidTimeFormat(startTime) || !isValidTimeFormat(endTime)) {
	  console.error("Invalid time format");
	  return false;
	}
  
	// Check if end time is after start time
	const parsedStartTime = parse(startTime, 'HH:mm', new Date());
	const parsedEndTime = parse(endTime, 'HH:mm', new Date());
  
	if (!isAfter(parsedEndTime, parsedStartTime)) {
	  console.error("End time must be after start time");
	  return false;
	}
  
	// If all validations pass, return true
	return true;
  }
