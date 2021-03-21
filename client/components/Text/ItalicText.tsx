import { Box } from "@chakra-ui/react";
import React from "react";

const ItalicText = (props) => {
  return (
    <>
     <Box as="span" fontStyle="italic">
         {props.text} 
        </Box>
    </>
  );
 }

export default ItalicText;
