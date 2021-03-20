import { Box } from "@chakra-ui/react";
import React from "react";

const CodeText = (props) => {
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
        {props.text}
      </Box>
    </>
  );
 }

export default CodeText;
