import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * API: authApi
 * Description: This API module provides functionality for user authentication.
 * 
 * Functions:
 * - login: Mutation endpoint for user login.
 *   - query: Constructs the request to the login endpoint.
 *   - transformErrorResponse: Handles error responses from the login endpoint.
 * 
 */

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
