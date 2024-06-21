import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { textFieldType } from "../../types";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export function TextField({
  isRequired,
  size,
  placeholder,
  inputType,
  label,
  isError,
  touched,
  errorMessage,
  onChange,
  handleKeyDown,
}: textFieldType) {
  return (
    <>
      <FormControl isInvalid={isError && touched} isRequired={isRequired}>
        <FormLabel size={size}>{label}</FormLabel>
        <Input
          onKeyDown={handleKeyDown}
          onChange={onChange}
          size={size}
          placeholder={placeholder}
          type={inputType}
        />
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    </>
  );
}

export function TextFieldSecret({
  isRequired,
  size,
  placeholder,
  label,
  isError,
  touched,
  errorMessage,
  onChange,
  handleKeyDown,
}: textFieldType) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <FormControl isInvalid={isError && touched} isRequired={isRequired}>
        <FormLabel size={size}>{label}</FormLabel>
        <InputGroup size="md">
          <Input
            onKeyDown={handleKeyDown}
            onChange={onChange}
            size={size}
            placeholder={placeholder}
            type={showPassword ? "text" : "password"}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handlerShowPassword}>
              {showPassword ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>

        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    </>
  );
}
