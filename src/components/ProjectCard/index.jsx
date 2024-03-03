import React from "react";
import { Panel, Stack, Button } from "rsuite";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * ProjectCard Function
 * Description: This function defines a component for displaying project details in a card format.
 * It renders a card with project title, description, and buttons for viewing and editing the project.
 *
 * Props:
 * - id: The ID of the project.
 * - title: The title of the project.
 * - description: The description of the project.
 */
function ProjectCard({ id, title, description }) {
  return (
    <React.Fragment>
      <Panel
        bordered
        shaded
        header={<div className="fs-4 fw-bold">{title}</div>}
      >
        <p>{description}</p>
        <Stack spacing={16}>
          <Button as={Link} to={"/view/" + id} appearance="ghost" size="sm">
            View
          </Button>
          <Button as={Link} to={"/project/" + id} appearance="subtle" size="sm">
            Edit
          </Button>
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
