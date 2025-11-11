import { api } from "./rtk";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getUserInfo: builder.mutation({
      query: () => ({
        url: "/user/profile",
        method: "GET",
        credentials: "include",
      }),
    }),
    changePassword: builder.mutation({
      query: ({ body }) => ({
        url: "/auth/change-password",
        method: "POST",
        // credentials: "include",
        body,
      }),
    }),
    forgetPassword: builder.mutation({
      query: ({ body }) => ({
        url: "/auth/forget-password",
        method: "POST",
        // credentials: "include",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ body }) => ({
        url: "/auth/reset-password",
        method: "POST",
        // credentials: "include",
        body,
      }),
    }),
    verifyPassword: builder.mutation({
      query: ({ body }) => ({
        url: "/auth/verify-password",
        method: "POST",
        // credentials: "include",
        body,
      }),
    }),
    resetDevicePassword: builder.mutation({
      query: ({ id, body }) => ({
        url: `/auth/change-device-password/${id}`,
        method: "POST",
        body,
        invalidatesTags: (result, error, id) => [
          "Devices",
          { type: "Devices", id },
        ],
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserInfoMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useVerifyPasswordMutation,
  useResetDevicePasswordMutation,
} = authApi;
