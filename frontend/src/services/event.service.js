// Function that sends / receives data to the backend based on the endpoint and options passed to it
const apiCall = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`/api/event${endpoint}`, options);
    
    // Check if response has content before parsing JSON
    const contentType = res.headers.get('content-type');
    let data = null;
    
    if (contentType && contentType.includes('application/json')) {
      try {
        data = await res.json();
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        return {
          success: false,
          message: 'Invalid response from server',
          data: null,
        };
      }
    } else if (res.status === 204) {
      // Handle 204 No Content response
      return {
        success: true,
        data: null,
        message: 'Operation successful',
      };
    } else {
      return {
        success: false,
        message: 'Unexpected response format',
        data: null,
      };
    }

    // If anything fails on the backend, pass the message through this
    if (!res.ok || (data && !data.success)) {
      return {
        success: false,
        message: data?.message || `Request failed with status ${res.status}`,
        data: null,
      };
    }

    return {
      success: true,
      data: data?.data || null,
      message: data?.message || 'Success',
    };
  } catch (error) {
    console.error('API call error:', error.message);
    return {
      success: false,
      message: error.message.includes('Failed to fetch') 
        ? 'Unable to connect to the server. Please check your connection.' 
        : 'An unexpected error occurred',
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
