import { Avatar, Box, Input, Text, useToast, VStack } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useState } from "react";

const MAX_FILE_SIZE_MB = 2;
const ImageUpload = ({
  imgUrl,
  onImgChange,
}: {
  imgUrl: string | undefined;
  imgStatus: {
    selectedFile: File | null;
    imgChanged: boolean;
  };

  onImgChange: Dispatch<
    SetStateAction<{ selectedFile: File | null; imgChanged: boolean }>
  >;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const toast = useToast();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convertir bytes a MB
      if (fileSizeInMB > MAX_FILE_SIZE_MB) {
        toast({
          title: "Error",
          description: `La imagen seleccionada supera el tamaño máximo permitido de ${MAX_FILE_SIZE_MB} MB.`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        e.target.value = ""; // Limpiar el valor del input para deseleccionar la imagen
        return;
      }
      displayImage(file);
      onImgChange({ selectedFile: file, imgChanged: true });
    }
  };

  const displayImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const openFileExplorer = () => {
    document.getElementById("imageInput")?.click();
  };

  return (
    <VStack spacing={4}>
      <Input
        type="file"
        id="imageInput"
        accept="image/jpeg, image/png, image/gif"
        style={{ display: "none" }}
        onChange={(e) => {
          handleImageChange(e);
        }}
      />

      <Box mt={4} position="relative" width="fit-content">
        {previewUrl || imgUrl ? (
          <Box
            bg="brand.300"
            borderRadius="full"
            width="xs"
            height="xs"
            position="relative"
            overflow="hidden"
            onClick={openFileExplorer}
            cursor="pointer"
          >
            <img
              src={previewUrl || imgUrl}
              alt="Profile"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        ) : (
          <Avatar
            src={""}
            size="3xl" // Tamaño deseado del Avatar
            bg="brand.300"
          />
        )}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="rgba(0, 0, 0, 0.6)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          opacity="0"
          transition="opacity 0.3s"
          borderRadius="full"
          _hover={{ opacity: 1 }}
          cursor="pointer"
          onClick={openFileExplorer}
        >
          <Text>Cambiar foto de perfil</Text>
        </Box>
      </Box>
    </VStack>
  );
};

export default ImageUpload;
