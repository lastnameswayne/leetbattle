import { Button } from "@chakra-ui/react";
import React from "react";
import { buttonType } from "../../types";

export interface PrimaryButtonType extends buttonType {
  loadingText?: string;
}

const PrimaryButton = ({
  isLoading,
  loadingText,
  h,
  w,
  fontSize,
  onClick,
  text,
}: PrimaryButtonType) => {
  return (
    <Button
      isLoading={isLoading}
      mb={3}
      loadingText={loadingText}
      textColor="white"
      borderRadius="4px"
      fontWeight="semibold"
      bg="#d660a3"
      h={h}
      w={w}
      fontSize={fontSize}
      transition="transform 250ms, opacity 400ms"
      _hover={{
        transform: "scale(1.06)",
        bg: "#E2799C",
      }}
      _active={{
        bg: "#E2799C",
      }}
      _focus={{
        outline: "0",
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
