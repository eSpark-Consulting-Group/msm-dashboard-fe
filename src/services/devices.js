import { api } from "./rtk";

export const deviceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllDevices: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/devices/user?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Devices"],
    }),

    getDeviceById: builder.query({
      query: (id) => ({
        url: `/devices/user/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Devices", id }],
    }),

    addDevice: builder.mutation({
      query: (body) => ({
        url: "/devices/user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Devices"],
    }),
    rebootDevice: builder.mutation({
      query: (id) => ({
        url: `/devices/${id}/reboot`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAllDevicesQuery,
  useGetDeviceByIdQuery,
  useAddDeviceMutation,
  useRebootDeviceMutation,
} = deviceApi;
