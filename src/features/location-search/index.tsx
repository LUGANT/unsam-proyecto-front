import { Box, Button, Input, useToast, VStack } from "@chakra-ui/react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import { AspectRatio, FormControl, FormLabel, HStack } from "@chakra-ui/react";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41], // Adjust the anchor to keep the icon centered
  popupAnchor: [0, -41], // Position the popup correctly relative to the icon
});

L.Marker.prototype.options.icon = DefaultIcon;
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZ29uemFsaXNraSIsImEiOiJjbDVzazZmcXgyaW13M2NsdnJjMTlzMXkzIn0.Pmdn5rD4_xoogyyZwGxAbg";
const MapComponent = ({
  onValuechange,
}: {
  onValuechange: (a: any) => void;
}) => {
  const toast = useToast();
  const [position, setPosition] = useState<[number, number]>([
    -34.6037389, -58.3841507,
  ]); // Coordenadas iniciales
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchTerm
        )}.json?access_token=${MAPBOX_TOKEN}&country=AR`
      );
      const data = await res.json();
      console.log(data);
      if (data.features.length > 0) {
        const { center, place_name, context } = data.features[0];
        const [lon, lat] = center;
        setPosition([lat, lon]);
        setSearchResult({ lat, lon });
        const neighborhoodOrPlace =
          context.find((p: any) => p.id.includes("neighborhood")) ||
          context.find((p: any) => p.id.includes("place"));

        const obj = {
          nombreCompletoLugar: place_name,
          barrio: neighborhoodOrPlace
            ? neighborhoodOrPlace.text
            : "No especificado",
          lat,
          lon,
        };
        console.log(obj);

        onValuechange(obj);
        console.log("on value change");
      } else {
        toast({
          title: "Sin resultados",
          description: "No se encontraron resultados",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(position, 13, { animate: true });
    }
  }, [position]);

  return (
    <VStack maxW={"sm"} gap={8}>
      +
      <Box as="form" onSubmit={handleSearch} w={"full"}>
        <FormLabel>Ubicación</FormLabel>
        <HStack>
          <FormControl>
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar lugar"
            />
          </FormControl>
          <Button bg="brand.300" color={"white"} type="submit">
            Buscar
          </Button>
        </HStack>
      </Box>
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
    </VStack>
  );
};

export default MapComponent;
