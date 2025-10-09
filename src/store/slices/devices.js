import { createSlice } from "@reduxjs/toolkit";
import { deviceApi } from "../../services/devices";

const initialState = {
  devices: [],
  assignDevices: [],
  selectedDevice: null,
  currentDevice: false,
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
    handleSelectedDevice: (state, action) => {
      state.selectedDevice = action?.payload;
    },
    handleUpdateDevice: (state, action) => {
      const updated = action.payload;
      // console.log("update");

      // ✅ Update device inside the list
      const device = state.devices?.find(
        (item) => item?.device_data?.device_uuid === updated?.device_uuid
      );

      if (device) {
        Object.keys(device.device_data).forEach((key) => {
          if (updated.hasOwnProperty(key)) {
            device.device_data[key] = updated[key];
          }
        });
      }

      // ✅ Also update the selectedDevice if it matches the same UUID
      if (
        state.selectedDevice &&
        state.selectedDevice.device_data?.device_uuid === updated?.device_uuid
      ) {
        Object.keys(state.selectedDevice.device_data).forEach((key) => {
          if (updated.hasOwnProperty(key)) {
            state.selectedDevice.device_data[key] = updated[key];
          }
        });
      }
    },
    handleUpdateAssignDevice: (state, action) => {
      const updated = action.payload;
      // console.log("assign");

      // ✅ Update inside assignDevices array
      const assigned = state.assignDevices?.find(
        (item) =>
          item?.device_data?.device_data?.device_uuid === updated?.device_uuid
      );

      if (assigned) {
        Object.keys(assigned.device_data.device_data).forEach((key) => {
          if (updated.hasOwnProperty(key)) {
            assigned.device_data.device_data[key] = updated[key];
          }
        });
      }

      // ✅ Also update selectedDevice if it matches
      if (
        state.selectedDevice &&
        state.selectedDevice.device_data?.device_data?.device_uuid ===
          updated?.device_uuid
      ) {
        Object.keys(state.selectedDevice.device_data.device_data).forEach(
          (key) => {
            if (updated.hasOwnProperty(key)) {
              state.selectedDevice.device_data.device_data[key] = updated[key];
            }
          }
        );
      }
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

export const {
  clearDevices,
  addDeviceStatus,
  handleSelectedDevice,
  handleUpdateDevice,
  handleUpdateAssignDevice,
} = devicesSlice.actions;
export default devicesSlice.reducer;
