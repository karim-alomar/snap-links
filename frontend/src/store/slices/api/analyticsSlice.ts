import {
  APIResponse,
  BrowserAnalytics,
  DeviceAnalytics,
  CountryAnalytics,
} from "@/types";
import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBrowserAnalytics: builder.query<APIResponse<BrowserAnalytics>, void>({
      query: () => ({
        url: "/browser-analytics",
        method: "GET",
      }),
    }),
    getDeviceAnalytics: builder.query<APIResponse<DeviceAnalytics>, void>({
      query: () => ({
        url: "/device-analytics",
        method: "GET",
      }),
    }),
    getCountryAnalytics: builder.query<APIResponse<CountryAnalytics>, void>({
      query: () => ({
        url: "/country-analytics",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetBrowserAnalyticsQuery,
  useGetDeviceAnalyticsQuery,
  useGetCountryAnalyticsQuery,
  util: { updateQueryData: updateLinksQueryData },
} = extendedApiSlice;
