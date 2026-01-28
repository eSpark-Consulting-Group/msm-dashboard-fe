import { api } from "./rtk";

export const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: () => ({
        url: `/notification/`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Notification" }],
    }),

    markAsAllRead: builder.mutation({
      query: () => ({
        url: `/notification/read-all`,
        method: "PUT",
      }),
      invalidatesTags: () => ["Notification", { type: "Notification" }],
    }),
  }),
});

export const { useGetNotificationQuery, useMarkAsAllReadMutation } =
  notificationApi;
