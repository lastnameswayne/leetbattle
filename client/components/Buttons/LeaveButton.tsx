import { Button } from "@chakra-ui/react"
import React from "react"

const LeaveButton = (props) => {
    return(
    <Button
    isLoading = {props.isLoading}
    textColor="white"
    borderRadius="4px"
    fontWeight="semibold"
    bg="#FF2353"
    h={props.h}
    w={props.w}
    fontSize={props.fontSize}
    transition = "transform 250ms, opacity 400ms"
    _hover={{
        transform: "scale(1.06)",
        bg: "#FD5067" ,
    }}
    _active={{
        bg: "#FD5067" ,

    }}
    _focus={{
        outline: "0"
    }}
    onClick={props.onClick}
  >{props.text}</Button>
   )
}

export default LeaveButton