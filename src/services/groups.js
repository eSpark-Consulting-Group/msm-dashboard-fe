import { api } from "./rtk";

export const groupApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllGroups: builder.query({
      query: () => ({
        url: "/groups",
        method: "GET",
      }),
      providesTags: ["Groups"],
    }),

    getGroupById: builder.query({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Groups", id }],
    }),

    createGroup: builder.mutation({
      query: (newGroup) => ({
        url: "/groups",
        method: "POST",
        body: newGroup,
      }),
      invalidatesTags: ["Groups"],
    }),

    updateGroup: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/groups/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Groups",
        { type: "Groups", id },
      ],
    }),

    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "Groups",
        { type: "Groups", id },
      ],
    }),
  }),
});

export const {
  useGetAllGroupsQuery,
  useGetGroupByIdQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = groupApi;
