import { create } from "zustand";

import { createEventApi, fetchEventsApi } from "../services/event.service.js";

const useEventStore = create((set) => ({
  events: [],

  createEvent: async (newEvent) => {
    try {
      const { success, message, data } = await createEventApi(newEvent);
      if (success) {
        set((state) => ({ items: [...state.events, data] }));
      }
      return { success, data, message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  fetchEvents: async () => {
    try {
        const { success, message, data } = await fetchEventsApi();
        if (success) {
            set({ items: data });
        }
        return { success, data, message };
    } catch (error) {
        return { success: false, message: error.message };
    }
},
}));

export default useEventStore;