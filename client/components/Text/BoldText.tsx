import { Box } from "@chakra-ui/react";
import React from "react";

const BoldText = (props) => {
  return (
    <>
     <Box mb = {3} as="span" fontWeight="bold">
         {props.text} 
        </Box>
    </>
  );
 }

export default BoldText;
