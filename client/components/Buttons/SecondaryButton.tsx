import { Button } from "@chakra-ui/react";
import React from "react";
import { PrimaryButtonType } from "./PrimaryButton";
const SecondaryButton = ({
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
      mr={4}
      loadingText={loadingText}
      textColor="white"
      borderRadius="4px"
      fontWeight="semibold"
      bg="#0586E8"
      h={h}
      w={w}
      fontSize={fontSize}
      transition="transform 250ms, opacity 400ms"
      _hover={{
        transform: "scale(1.06)",
        bg: "#54A5F2",
      }}
      _focus={{
        outline: "0",
      }}
      _active={{
        bg: "#54A5F2",
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default SecondaryButton;
