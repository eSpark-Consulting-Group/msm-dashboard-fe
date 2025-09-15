import { api } from "./rtk";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: ({ page = 1, limit = 10, search = "" }) => ({
                url: `/users?page=${page}&limit=${limit}&search=${search}`,
                method: "GET",
            }),
            providesTags: ["Users"],
        }),

        getUserById: builder.query({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Users", id }],
        }),

        createUser: builder.mutation({
            query: (newUser) => ({
                url: "/users",
                method: "POST",
                body: newUser,
            }),
            invalidatesTags: ["Users"],
        }),

        updateUser: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/users/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: (result, error, { id }) => [
                "Users",
                { type: "Users", id },
            ],
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                "Users",
                { type: "Users", id },
            ],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;
