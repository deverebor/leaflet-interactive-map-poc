// CustomMap.tsx
import React, { useState, useRef, useEffect } from "react";
import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./CustomMap.css";

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

// Cria ícones personalizados (exemplo)
const icon1 = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="98" height="108" viewBox="0 0 98 108" fill="none">
        <g filter="url(#filter0_d_26489_40997)">
          <path d="M49 29.5C43.8964 29.5058 39.0034 31.5358 35.3946 35.1446C31.7858 38.7534 29.7558 43.6464 29.75 48.75C29.75 65.2219 47.25 77.6622 47.9959 78.1828C48.2902 78.3889 48.6407 78.4995 49 78.4995C49.3593 78.4995 49.7098 78.3889 50.0041 78.1828C50.75 77.6622 68.25 65.2219 68.25 48.75C68.2442 43.6464 66.2142 38.7534 62.6054 35.1446C58.9966 31.5358 54.1036 29.5058 49 29.5ZM49 41.75C50.3845 41.75 51.7378 42.1605 52.889 42.9297C54.0401 43.6989 54.9373 44.7921 55.4672 46.0712C55.997 47.3503 56.1356 48.7578 55.8655 50.1156C55.5954 51.4735 54.9287 52.7208 53.9497 53.6997C52.9708 54.6787 51.7235 55.3454 50.3656 55.6155C49.0078 55.8856 47.6003 55.747 46.3212 55.2172C45.0421 54.6873 43.9489 53.7901 43.1797 52.639C42.4105 51.4878 42 50.1345 42 48.75C42 46.8935 42.7375 45.113 44.0503 43.8003C45.363 42.4875 47.1435 41.75 49 41.75Z" fill="url(#paint0_linear_26489_40997)"/>
        </g>
        <defs>
          <filter id="filter0_d_26489_40997" x="-8" y="-3" width="114" height="114" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="14.5"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_26489_40997"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_26489_40997" result="shape"/>
          </filter>
          <linearGradient id="paint0_linear_26489_40997" x1="49" y1="29.5" x2="49" y2="78.4995" gradientUnits="userSpaceOnUse">
            <stop stop-color="#46FF90"/>
            <stop offset="1" stop-color="#2DA75E"/>
          </linearGradient>
        </defs>
      </svg>
    `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Define a imagem de overlay base
const baseImageUrl =
  "https://lh3.googleusercontent.com/-qx_UnyJwGHc/YBIqHMKwwbI/AAAAAAAAasA/uVamQSZvyvw4wMfFB44x1LxP-KOcI7VlgCLcBGAsYHQ/s16000/gta-sa-san-andreas-detailed-radar-map-satellite-view.jpg";
const baseImageBounds: L.LatLngBoundsLiteral = [
  [0, 0],
  [1000, 1000],
];

// Define a imagem de overlay superior
const overlayImageUrl =
  "https://canine.org/wp-content/uploads/2024/06/Q224-blackpup-bluecircle-copy.png"; // Substitua com a URL da sua imagem de overlay
const overlayImageBounds: L.LatLngBoundsLiteral = [
  [500, 500],
  [800, 800],
];

const CustomMap: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mapRef = useRef<L.Map | null>(null);

  // Posições dos pins
  const markers: { position: L.LatLngExpression; text: string }[] = [
    { position: [500, 500], text: "Texto para o Pin 1" },
    { position: [600, 600], text: "oiiii" },
    { position: [700, 700], text: "rouf rouf rouf" },
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
      <button onClick={handleButtonClick}>Próxima Coordenada</button>
      <MapContainer
        center={markers[currentIndex].position}
        zoom={1}
        minZoom={0}
        maxZoom={4}
        style={{ height: "100vh", width: "100%" }}
        crs={L.CRS.Simple}
        maxBounds={baseImageBounds}
        maxBoundsViscosity={1.0}
        whenReady={(mapInstance) => {
          mapRef.current = mapInstance.target;
        }}
      >
        <ImageOverlay url={baseImageUrl} bounds={baseImageBounds} />
        <ImageOverlay url={overlayImageUrl} bounds={overlayImageBounds} />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={index === 0 ? icon1 : index === 1 ? icon1 : icon1}
          >
            <Popup className="custom-popup">
              <div>
                <h3>{marker.text}</h3>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CustomMap;
