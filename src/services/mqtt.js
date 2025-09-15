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
    }),
    updateMqtt: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/mqtt/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),
    getMqttByDeviceId: builder.query({
      query: (device_uuid = "ESP90000005") => ({
        url: `/mqtt/device/${device_uuid}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllMqttQuery,
  useGetMqttByDeviceIdQuery,
  useGetMqttByIdQuery,
  useUpdateMqttMutation,
} = mqttApi;
