import { api } from "./rtk";

export const telemetryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTelemetry: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/telemetry?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getTelemetryById: builder.query({
      query: ({ id }) => ({
        url: `/telemetry/${id}`,
        method: "GET",
      }),
    }),
    getTelemetryByDevice: builder.query({
      query: ({ device_uuid, page = 1, limit = 10 }) => ({
        url: `/telemetry/device/${device_uuid}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getTelemetryByDeviceAndChannel: builder.query({
      query: ({ device_uuid, channel_id }) => ({
        url: `/telemetry/device/${device_uuid}/channel/${channel_id}`,
        method: "GET",
      }),
    }),
    getLastTenTelemetry: builder.query({
      query: ({ device_uuid, channel_id }) => ({
        url: `/telemetry/device/${device_uuid}/channel/${channel_id}/latestten`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllTelemetryQuery,
  useGetTelemetryByDeviceAndChannelQuery,
  useGetTelemetryByIdQuery,
  useGetTelemetryByDeviceQuery,
  useGetLastTenTelemetryQuery,
} = telemetryApi;
