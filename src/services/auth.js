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
  }),
});

export const { useLoginMutation, useGetUserInfoMutation } = authApi;
