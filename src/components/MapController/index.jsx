import { useEffect } from "react";
import { useMap } from "react-leaflet";
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
export default MapController;
