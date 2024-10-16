import { APIActionResponse, APIResponse, LinkType } from "@/types";
import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    fetchLinks: builder.query<APIResponse<LinkType>, void>({
      query: () => ({
        url: "/links",
        method: "GET",
      }),
    }),
    createLink: builder.mutation<
      APIActionResponse<LinkType>,
      { url: string; expiry_time?: Date | null }
    >({
      query: (data) => ({
        url: "/links",
        method: "POST",
        data,
      }),
    }),
    updateLink: builder.mutation<
      APIActionResponse<LinkType>,
      { id?: number; url: string; expiry_time?: Date | null }
    >({
      query: ({ id, ...data }) => ({
        url: `/links/${id}`,
        method: "PUT",
        data,
      }),
    }),
    deleteLink: builder.mutation<APIActionResponse<LinkType>, { id: number }>({
      query: ({ id }) => ({
        url: `/links/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchLinksQuery,
  useCreateLinkMutation,
  useUpdateLinkMutation,
  useDeleteLinkMutation,
  util: { updateQueryData: updateLinksQueryData },
} = extendedApiSlice;
