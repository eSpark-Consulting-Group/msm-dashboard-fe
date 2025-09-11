import { api } from "./rtk";

export const dashboardApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllDashboards: builder.query({
            query: () => ({
                url: "/dashboard",
                method: "GET",
            }),
            providesTags: ["Dashboards"],
        }),

        getDashboardById: builder.query({
            query: (id) => ({
                url: `/dashboard/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Dashboards", id }],
        }),

        createDashboard: builder.mutation({
            query: (newDashboard) => ({
                url: "/dashboard",
                method: "POST",
                body: newDashboard,
            }),
            invalidatesTags: ["Dashboards"],
        }),

        updateDashboard: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/dashboard/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: (result, error, { id }) => [
                "Dashboards",
                { type: "Dashboards", id },
            ],
        }),

        deleteDashboard: builder.mutation({
            query: (id) => ({
                url: `/dashboard/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                "Dashboards",
                { type: "Dashboards", id },
            ],
        }),
    }),
});

export const {
    useGetAllDashboardsQuery,
    useGetDashboardByIdQuery,
    useCreateDashboardMutation,
    useUpdateDashboardMutation,
    useDeleteDashboardMutation,
} = dashboardApi;
