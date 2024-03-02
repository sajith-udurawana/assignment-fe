import React from "react";
import {Panel, Stack, Button} from "rsuite";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

function ProjectCard({id, title, description}) {
    return (
        <React.Fragment>
            <Panel bordered shaded header={<div className='fs-4 fw-bold'>{title}</div>}>
                <p>{description}</p>
                <Stack spacing={16}>
                    <Button as={Link} to={"/view/" + id} appearance="ghost" size="sm">View</Button>
                    <Button as={Link} to={"/project/" + id} appearance="subtle" size="sm">Edit</Button>
                </Stack>
            </Panel>
        </React.Fragment>
    );
}

ProjectCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
};

export default ProjectCard;
