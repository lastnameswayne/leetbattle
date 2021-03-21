import { Button } from "@chakra-ui/react"
import React from "react"

const PrimaryButton = (props) => {
    return(
    <Button
    isLoading = {props.isLoading}
    mb={3}
    loadingText={props.loadingText}
    textColor="white"
    borderRadius="4px"
    fontWeight="semibold"
    bg="#d660a3"
    h={props.h}
    w={props.w}
    fontSize={props.fontSize}

    transition = "transform 250ms, opacity 400ms"
    _hover={{
        transform: "scale(1.06)",
        bg: "#E2799C" ,
    }}
    _active={{
        bg: "#E2799C" ,
    }}
    _focus={{
        outline: "0"
    }}
    onClick={props.onClick}
  >{props.text}</Button>
   )
}

export default PrimaryButton