import { apiSlice } from "./apiSlice";

const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/users/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/api/users/register",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/users/logout",
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/delete/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/api/users/all",
        method: "GET",
      }),
      keepUnusedDataFor: 1,
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetAllUsersQuery,
  useRegisterMutation,
  useDeleteUserMutation,
} = userSlice;
