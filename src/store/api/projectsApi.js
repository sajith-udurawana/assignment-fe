import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import _ from 'lodash';

/**
 * API: projectsApi
 * Description: This API module provides functions for interacting with project-related endpoints.
 * 
 * Functions:
 * - getAllProjects: Fetches all projects.
 * - saveProject: Saves a project. If project ID exists, updates the project, otherwise creates a new project.
 * - getProjectById: Fetches a project by ID.
 * - deleteProjectById: Deletes a project by ID.
 * - getKMLData: Fetches KML data.
 */

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  keepUnusedDataFor: 0,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => `projects`,
      transformErrorResponse(error) {
        return `Something went wrong! (Message: ${error.error}, Code: ${error.status})`;
      },
      transformResponse(response) {
        return _.get(response, 'payload', [])
      }
    }),
    saveProject: builder.mutation({
      query: (project) => {
        if (project.id) {
          return {
            url: `projects/${project.id}`,
            method: "PUT",
            body: project,
          };
        }
        return {
          url: `projects`,
          method: "POST",
          body: project,
        };
      },
      transformErrorResponse(error) {
        return `Something went wrong! (Message: ${error.error}, Code: ${error.status})`;
      },
      transformResponse(response) {
        return _.get(response, 'payload')
      }
    }),
    getProjectById: builder.query({
      query(id) {
        return { url: `projects/${id}` };
      },
      transformErrorResponse(error) {
        return `Something went wrong! (Message: ${error.error}, Code: ${error.status})`;
      }, transformResponse(response) {
        return _.get(response, 'payload')
      }
    }),
    deleteProjectById: builder.mutation({
      query(id) {
        return { url: `projects/${id}`, method: "DELETE" };
      },
      transformErrorResponse(error) {
        return `Something went wrong! (Message: ${error.error}, Code: ${error.status})`;
      }, transformResponse(response) {
        return _.get(response, 'payload')
      }
    }),
    getKMLData: builder.query({
      query(data) {
        return {
          url: "resources/kml",
          method: "POST",
          body: {
            "url": data
          },
        };
      }, transformResponse(response) {
        return _.get(response, 'payload', '')
      }, transformErrorResponse(error) {
        return `Something went wrong! (Message: ${error.error}, Code: ${error.status})`;
      }
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useSaveProjectMutation,
  useGetProjectByIdQuery,
  useDeleteProjectByIdMutation,
  useLazyGetKMLDataQuery,
} = projectsApi;
