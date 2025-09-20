import { api } from "./rtk";

export const protocolApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProtocols: builder.query({
      query: ({ device_uuid }) => ({
        url: `/protocols/${device_uuid}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllProtocolsQuery } = protocolApi;
