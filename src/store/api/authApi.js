import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  keepUnusedDataFor: 0,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/auth/",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        return {
          url: `login`,
          method: "POST",
          body: credentials,
        };
      },
      transformErrorResponse(error) {
        return `Something went wrong! (Message: ${error.error}, Code: ${error.status})`;
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
