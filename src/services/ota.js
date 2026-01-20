import { api } from "./rtk";

export const otaApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentOta: builder.query({
      query: (id) => ({
        url: `/ota/${id}`,
        method: "GET",
      }),
    }),
    getVersionsList: builder.query({
      query: () => ({
        url: `/version-list`,
        method: "GET",
      }),
    }),
    updateVersion: builder.mutation({
      query: (payload) => ({
        url: `/version-list`,
        method: "PUT",
        body: payload,
      }),
    }),
    checkUpdates: builder.query({
      query: () => ({
        url: "/version-list/check-updates",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCurrentOtaQuery,
  useGetVersionsListQuery,
  useUpdateVersionMutation,
  useLazyCheckUpdatesQuery,
} = otaApi;
