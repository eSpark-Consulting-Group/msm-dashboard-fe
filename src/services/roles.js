import { api } from "./rtk";

export const rolesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query({
      query: () => ({
        url: "/role", 
        method: "GET",
      }),
      providesTags: ["Roles"],
    }),

    createRole: builder.mutation({
      query: (newRole) => ({
        url: "/role", 
        method: "POST",
        body: newRole,
      }),
      invalidatesTags: ["Roles"],
    }),
  }),
});

export const {
  useGetAllRolesQuery,
  useCreateRoleMutation,
} = rolesApi; 
