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

    updateDevice: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/devices/user/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Devices",
        { type: "Devices", id },
      ],
    }),

    deleteDevice: builder.mutation({
      query: (id) => ({
        url: `/devices/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "Devices",
        { type: "Devices", id },
      ],
    }),

    deleteUserDevice: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/devices/user/${id}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    })
  }),
});

export const {
  useGetAllDevicesQuery,
  useGetDeviceByIdQuery,
  useAddDeviceMutation,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation,
  useDeleteUserDeviceMutation,
  useRebootDeviceMutation,
} = deviceApi;
