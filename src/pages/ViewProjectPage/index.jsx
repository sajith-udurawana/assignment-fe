import "leaflet/dist/leaflet.css";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";
import { MapController, Navbar } from "../../components/index.jsx";
import {
  useGetProjectByIdQuery,
  useLazyGetKMLDataQuery,
} from "../../store/api/projectsApi.js";
import ReactLeafletKml from "react-leaflet-kml";

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
          const parser = new DOMParser();
          setKMLData(parser.parseFromString(res, "text/xml"));
        });
    }
  }, [data]);
  return (
    <React.Fragment>
      <Navbar title="View Project" />
      <div className="container py-3">
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
