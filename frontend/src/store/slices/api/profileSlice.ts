import { APIResponseDatum, User } from "@/types";
import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    updateProfile: builder.mutation<
      APIResponseDatum<Pick<User, "name" | "email" | "password">>,
      { email?: string; name?: string; password?: string }
    >({
      query: (data) => ({
        url: "/profile",
        method: "PUT",
        data,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = extendedApiSlice;
