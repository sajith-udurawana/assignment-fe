import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../../components/index.jsx";
import { Button, Form, Schema, Stack, Breadcrumb } from "rsuite";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProjectByIdMutation,
  useGetProjectByIdQuery,
  useSaveProjectMutation,
} from "../../store/api/projectsApi.js";
import Swal from "sweetalert2";
import _ from "lodash";
import { Link } from "react-router-dom";

/**
 * EditProjectPage Function
 * Description: This function defines the component for editing or creating a project.
 * It handles form submission, project CRUD operations, and navigation.
 *
 * Functionality:
 * - Handles form submission for saving or updating a project.
 * - Handles project CRUD operations such as save, delete, and fetch.
 * - Renders a form for editing or creating a project.
 */

const formModel = Schema.Model({
  name: Schema.Types.StringType().isRequired("Name is required!"),
  description: Schema.Types.StringType().isRequired("Description is required!"),
  mapURL: Schema.Types.StringType()
    .isRequired("Map URL is required!")
    .isURL("Not a valid URL!"),
});

function EditProjectPage() {
  // Project id from URL
  const { id } = useParams();
  // Loading state
  const [isLoading, setLoading] = useState(false);
  // Error state
  const [error, setError] = useState();
  // Save project mutation
  const [saveProject, { isLoading: saveProjectLoading }] =
    useSaveProjectMutation();
  const navigate = useNavigate();
  // Reference for the form
  const formRef = useRef();
  // Form state
  const [formValue, setFormValue] = useState({});
  // Submit handler
  const handleFormSubmit = () => {
    if (formRef.current?.check()) {
      const project = { ...formValue };
      saveProject(project)
        .unwrap()
        .then((project) => {
          if (_.get(project, "id")) {
            Swal.fire({
              title: "Success",
              text: `Project ${id ? "updated" : "created"} successfully!`,
              icon: "success",
            }).then(() => {
              navigate(-1);
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text: error,
            icon: "error",
          });
        });
    }
  };
  // Cancel handler
  const handleCancel = () => {
    navigate(-1);
  };
  // If id exists, load project details
  const {
    data: projectData,
    isFetching: getProjectLoading,
    error: getProjectError,
  } = useGetProjectByIdQuery(id, { skip: !id });
  const [
    deleteProject,
    { isLoading: deleteProjectLoading, error: deleteProjectError },
  ] = useDeleteProjectByIdMutation();
  useEffect(() => {
    setFormValue(projectData);
  }, [projectData]);
  useEffect(() => {
    setLoading(saveProjectLoading || getProjectLoading || deleteProjectLoading);
  }, [saveProjectLoading, getProjectLoading, deleteProjectLoading]);
  useEffect(() => {
    setError(getProjectError || deleteProjectError);
  }, [getProjectError, deleteProjectError]);
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this project? This can not be undone.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      showConfirmButton: true,
      confirmButtonText: "Yes",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteProject(id)
          .unwrap()
          .then(() => {
            navigate(-1);
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: error,
              icon: "error",
            });
          });
      }
    });
  };
  return (
    <React.Fragment>
      <Navbar title={(id ? "Edit" : "Create") + " Project"} />
      <div className="container py-3">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <Breadcrumb.Item as={Link} to="/">
                Projects
              </Breadcrumb.Item>
              <Breadcrumb.Item active>
                {id ? "Edit" : "Create"} Project
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Form
              model={formModel}
              disabled={isLoading}
              fluid
              formValue={formValue}
              onChange={setFormValue}
              ref={formRef}
            >
              <Form.Group>
                <Form.ControlLabel>Project Name</Form.ControlLabel>
                <Form.Control
                  name="name"
                  placeholder="(Required)"
                  type="text"
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Project Description</Form.ControlLabel>
                <Form.Control
                  name="description"
                  placeholder="(Required)"
                  type="text"
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>KML URL</Form.ControlLabel>
                <Form.Control
                  name="mapURL"
                  placeholder="(Required)"
                  type="url"
                />
              </Form.Group>
              <Stack spacing={16}>
                <Button
                  loading={isLoading}
                  onClick={handleFormSubmit}
                  appearance="primary"
                >
                  Save
                </Button>
                {_.get(formValue, "id") && (
                  <Button appearance="ghost" color="red" onClick={handleDelete}>
                    Delete
                  </Button>
                )}
                <Button
                  appearance="subtle"
                  loading={isLoading}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Stack>
            </Form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EditProjectPage;
