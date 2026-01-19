import { apiSlice } from "../store/slices/api-slice";
import type { LoginResponse, UserResponse } from "../types/auth";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, {username: string; password: string}>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    getUser: builder.query<UserResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery } = authApi;