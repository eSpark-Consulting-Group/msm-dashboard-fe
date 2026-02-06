import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: [],
  notification: [],
  alertLoading: false,
  notificationLoading: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addAlertData: (state, action) => {
      state.alert = action.payload;
    },
    addNotificationData: (state, action) => {
      state.notification = action.payload;
    },
    prependAlert: (state, action) => {
      // Add new notification to the beginning for real-time
      state.alert.unshift(action.payload);
    },
    prependNotification: (state, action) => {
      // Add new notification to the beginning for real-time
      state.notification.unshift(action.payload);
    },
    handleNotificationLoading: (state, action) => {
      state.notificationLoading = action.payload;
    },
    handleAlertLoading: (state, action) => {
      state.notificationLoading = action.payload;
    },
    markAllReadInStore: (state, action) => {
      const { type } = action.payload;

      if (type === "notification") {
        state.notification = state.notification.map((n) => ({
          ...n,
          is_read: true,
        }));
      } else if (type === "alert") {
        state.alert = state.alert.map((n) => ({
          ...n,
          is_read: true,
        }));
      }
    },
    clearNotifications: (state) => {
      state.notification = [];
    },
    clearAlerts: (state) => {
      state.notification = [];
    },
  },
});

export const {
  addAlertData,
  addNotificationData,
  prependAlert,
  prependNotification,
  handleAlertLoading,
  handleNotificationLoading,
  markAllReadInStore,
  clearAlerts,
  clearNotifications,
} = notificationSlice.actions;
export default notificationSlice.reducer;
