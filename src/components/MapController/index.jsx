import PropTypes from "prop-types";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

/**
 * MapController Function
 * Description: This function defines a component for controlling the map view.
 * It adjusts the map view to focus on the first point when data changes.
 *
 * Functionality:
 * - Adjusts the map view to focus on the first point when data changes.
 */
function MapController({ data }) {
  const map = useMap();
  useEffect(() => {
    const layers = map?._layers;
    const firstPoint = layers[Object.keys(layers)[0]]?._latlng;
    if (firstPoint) {
      const { lat, lng } = firstPoint;
      map.setView([lat, lng], map.getZoom());
    }
  }, [data]);
  return null;
}

MapController.propTypes = {
  data: PropTypes.any,
};

export default MapController;
