import { Box } from "@chakra-ui/react";
import React from "react";
import { TextType } from "../../types";

const ItalicText = ({ text }: TextType) => {
  return (
    <>
      <Box as="span" fontStyle="italic">
        {text}
      </Box>
    </>
  );
};

export default ItalicText;
