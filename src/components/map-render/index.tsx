import { AspectRatio, Box } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

export const MapRender = ({ position }: { position: [number, number] }) => {
  const mapRef = useRef<L.Map | null>(null);
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(position, 13, { animate: true });
    }
  }, [position]);
  return (
    <AspectRatio w="xs" h={"xs"} ratio={4 / 3}>
      <Box width="100%" height="400px">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}></Marker>
        </MapContainer>
      </Box>
    </AspectRatio>
  );
};
