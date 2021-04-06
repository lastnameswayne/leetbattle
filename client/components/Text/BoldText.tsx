import { Box } from "@chakra-ui/react";
import React from "react";
import { TextType } from "../../types";

const BoldText = ({ text }: TextType) => {
  return (
    <>
      <Box mb={3} as="span" fontWeight="bold">
        {text}
      </Box>
    </>
  );
};

export default BoldText;
