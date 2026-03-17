import { api } from "./rtk";

export const deviceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllDevices: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        statusSort,
        createdSort,
        updatedSort,
        nameSort,
        groupNameSort,
      }) => {
        const params = new URLSearchParams({
          page,
          limit,
          search,
        });

        if (statusSort !== undefined) {
          params.append("status_sort", statusSort === 2 ? 0 : statusSort);
        }

        if (createdSort !== undefined) {
          params.append("created_sort", createdSort);
        }

        if (updatedSort !== undefined) {
          params.append("updated_sort", updatedSort);
        }

        if (nameSort !== undefined) {
          params.append("name_sort", nameSort);
        }

        if (groupNameSort !== undefined) {
          params.append("groupName_sort", groupNameSort);
        }

        return {
          url: `/devices/user?${params.toString()}`,
          method: "GET",
        };
      },
      credentials: "include",
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
      invalidatesTags: (result, error, id) => [
        "Devices",
        { type: "Devices", id },
        "Users",
        { type: "Users" },
      ],
    }),
    getUserDevices: builder.query({
      query: ({ id, page = 1, limit = 10, search = "" }) => ({
        url: `/devices/user_devices/${id}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),
    getAllAssignDevices: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        statusSort,
        createdSort,
        updatedSort,
      }) => {
        const params = new URLSearchParams({
          page,
          limit,
          search,
        });

        if (statusSort !== undefined) {
          params.append("status_sort", statusSort === 2 ? 0 : statusSort);
        }

        if (createdSort !== undefined) {
          params.append("created_sort", createdSort);
        }

        if (updatedSort !== undefined) {
          params.append("updated_sort", updatedSort);
        }

        return {
          url: `/devices/assign_devices?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Devices"],
    }),
    getAssignDeviceById: builder.query({
      query: (id) => ({
        url: `/devices/assign_devices/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Devices", id }],
    }),
    unAssignDevice: builder.mutation({
      query: (id) => ({
        url: `/devices/unassign_imei/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "Devices",
        { type: "Devices", id },
        "Users",
        { type: "Users" },
      ],
    }),
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
  useGetUserDevicesQuery,
  useGetAllAssignDevicesQuery,
  useGetAssignDeviceByIdQuery,
  useUnAssignDeviceMutation,
} = deviceApi;
