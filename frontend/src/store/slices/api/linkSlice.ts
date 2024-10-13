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
      { url: string; expiry_time?: number | null }
    >({
      query: (data) => ({
        url: "/links",
        method: "POST",
        data,
      }),
    }),
    updateLink: builder.mutation<
      APIActionResponse<LinkType>,
      { id?: number; url: string; expiry_time?: number | null }
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
    clickLink: builder.mutation<APIActionResponse<LinkType>, { id: number }>({
      query: ({ id }) => ({
        url: `/links/${id}/click-link`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useFetchLinksQuery,
  useCreateLinkMutation,
  useUpdateLinkMutation,
  useDeleteLinkMutation,
  useClickLinkMutation,
  util: { updateQueryData: updateLinksQueryData },
} = extendedApiSlice;
