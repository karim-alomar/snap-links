import { APIActionResponse, APIResponse, User } from "@/types";
import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    login: builder.mutation<
      APIResponse<User>,
      Pick<User, "email" | "password">
    >({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data,
      }),
    }),
    register: builder.mutation<
      APIActionResponse<User>,
      Pick<User, "name" | "email" | "password">
    >({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = extendedApiSlice;