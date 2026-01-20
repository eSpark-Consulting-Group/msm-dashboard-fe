import { api } from "./rtk";

export const measurementsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMeasurementsCtRatio: builder.query({
      query: (id) => ({
        url: `/measurement/${id}/set-ct-ratio`,
        method: "GET",
      }),
      providesTags: ["ct-ratio"],
    }),
    getMeasurementsVoffSet: builder.query({
      query: (id) => ({
        url: `/measurement/${id}/set-v-offset`,
        method: "GET",
      }),
      providesTags: ["v-offset"],
    }),
    getMeasurementsIoffSet: builder.query({
      query: (id) => ({
        url: `/measurement/${id}/set-i-offset`,
        method: "GET",
      }),
      providesTags: ["i-offset"],
    }),
    updateCtRatio: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/measurement/${id}/set-ct-ratio`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["ct-ratio"],
    }),
    updateIoffSet: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/measurement/${id}/set-i-offset`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["i-offset"],
    }),
    updateVoffSet: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/measurement/${id}/set-v-offset`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["v-offset"],
    }),
  }),
});

export const {
  useGetMeasurementsCtRatioQuery,
  useGetMeasurementsVoffSetQuery,
  useGetMeasurementsIoffSetQuery,
  useUpdateCtRatioMutation,
  useUpdateIoffSetMutation,
  useUpdateVoffSetMutation,
} = measurementsApi;
