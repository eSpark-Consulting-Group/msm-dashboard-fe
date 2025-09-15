import { api } from "./rtk";

export const deviceApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllDevices: builder.query({
            query: ({ page = 1, limit = 10, search = "" }) => ({
                url: `/devices?page=${page}&limit=${limit}&search=${search}`,
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
