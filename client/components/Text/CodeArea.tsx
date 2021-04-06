import { Box } from "@chakra-ui/react";
import React from "react";

const CodeArea = (props) => {
  return (
    <>
      <Box
        fontFamily="Menlo"
        fontSize="13.5px"
        borderRadius={1}
        textColor={props.textColor}
        h={120}
        mb={3}
        bgColor="#F7F9FA"
      >
        {props.children}
      </Box>
    </>
  );
};

export default CodeArea;
