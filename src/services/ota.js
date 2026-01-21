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
    importVersion: builder.mutation({
      query: (formData) => ({
        url: "/version-list/import",
        method: "POST",
        body: formData,
      }),
    }),
    exportSelectedVersion: builder.mutation({
      query: (payload) => ({
        url: "/version-list/export",
        method: "POST",
        body: payload,
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),
    }),
  }),
});

export const {
  useGetCurrentOtaQuery,
  useGetVersionsListQuery,
  useUpdateVersionMutation,
  useExportSelectedVersionMutation,
  useImportVersionMutation,
  useLazyCheckUpdatesQuery,
} = otaApi;
