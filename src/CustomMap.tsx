// CustomMap.tsx
import React, { useState, useRef, useEffect } from "react";
import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
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

// Cria ícones personalizados
const icon1 = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const icon2 = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const icon3 = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const CustomMap: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mapRef = useRef<L.Map | null>(null);

  const bounds: L.LatLngBoundsExpression = [
    [0, 0],
    [1000, 1000],
  ]; // Define as coordenadas dos cantos da imagem
  const imageUrl =
    "https://lh3.googleusercontent.com/-qx_UnyJwGHc/YBIqHMKwwbI/AAAAAAAAasA/uVamQSZvyvw4wMfFB44x1LxP-KOcI7VlgCLcBGAsYHQ/s16000/gta-sa-san-andreas-detailed-radar-map-satellite-view.jpg"; // Substitua pela URL da sua imagem

  // Posições dos pins
  const markers: { position: L.LatLngExpression; text: string }[] = [
    { position: [500, 500], text: "Texto para o Pin 1" },
    { position: [600, 600], text: "Texto para o Pin 2" },
    { position: [700, 700], text: "Texto para o Pin 3" },
  ];

  useEffect(() => {
    if (mapRef.current) {
      // Executa qualquer código adicional que dependa da instância do mapa aqui
    }
  }, []);

  const handleButtonClick = () => {
    const newIndex = (currentIndex + 1) % markers.length;
    setCurrentIndex(newIndex);
    const map = mapRef.current;
    if (map) {
      map.setView(markers[newIndex].position, map.getZoom(), {
        animate: true,
      });
    }
  };

  return (
    <div>
      <MapContainer
        center={markers[currentIndex].position}
        zoom={1}
        minZoom={0}
        maxZoom={4}
        style={{ height: "100vh", width: "100%" }}
        crs={L.CRS.Simple}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        whenReady={(mapInstance) => {
          mapRef.current = mapInstance.target;
        }}
      >
        <ImageOverlay url={imageUrl} bounds={bounds} />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={index === 0 ? icon1 : index === 1 ? icon2 : icon3}
          >
            <Popup>
              <div>
                <h3>{marker.text}</h3>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <button onClick={handleButtonClick}>Próxima Coordenada</button>
    </div>
  );
};

export default CustomMap;
