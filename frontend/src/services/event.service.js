// Function that sends / receives data to the backend based on the endpoint and options passed to it
const apiCall = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`/api/event${endpoint}`, options);
    const data = await res.json();

    // If anything fails on the backend, pass the message through this
    if (!res.ok || !data.success) {
      return {
        success: false,
        message: data.message || "An error occurred",
        data: null,
      };
    }

    return {
      success: true,
      data: data.data,
      message: data.message || "Success",
    };
  } catch (error) {
    console.error("Network error:", error.message);
    return {
      success: false,
      message: "Network error. Please try again.",
      data: null,
    };
  }
};

export const createEventApi = async (newEvent) =>
  apiCall("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEvent),
  });

export const fetchEventsApi = async () => apiCall("/");

export const editEventApi = async (eventId, editedEvent) =>
  apiCall(`/${eventId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editedEvent),
  });

export const deleteEventApi = async (eventId) =>
  apiCall(`/${eventId}`, {
    method: "DELETE",
  });
