// CustomMap.tsx
import React from "react";
import { MapContainer, ImageOverlay, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Corrige ícones de marker para não sumirem
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const CustomMap: React.FC = () => {
  const bounds: L.LatLngBoundsExpression = [
    [0, 0],
    [1000, 1000],
  ]; // Define as coordenadas dos cantos da imagem
  const imageUrl = "URL_DA_SUA_IMAGEM"; // Substitua pela URL da sua imagem
  const markerPosition: L.LatLngExpression = [500, 500]; // Posição do pino

  return (
    <div>
      <MapContainer
        center={[500, 500]}
        zoom={1}
        minZoom={-4}
        maxZoom={4}
        style={{ height: "100vh", width: "100%" }}
        crs={L.CRS.Simple}
      >
        <ImageOverlay url={imageUrl} bounds={bounds} />
        <Marker position={markerPosition} />
      </MapContainer>
    </div>
  );
};

export default CustomMap;
