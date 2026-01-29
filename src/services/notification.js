// services/notification.js
import { api } from "./rtk";

export const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: ({ page = 1, limit = 10, unread_only = false }) => ({
        url: `/notification`,
        method: "GET",
        params: {
          page,
          limit,
          unread_only,
        },
      }),
      providesTags: [{ type: "Notification" }],
    }),

    markAsAllRead: builder.mutation({
      query: () => ({
        url: `/notification/read-all`,
        method: "PUT",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const { useGetNotificationQuery, useMarkAsAllReadMutation } =
  notificationApi;
