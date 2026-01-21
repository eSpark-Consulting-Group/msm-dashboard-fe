import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./auth";

const initialState = {
  OTA_file_import_loading: false,
  OTA_file_export_loading: false,
};

const otaSlice = createSlice({
  name: "ota",
  initialState,
  reducers: {
    setImportLoading: (state, action) => {
      state.OTA_file_import_loading = action.payload;
    },
    setExportLoading: (state, action) => {
      state.OTA_file_export_loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState); // ✅ reset OTA state
  },
});

export const { setImportLoading, setExportLoading } = otaSlice.actions;
export default otaSlice.reducer;
