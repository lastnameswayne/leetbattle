import { Button } from "@chakra-ui/react"
import React from "react"

const SecondaryButton = (props) => {
    return(
    <Button
    isLoading = {props.isLoading} 
    mb={3}
    mr={4}
    loadingText={props.loadingText}
    textColor="white"
    borderRadius="4px"
    fontWeight="semibold"
    bg="#0586E8"
    h={props.h}
    w={props.w}
    fontSize={props.fontSize}
    transition = "transform 250ms, opacity 400ms"
    _hover={{
        transform: "scale(1.06)",
        bg: "#54A5F2" ,
    }}
    _focus={{
        outline: "0"
    }}
    _active={{
        bg: "#54A5F2" ,
    }}
    onClick={props.onClick}
  >{props.text}</Button>
   )
}

export default SecondaryButton