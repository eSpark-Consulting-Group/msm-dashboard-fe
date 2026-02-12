import { api } from "./rtk";

export const configurationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConfigurationDevicesById: builder.query({
      query: (deviceId) => ({
        url: `/configuration/${deviceId}`,
        method: "GET",
      }),
      providesTags: (result, error, deviceId) => [
        { type: "Configuration", id: deviceId },
      ],
    }),

    updateConfiguration: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/configuration/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Configuration",
        { type: "Configuration", id },
      ],
    }),
  }),
});

export const {
  useGetConfigurationDevicesByIdQuery,
  useUpdateConfigurationMutation,
} = configurationApi;
