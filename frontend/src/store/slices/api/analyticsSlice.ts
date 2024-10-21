import { AnalyticsType, APIResponseDatum } from "@/types";
import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    fetchAnalytics: builder.query<APIResponseDatum<AnalyticsType>, void>({
      query: () => ({
        url: "/analytics",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useFetchAnalyticsQuery,
  util: { updateQueryData: updateLinksQueryData },
} = extendedApiSlice;
