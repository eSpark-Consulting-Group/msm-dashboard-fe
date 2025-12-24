import { api } from "./rtk";

export const ntpApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET NTP devices by deviceId
    getNtpDevicesById: builder.query({
      query: (deviceId) => ({
        url: `/ntp/${deviceId}`,
        method: "GET",
      }),
      providesTags: (result, error, deviceId) => [
        { type: "Ntp", id: deviceId },
      ],
    }),

    // ✅ UPDATE NTP by id
    updateNtp: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/ntp/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => ["Ntp", { type: "Ntp", id }],
    }),
  }),
});

export const { useGetNtpDevicesByIdQuery, useUpdateNtpMutation } = ntpApi;
