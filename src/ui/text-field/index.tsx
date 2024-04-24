import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { textFieldType } from "../../types";

export function TextField ({isRequired, size, placeholder, 
                            inputType, label, isError, 
                            touched, errorMessage, onChange, handleKeyDown}: textFieldType) {
  return <>
    <FormControl isInvalid={isError && touched} isRequired={isRequired}>
      <FormLabel size={size}>{label}</FormLabel>
        <Input onKeyDown={handleKeyDown} onChange={onChange} size={size} placeholder={placeholder} type={inputType} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  </>
}