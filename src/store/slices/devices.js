import { createSlice } from "@reduxjs/toolkit";
import { deviceApi } from "../../services/devices";

const initialState = {
  devices: [],
  assignDevices: [],
  selectedDevice: null,
  currentDevice: null,
};

const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    clearDevices: (state) => {
      state.devices = [];
      state.selectedDevice = null;
    },
    addDeviceStatus: (state, action) => {
      state.currentDevice = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      deviceApi.endpoints.getAllDevices.matchFulfilled,
      (state, { payload }) => {
        state.devices = payload?.data || payload || [];
      }
    );
    builder.addMatcher(
      deviceApi.endpoints.getAllAssignDevices.matchFulfilled,
      (state, { payload }) => {
        state.assignDevices = payload?.data || payload || [];
      }
    );

    builder.addMatcher(
      deviceApi.endpoints.getDeviceById.matchFulfilled,
      (state, { payload }) => {
        state.selectedDevice = payload?.data || payload;
      }
    );
  },
});

export const { clearDevices, addDeviceStatus } = devicesSlice.actions;
export default devicesSlice.reducer;
