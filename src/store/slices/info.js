import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  ntp: {},
  mqtt: {},
  sftp: {},
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
  },
});

export const {
  updateDeviceInfo,
  updateNtpInfo,
  updateMqttInfo,
  updateSftpInfo,
} = infoSlice.actions;
export default infoSlice.reducer;
