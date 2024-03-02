import {configureStore} from "@reduxjs/toolkit";
import projectsReducer from './slices/projectsSlice.js'
import {projectsApi} from "./api/projectsApi.js";

export const store = configureStore({
    reducer: {
        'projects': projectsReducer, [projectsApi.reducerPath]: projectsApi.reducer,
    }, middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(projectsApi.middleware)
    }
})