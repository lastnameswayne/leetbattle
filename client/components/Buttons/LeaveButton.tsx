import { Button } from "@chakra-ui/react";
import React from "react";
import { buttonType } from "../../types";

const LeaveButton = ({
  isLoading,
  h,
  w,
  fontSize,
  onClick,
  text,
}: buttonType) => {
  return (
    <Button
      isLoading={isLoading}
      textColor="white"
      borderRadius="4px"
      fontWeight="semibold"
      bg="#FF2353"
      h={h}
      w={w}
      fontSize={fontSize}
      transition="transform 250ms, opacity 400ms"
      _hover={{
        transform: "scale(1.06)",
        bg: "#FD5067",
      }}
      _active={{
        bg: "#FD5067",
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

export default LeaveButton;
