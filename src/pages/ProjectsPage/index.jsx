import React, {useEffect} from "react";
import {Navbar, ProjectCard} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {useGetAllProjectsQuery} from "../../store/api/projectsApi.js";
import {setProjects, setSearchQuery} from "../../store/slices/projectsSlice.js";
import {Button, Input, Stack} from "rsuite";
import _ from "lodash";
import {Link} from "react-router-dom";

function ProjectsPage() {
    const dispatch = useDispatch()
    // List of projects
    const projects = useSelector(state => state.projects.visibleProjects)
    // Query status for fetching projects
    const {
        data, isFetching, error
    } = useGetAllProjectsQuery({skip: true})
    // Search query
    const searchQuery = useSelector(state => state.projects.searchQuery)
    // Handle project update
    useEffect(() => {
        dispatch(setProjects(_.defaultTo(data, [])))
    }, [data, dispatch]);
    // Handle search query change
    const handleSearchQueryChange = (value) => {
        dispatch(setSearchQuery(value))
    };
    return (<React.Fragment>
        <Navbar title="Projects"/>
        <div className="container py-3">
            {/*Search box*/}
            <div className='row mb-3'>
                <div className="col">
                    <Stack spacing={16}>
                        <Stack.Item grow={1}>
                            <Input value={searchQuery} type='text' placeholder='Search by project name'
                                   onChange={handleSearchQueryChange}/>
                        </Stack.Item>
                        <Stack.Item>
                            <Button as={Link} to={"/project"} appearance='primary'>Add Project</Button>
                        </Stack.Item>
                    </Stack>
                </div>
            </div>
            {/*Status indicators*/}
            <div className='row'>
                <div className='col-12'>
                    {isFetching && <div className='alert alert-warning'>Loading projects...</div>}
                    {error && <div className='alert alert-danger'>Error: {error}</div>}
                    {!projects.length && !isFetching && <div className='alert alert-warning'>No projects!</div>}
                </div>
            </div>
            {/*Project list*/}
            <div className="row g-3 row-cols-1 row-cols-md-2 row-cols-lg-3">
                {projects.map(project => {
                    return <div className="col" key={project.id}>
                        <ProjectCard
                            title={project.name}
                            description={project.description}
                            id={project.id}
                        />
                    </div>
                })}
            </div>
        </div>
    </React.Fragment>);
}

export default ProjectsPage;
