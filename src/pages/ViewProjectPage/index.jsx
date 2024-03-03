import "leaflet/dist/leaflet.css";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import ReactLeafletKml from "react-leaflet-kml";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { MapController, Navbar } from "../../components/index.jsx";
import {
  useGetProjectByIdQuery,
  useLazyGetKMLDataQuery,
} from "../../store/api/projectsApi.js";
import { Breadcrumb } from "rsuite";
import { Link } from "react-router-dom";

function ViewProjectPage() {
  // Get project ID from URL parameters
  const { id } = useParams();
  // Query for project data by ID
  const { data } = useGetProjectByIdQuery(id, { skip: !id });
  // Lazy query for fetching KML data from project
  const [getKMLData, { isFetching: kmlDataLoading, error: kmlError }] =
    useLazyGetKMLDataQuery();
  // Project data
  const [project, setProject] = useState({});
  // KML data
  const [kmlData, setKMLData] = useState();
  // Initialize data
  useEffect(() => {
    if (data) {
      const { mapURL, name, description } = data;
      setProject({ name, description });
      getKMLData(mapURL)
        .unwrap()
        .then((res) => {
          if (res.length) {
            const parser = new DOMParser();
            setKMLData(parser.parseFromString(res, "text/xml"));
          } else {
            throw new Error("No data recieved!");
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text:
              "Something went wrong while loading the KML data. (" +
              error.message +
              ")",
            icon: "error",
          });
        });
    }
  }, [data]);
  return (
    <React.Fragment>
      <Navbar title="View Project" />
      <div className="container py-3">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <Breadcrumb.Item as={Link} to="/">
                Projects
              </Breadcrumb.Item>
              <Breadcrumb.Item active>View Project</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>{_.get(project, "name")}</h1>
            <p>{_.get(project, "description")}</p>
            {kmlDataLoading && (
              <div className="alert alert-warning">Loading KML data…</div>
            )}
            {kmlError && <div className="alert alert-error">{kmlError}</div>}
            {kmlData && (
              <MapContainer
                style={{ height: "50vh" }}
                center={[0, 0]}
                zoom={15}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ReactLeafletKml kml={kmlData} />
                <MapController data={kmlData} />
              </MapContainer>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ViewProjectPage;
