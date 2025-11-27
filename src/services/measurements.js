import { api } from "./rtk";

export const measurementsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMeasurementsCtRatio: builder.query({
      query: (id) => ({
        url: `/measurement/${id}/set-ct-ratio`,
        method: "GET",
      }),
    }),
    getMeasurementsVoffSet: builder.query({
      query: (id) => ({
        url: `/measurement/${id}/set-v-offset`,
        method: "GET",
      }),
    }),
    getMeasurementsIoffSet: builder.query({
      query: (id) => ({
        url: `/measurement/${id}/set-i-offset`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetMeasurementsCtRatioQuery,
  useGetMeasurementsVoffSetQuery,
  useGetMeasurementsIoffSetQuery,
} = measurementsApi;
