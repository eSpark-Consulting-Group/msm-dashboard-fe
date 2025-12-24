import { createSlice } from "@reduxjs/toolkit";
import { measurementsApi } from "../../services/measurements";

const initialState = {
  measurements: {},
};

const measurementsSlice = createSlice({
  name: "measurements",
  initialState,
  reducers: {
    updateDeviceMeasurements: (state, action) => {
      const data = action?.payload;
      const main = {};
      data.forEach((item) => {
        const key = Object.keys(item).find((k) => k !== "command");
        main[key] = item[key];
      });
      state.measurements = main;
    },
    updateCtRatio: (state, action) => {
      const ct_ratio = action.payload?.measurements;
      state.measurements = {
        ...state.measurements,
        ct_ratio,
      };
    },
    updateVoffSet: (state, action) => {
      const v_offset = action.payload?.measurements;
      state.measurements = {
        ...state.measurements,
        v_offset,
      };
    },
    updateIoffSet: (state, action) => {
      const i_offset = action.payload?.measurements;
      state.measurements = {
        ...state.measurements,
        i_offset,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      measurementsApi.endpoints.getMeasurementsCtRatio.matchFulfilled,
      (state, { payload }) => {
        const ct_ratio = payload?.data?.measurements;
        state.measurements = {
          ...state.measurements,
          ct_ratio,
        };
      }
    );
    builder.addMatcher(
      measurementsApi.endpoints.getMeasurementsVoffSet.matchFulfilled,
      (state, { payload }) => {
        const v_offset = payload?.data?.measurements;

        state.measurements = {
          ...state.measurements,
          v_offset,
        };
      }
    );
    builder.addMatcher(
      measurementsApi.endpoints.getMeasurementsIoffSet.matchFulfilled,
      (state, { payload }) => {
        const i_offset = payload?.data?.measurements;

        state.measurements = {
          ...state.measurements,
          i_offset,
        };
      }
    );
  },
});

export const {
  updateDeviceMeasurements,
  updateCtRatio,
  updateVoffSet,
  updateIoffSet,
} = measurementsSlice.actions;
export default measurementsSlice.reducer;
