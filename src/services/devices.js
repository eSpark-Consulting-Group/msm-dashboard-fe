import { api } from "./rtk";

export const deviceApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllDevices: builder.query({
            query: () => ({
                url: "/devices",
                method: "GET",
            }),
            providesTags: ["Devices"],
        }),

        getDeviceById: builder.query({
            query: (id) => ({
                url: `/devices?id=${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Devices", id }],
        }),
    }),
});

export const {
    useGetAllDevicesQuery,
    useGetDeviceByIdQuery,
} = deviceApi;
