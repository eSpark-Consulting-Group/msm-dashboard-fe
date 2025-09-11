import { createSlice } from "@reduxjs/toolkit";
import { dashboardApi } from "../../services/dashboard";

const initialState = {
  dashboards: [],
  selectedDashboard: null,
};

const dashboardsSlice = createSlice({
  name: "dashboards",
  initialState,
  reducers: {
    clearDashboards: (state) => {
      state.dashboards = [];
      state.selectedDashboard = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      dashboardApi.endpoints.getAllDashboards.matchFulfilled,
      (state, { payload }) => {
        state.dashboards = payload?.data || payload || [];
      }
    );

    builder.addMatcher(
      dashboardApi.endpoints.getDashboardById.matchFulfilled,
      (state, { payload }) => {
        state.selectedDashboard = payload?.data || payload;
      }
    );
  },
});

export const { clearDashboards } = dashboardsSlice.actions;
export default dashboardsSlice.reducer;
