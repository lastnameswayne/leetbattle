import { Box } from "@chakra-ui/react";
import React from "react";
import { TextType } from "../../types";

const CodeText = ({ text }: TextType) => {
  return (
    <>
      <Box
        rounded="md"
        p={0.5}
        bg="#F7F9FA"
        fontFamily="Courier"
        letterSpacing="wide"
        textColor="#546E7A"
        as="span"
      >
        {text}
      </Box>
    </>
  );
};

export default CodeText;
