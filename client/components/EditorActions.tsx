import {
  Box,
  Flex,
  Spacer
} from "@chakra-ui/react";
import React, { useState } from 'react';
import Select from "react-select";
import PrimaryButton from './Buttons/PrimaryButton';
import SecondaryButton from './Buttons/SecondaryButton';

const EditorActions = (props) => {  
    return(
     <Flex my={1.5}>
       <Box zIndex={6} w = "200px">
      <Select
        onChange={props.setSelectedOption}
        defaultValue={props.selectedOption ? props.selectedOption : props.options[0]}
        defaultInputValue = {props.defaultInputValue}
        options = {props.options}
        isSearchable = {false}
      />
      </Box>
      <Spacer />
      <SecondaryButton
        isLoading={props.isRunLoading}
        text="Run"
        fontSize="14px"
        w="70px"
        h="30px"
        onClick={() => props.onExecute()}
      >
        Run
      </SecondaryButton>
      <PrimaryButton
        isLoading={props.isSubmitLoading}
        text="Submit"
        w="80px"
        h="30px"
        fontSize="14px"
        onClick={() => props.onSubmit()}
      >
        Submit
      </PrimaryButton>
    </Flex>
    )
}

export default EditorActions