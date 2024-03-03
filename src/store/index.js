import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi.js";
import { projectsApi } from "./api/projectsApi.js";
import projectsReducer from "./slices/projectsSlice.js";

/**
 * Store: store
 * Description: Redux store configuration.
 * 
 * Reducers:
 * - projects: Reducer for managing projects state.
 * - projectsApi.reducerPath: Reducer for managing state related to projects API.
 * - authApi.reducerPath: Reducer for managing state related to authentication API.
 * 
 * Middleware:
 * - projectsApi.middleware: Middleware for handling API requests and responses related to projects.
 * - authApi.middleware: Middleware for handling API requests and responses related to authentication.
 * 
 */

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(projectsApi.middleware)
      .concat(authApi.middleware);
  },
});
