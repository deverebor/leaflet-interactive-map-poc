// CustomMap.tsx
import React, { useState, useRef, useEffect } from "react";
import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Player } from "@lottiefiles/react-lottie-player";
import "./CustomMap.css";
import markerAnimation from "./marker-animation.json";

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

// Posições dos pins
const markers: {
  position: L.LatLngExpression;
  text: string;
  animationData: any;
}[] = [
  {
    position: [500, 500],
    text: "Texto para o Pin 1",
    animationData: markerAnimation,
  },
  {
    position: [600, 600],
    text: "Texto para o Pin 2",
    animationData: markerAnimation,
  },
  {
    position: [700, 700],
    text: "oi tudo bom",
    animationData: markerAnimation,
  },
];

// Componente LottieMarker
const LottieMarker: React.FC<{
  position: L.LatLngExpression;
  text: string;
  animationData: any;
}> = ({ position, text, animationData }) => {
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (markerRef.current) {
      const container = markerRef.current.getElement()?.querySelector('.lottie-container');
      if (container) {
        const lottiePlayer = document.createElement('div');
        lottiePlayer.style.width = '32px';
        lottiePlayer.style.height = '32px';
        container.appendChild(lottiePlayer);
        new Player({
          container: lottiePlayer,
          autoplay: true,
          loop: true,
          animationData: animationData,
        });
      }
    }
  }, [animationData]);

  const lottieIcon = L.divIcon({
    className: "lottie-icon",
    html: `<div class="lottie-container"></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <Marker position={position} icon={lottieIcon} ref={markerRef}>
      <Popup className="custom-popup">
        <div>
          <h3>{text}</h3>
        </div>
      </Popup>
    </Marker>
  );
};

const CustomMap: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mapRef = useRef<L.Map | null>(null);

  const bounds: L.LatLngBoundsExpression = [
    [0, 0],
    [1000, 1000],
  ]; // Define as coordenadas dos cantos da imagem

  const imageUrl =
    "https://lh3.googleusercontent.com/-qx_UnyJwGHc/YBIqHMKwwbI/AAAAAAAAasA/uVamQSZvyvw4wMfFB44x1LxP-KOcI7VlgCLcBGAsYHQ/s16000/gta-sa-san-andreas-detailed-radar-map-satellite-view.jpg"; // Substitua pela URL da sua imagem

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitBounds(bounds); // Ajusta o mapa aos limites da imagem
    }
  }, [bounds]);

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
      <button onClick={handleButtonClick}>Próxima Coordenada</button>
      <MapContainer
        center={markers[currentIndex].position}
        zoom={2}
        minZoom={0}
        maxZoom={4}
        style={{ height: "100vh", width: "200%" }}
        crs={L.CRS.Simple}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        whenReady={(mapInstance) => {
          mapRef.current = mapInstance.target;
        }}
      >
        <ImageOverlay url={imageUrl} bounds={bounds} />
        {markers.map((marker, index) => (
          <LottieMarker
            key={index}
            position={marker.position}
            text={marker.text}
            animationData={marker.animationData}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default CustomMap;
