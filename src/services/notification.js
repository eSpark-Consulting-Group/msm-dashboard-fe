// services/notification.js
import { api } from "./rtk";

export const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: ({ page = 1, limit = 10, unread_only = false, type = "" }) => ({
        url: `/notification`,
        method: "GET",
        params: {
          page,
          limit,
          unread_only,
          ...(type ? { type } : {}),
        },
      }),
      providesTags: [{ type: "Notification" }],
    }),

    markAsAllRead: builder.mutation({
      query: ({ type }) => ({
        url: `/notification/read-all/${type}`,
        method: "PUT",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const { useGetNotificationQuery, useMarkAsAllReadMutation } =
  notificationApi;
