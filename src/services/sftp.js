import { api } from "./rtk";

export const sftpApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET devices for SFTP by deviceId
    getSftpDevicesById: builder.query({
      query: (deviceId) => ({
        url: `/sftp/device/${deviceId}`,
        method: "GET",
      }),
      providesTags: (result, error, deviceId) => [
        { type: "Sftp", id: deviceId },
      ],
    }),

    // ✅ UPDATE SFTP by id
    updateSftp: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/sftp/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Sftp",
        { type: "Sftp", id },
      ],
    }),
  }),
});

export const { useGetSftpDevicesByIdQuery, useUpdateSftpMutation } = sftpApi;
