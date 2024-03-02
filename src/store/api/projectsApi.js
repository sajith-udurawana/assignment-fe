import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const projectsApi = createApi({
    reducerPath: "projectsApi",
    keepUnusedDataFor: 0,
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8080/api/"}),
    endpoints: (builder) => ({
        getAllProjects: builder.query({
            query: () => `projects`, transformErrorResponse(error) {
                return `Something went wrong! (Message: ${error.error}, Code: ${error.status})`
            }
        },), saveProject: builder.mutation({
            query: (project) => {
                if (project.id) {
                    return {
                        url: `projects/${project.id}`, method: 'PUT', body: project,
                    }
                }
                return {
                    url: `projects`, method: 'POST', body: project,
                }
            }, transformErrorResponse(error) {
                return `Something went wrong! (Message: ${error.error}, Code: ${error.status})`
            }
        }), getProjectById: builder.query({
            query(id) {
                return {url: `projects/${id}`}
            }, transformErrorResponse(error) {
                return `Something went wrong! (Message: ${error.error}, Code: ${error.status})`
            }
        }), deleteProjectById: builder.mutation({
            query(id) {
                return {url: `projects/${id}`, method: 'DELETE'}
            }, transformErrorResponse(error) {
                return `Something went wrong! (Message: ${error.error}, Code: ${error.status})`
            }
        }), getKMLData: builder.query({
            query(url) {
                return {url: url, method: 'GET'}
            }
        })
    })
});

export const {
    useGetAllProjectsQuery, useSaveProjectMutation, useGetProjectByIdQuery,
    useDeleteProjectByIdMutation,
    useGetKMLDataLazyQuery,
}
    = projectsApi
