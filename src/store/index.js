import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi.js";
import { projectsApi } from "./api/projectsApi.js";
import projectsReducer from "./slices/projectsSlice.js";

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
