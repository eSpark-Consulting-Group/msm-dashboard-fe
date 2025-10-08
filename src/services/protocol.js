// import { api } from "./rtk";

// export const protocolApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     getAllProtocols: builder.query({
//       query: ({ device_uuid }) => ({
//         url: `/protocols/${device_uuid}`,
//         method: "GET",
//         // params: { limit, timezone, range_value, range_unit },
//       }),
//     }),
//   }),
// });

// export const { useGetAllProtocolsQuery } = protocolApi;

import { api } from "./rtk";

export const protocolApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProtocols: builder.query({
      query: ({
        device_uuid,
        limit,
        timezone,
        range_value,
        range_unit,
        startTime,
        endTime,
      }) => ({
        url: `/protocols/${device_uuid}`,
        method: "GET",
        params: {
          limit,
          timezone,
          range_value,
          range_unit,
          startTime,
          endTime,
        }, // optional filters
      }),
    }),
  }),
});

// Normal query (page mount par chalegi)
export const { useGetAllProtocolsQuery, useLazyGetAllProtocolsQuery } =
  protocolApi;
