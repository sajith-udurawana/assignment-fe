import {createSlice} from "@reduxjs/toolkit";
import _ from "lodash";


const initialState = {
    projects: [], visibleProjects: [], searchQuery: '',
}
export const projectsSlice = createSlice({
    name: 'projects', initialState, reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload
            state.visibleProjects = action.payload
        },
        setSearchQuery: (state, action) => {
            const searchQuery = _.get(action, 'payload', '')
            if (searchQuery.length) {
                let query = searchQuery.toLowerCase();
                state.visibleProjects = state.projects.filter(item => _.get(item, 'name', '').toLowerCase().indexOf(query) > -1)
            } else {
                state.visibleProjects = state.projects
            }
            state.searchQuery = searchQuery
        },
    }
})

export const {
    setSearchQuery, setProjects
} = projectsSlice.actions
export default projectsSlice.reducer