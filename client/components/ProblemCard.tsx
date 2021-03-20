import { Box, useRadio } from "@chakra-ui/react";
import React, { useState } from "react";

const ProblemCard = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getCheckboxProps()

  // let gradient = `linear-gradient(
  //   to right, 
  //   #D660A3, #F9AB8F
  // );`

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        transition = "transform 250ms, bg 5000ms"
        _hover={{
          cursor: "pointer",
          transform: "scale(1.06)",
        }}
        p={2}
        scale="1.05"
        borderWidth="1px"
        borderRadius="lg"
        w={500}
        overflow="hidden"
        cursor="pointer"
        _checked={{
          transform: "scale(1.06)",
          borderColor: "#D660A3",
          borderWidth: "3px"
        }}
        _focus={{
          outline: "0"        
        }}
        py={6}
        mb={1}
      >
        {props.children}
      </Box>
    </Box>
  )
};

export default ProblemCard;
