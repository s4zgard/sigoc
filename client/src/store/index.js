import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import {
  useGetAllUsersQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useDeleteUserMutation,
} from "./slices/userSlice";
import authReducer, { setCredentials } from "./slices/authSlice";
import {
  useGetShopByIdQuery,
  useGetShopsQuery,
  useCreateMutation,
  useDeleteShopMutation,
  useEditMutation,
} from "./slices/shopSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export {
  useLoginMutation,
  setCredentials,
  useLogoutMutation,
  useGetShopsQuery,
  useGetShopByIdQuery,
  useGetAllUsersQuery,
  useCreateMutation,
  useRegisterMutation,
  useDeleteUserMutation,
  useDeleteShopMutation,
  useEditMutation,
};
export default store;
