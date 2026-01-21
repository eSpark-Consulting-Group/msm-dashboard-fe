import { createSlice } from "@reduxjs/toolkit";

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
});

export const { setImportLoading, setExportLoading } = otaSlice.actions;
export default otaSlice.reducer;
