import { apiSlice } from "./apiSlice";

const shopSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (data) => ({
        url: "/api/shops/create",
        method: "POST",
        body: data,
      }),
    }),
    edit: builder.mutation({
      query: (data) => ({
        url: `/api/shops/edit/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getShops: builder.query({
      query: () => ({
        url: "/api/shops/show",
        method: "GET",
      }),
      keepUnusedDataFor: 1,
    }),
    getShopById: builder.query({
      query: (id) => ({
        url: `/api/shops/show/${id}`,
        method: "GET",
      }),
    }),
    deleteShop: builder.mutation({
      query: (id) => ({
        url: `/api/shops/delete/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Shop"],
    }),
  }),
});

export const {
  useGetShopsQuery,
  useGetShopByIdQuery,
  useCreateMutation,
  useDeleteShopMutation,
  useEditMutation,
} = shopSlice;
