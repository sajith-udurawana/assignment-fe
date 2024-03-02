import React, {useEffect} from 'react'
import {Navbar} from "../../components/index.jsx";
import {useGetProjectByIdQuery, useGetKMLDataLazyQuery} from "../../store/api/projectsApi.js";
import {useParams} from "react-router-dom";

function ViewProjectPage() {
    const {id} = useParams()
    const {data} = useGetProjectByIdQuery(id, {skip: !id})
    const getKMLData = useGetKMLDataLazyQuery()
    useEffect(() => {
        if (data) {
            const {mapURL} = data
            getKMLData(mapURL);
        }
    }, [data]);
    return <React.Fragment>
        <Navbar title="View Project"/>
        <div className='container py-3'>
            <div className='row'>
                <div className='col'></div>
            </div>
        </div>
    </React.Fragment>
}

export default ViewProjectPage