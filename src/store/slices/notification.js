import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: [],
  notificationLoading: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotificationData: (state, action) => {
      state.notification = action.payload;
    },
    prependNotification: (state, action) => {
      // Add new notification to the beginning for real-time
      state.notification.unshift(action.payload);
    },
    handleNotificationLoading: (state, action) => {
      state.notificationLoading = action.payload;
    },
    markAllReadInStore: (state) => {
      state.notification = state.notification.map((n) => ({
        ...n,
        is_read: true,
      }));
    },
    clearNotifications: (state) => {
      state.notification = [];
    },
  },
});

export const {
  addNotificationData,
  prependNotification,
  handleNotificationLoading,
  markAllReadInStore,
  clearNotifications,
} = notificationSlice.actions;
export default notificationSlice.reducer;
