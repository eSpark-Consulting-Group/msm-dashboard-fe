import { createSlice } from "@reduxjs/toolkit";
import { deviceApi } from "../../services/devices";

const initialState = {
    devices: [],
    selectedDevice: null,
};

const devicesSlice = createSlice({
    name: "devices",
    initialState,
    reducers: {
        clearDevices: (state) => {
            state.devices = [];
            state.selectedDevice = null;
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
            deviceApi.endpoints.getDeviceById.matchFulfilled,
            (state, { payload }) => {
                state.selectedDevice = payload?.data || payload;
            }
        );
    },
});

export const { clearDevices } = devicesSlice.actions;
export default devicesSlice.reducer;
