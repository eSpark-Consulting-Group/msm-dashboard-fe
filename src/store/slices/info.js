import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  ntp: {},
  mqtt: {},
  sftp: {},
  mqtts: {},
  ota: {},
};

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    updateDeviceInfo: (state, action) => {
      state.info = { ...state.info, ...action.payload };
    },
    updateNtpInfo: (state, action) => {
      state.ntp = { ...state.ntp, ...action.payload };
    },
    updateMqttInfo: (state, action) => {
      state.mqtt = { ...state.mqtt, ...action.payload };
    },
    updateSftpInfo: (state, action) => {
      state.sftp = { ...state.sftp, ...action.payload };
    },
    updateMqttsInfo: (state, action) => {
      state.mqtts = { ...state.mqtts, ...action.payload };
    },
    updateOtaInfo: (state, action) => {
      state.ota = { ...state.ota, ...action.payload };
    },
    resetTabs: (state, action) => {
      state.info = {};
      state.ntp = {};
      state.mqtt = {};
      state.sftp = {};
      state.mqtts = {};
      state.ota = {};
    },
  },
});

export const {
  updateDeviceInfo,
  updateNtpInfo,
  updateMqttInfo,
  updateSftpInfo,
  updateMqttsInfo,
  updateOtaInfo,
  resetTabs,
} = infoSlice.actions;
export default infoSlice.reducer;
