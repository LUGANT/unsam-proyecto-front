import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MapRender } from "../../components/map-render";
import { EventoCreate } from "../../types/Event";

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
  id,
}: {
  onValuechange: (a: any) => void;
  id?: string;
}) => {
  const toast = useToast();
  const [position, setPosition] = useState<[number, number]>([
    -34.6037389, -58.3841507,
  ]); // Coordenadas iniciales
  // const [searchTerm, setSearchTerm] = useState<string>("");
  const {
    register,
    setError,
    clearErrors,
    trigger,
    getValues,
    formState: { errors, isValidating },
  } = useFormContext<EventoCreate>();

  const handleSearch = async () => {
    const searchTerm = getValues("ubicacion");
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
        const neighborhoodOrPlace =
          context.find((p: any) => p.id.includes("neighborhood")) ||
          context.find((p: any) => p.id.includes("place"));
        if (!neighborhoodOrPlace) {
          setError("ubicacion", {
            type: "manual",
            message:
              "Búsqueda poco precisa: Por favor indica un lugar más específico, añadiendo una calle, lugar y/o barrio",
          });
          onValuechange({});
        } else {
          clearErrors("ubicacion");
          const obj = {
            nombreCompletoLugar: place_name,
            barrio: neighborhoodOrPlace.text,
            lat,
            lon,
          };
          console.log(obj);

          onValuechange(obj);
        }
      } else {
        setError("ubicacion", {
          type: "manual",
          message: "No has ingresado una búsqueda válida",
        });
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
      setError("ubicacion", {
        type: "manual",
        message: "Error en la búsqueda",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };
  useEffect(() => {
    onValuechange("");
    console.log(isValidating && !getValues("ubicacion"));

    // Verificar si se ha intentado enviar el formulario y el campo de ubicación está vacío
    if (isValidating && !getValues("ubicacion")) {
      // Forzar la validación del campo de ubicación
      trigger("ubicacion");
    }
  }, [isValidating]);
  return (
    <VStack maxW={"min-content"} gap={8}>
      <Box w={"full"}>
        <FormLabel>Ubicación</FormLabel>
        <FormControl isInvalid={!!errors.ubicacion}>
          <HStack>
            <Input
              id={id}
              type="text"
              placeholder="Ej: Calle 0000, Barrio"
              {...register("ubicacion", {
                required: "Ubicación es obligatoria",
              })}
              onKeyDown={handleKeyPress}
              onBlur={() => trigger("ubicacion")}
            />
            <Button bg="brand.300" color={"white"} onClick={handleSearch}>
              Buscar
            </Button>
          </HStack>
          <FormErrorMessage maxW={"full"}>
            {errors.ubicacion?.message}
          </FormErrorMessage>
        </FormControl>
      </Box>
      <MapRender position={position} />
    </VStack>
  );
};

export default MapComponent;
