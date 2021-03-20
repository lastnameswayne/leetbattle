import { Box, Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import EditorActions from "../components/EditorActions";
import { default as LostModal } from "../components/Modals/LostModal";
import SuccesModal from '../components/Modals/SuccesModal';
import NavBar from "../components/NavBars/NavBar";
import ProblemTabMenu from "../components/TabMenus/ProblemTabMenu";
import TabMenu from "../components/TabMenus/Tabs";
const Editor = dynamic(() => import("../components/Editor"));

const Main = (props): JSX.Element => {
  //options and hook for the dropdown-select
    const options = [
    { value: 'python', label: 'Python3' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'java', label: 'Java' },
  ];  
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <>
      <NavBar
        onLeave={props.onLeave}
        elapsedTime={props.elapsedTime}
      ></NavBar>
      <SuccesModal
        time={props.elapsedTime}
        isOpenWon={props.isOpenWon}
        onOpen={props.onOpen}
      ></SuccesModal>
      <LostModal
        isOpenLost={props.isOpenLost}
      ></LostModal>
      <Flex>
        <Box>
          <ProblemTabMenu
            joined={props.joined}
            index = {props.index}
            onChange = {props.onChange}
            created={props.created}
            secondsTabMenu={props.seconds}
            gameCodeTabMenu={props.gameCode}
          ></ProblemTabMenu>
        </Box>
        <Box w="90%" mx = {2}>
          <EditorActions
            defaultValue={selectedOption}
            setSelectedOption={setSelectedOption}
            options={options}
            isRunLoading={props.runIsLoading}
            isSubmitLoading={props.submitIsLoading}
            onExecute={() => {
              props.onExecute(props.code);
            }}
            onSubmit={() => {
              props.onSubmit(props.code);
            }}
          ></EditorActions>
          <Editor
            language={selectedOption ? selectedOption.value : 'python'}            
            isActive = {props.isActive}
            secondsEditor = {props.secondsEditor}
            code={props.code}
            onChangeCodeInput={props.onChangeCodeInput}
          ></Editor>
          <TabMenu
            errorStatus={props.errorStatus}
            error={props.error}
            output={props.outputReceived}
          ></TabMenu>
        </Box>
      </Flex>
      </>
  );
};

export default Main;
