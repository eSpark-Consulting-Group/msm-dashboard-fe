import { api } from "./rtk";

export const mqttApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMqttById: builder.query({
      query: (id) => ({
        url: `/mqtt/${id}`,
        method: "GET",
      }),
    }),
    getAllMqtt: builder.query({
      query: () => ({
        url: `/mqtt`,
        method: "GET",
      }),
      providesTags: ["mqtt"],
    }),
    updateMqtt: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/mqtt/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["mqtt"],
    }),
    getMqttByDeviceId: builder.query({
      query: (device_uuid = "ESP90000005") => ({
        url: `/mqtt/device/${device_uuid}`,
        method: "GET",
      }),
      providesTags: ["mqtt"],
    }),
    getMqttsByDeviceId: builder.query({
      query: (device_uuid = "ESP90000005") => ({
        url: `/mqtts/${device_uuid}`,
        method: "GET",
      }),
      providesTags: ["mqtts"],
    }),
    updateMqtts: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/mqtts/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["mqtts"],
    }),
  }),
});

export const {
  useGetAllMqttQuery,
  useGetMqttByDeviceIdQuery,
  useGetMqttByIdQuery,
  useUpdateMqttMutation,
  useGetMqttsByDeviceIdQuery,
  useUpdateMqttsMutation
} = mqttApi;
