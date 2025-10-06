import { createSlice } from "@reduxjs/toolkit";
import { addDeviceStatus } from "./devices";

const initialState = {
  limit: 5,
  mqttData: [],
  mqttDataHistory: [],
  mqttDataHistoryLoading: false,
  mqttMessage: "Realtime",
  currentData: 0,
  dataState: 0,
};

const mqttSlice = createSlice({
  name: "mqtt",
  initialState,
  reducers: {
    addMqttProtocol: (state, payload) => {
      state.limit = payload?.payload;
    },
    addMqttData: (state, action) => {
      state.mqttData.push(action.payload);

      // If limit changes, always enforce it
      if (state.mqttData.length > state.limit) {
        state.mqttData = state.mqttData.slice(-state.limit);
      }
    },
    addCurrentData: (state, payload) => {
      state.currentData = payload.payload;
    },
    addMqttDataState: (state, payload) => {
      state.dataState = payload?.payload;
    },
    addMqttHistoryData: (state, payload) => {
      state.mqttDataHistory = payload?.payload;
    },
    addMqttMessage: (state, payload) => {
      state.mqttMessage = payload?.payload;
    },
    handleMqttLoading: (state, payload) => {
      state.mqttDataHistoryLoading = payload?.payload;
    },
    handleMqttDisconnect: (state) => {
      state.mqttData = [];
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(addDeviceStatus, (state, action) => {
  //     const device = action.payload;
  //     if (device === false) {
  //       state.currentData = 1;
  //       state.dataState = 1;
  //     } else if (device === true) {
  //       state.currentData = 1;
  //       state.dataState = 1;
  //     }
  //   });
  // },
});

export const {
  addMqttProtocol,
  addMqttData,
  addCurrentData,
  addMqttDataState,
  addMqttHistoryData,
  addMqttMessage,
  handleMqttLoading,
  handleMqttDisconnect,
} = mqttSlice.actions;
export default mqttSlice.reducer;
