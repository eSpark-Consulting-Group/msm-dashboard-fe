import { api } from "./rtk";

export const measurementsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMeasurements: builder.query({
            query: (id) => ({
                url: `/measurement/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetMeasurementsQuery
} = measurementsApi;
