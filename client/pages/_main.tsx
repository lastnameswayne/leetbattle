import { Box, Flex, TabsProps } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import EditorActions from "../components/EditorActions";
import { default as LostModal } from "../components/Modals/LostModal";
import SuccesModal from "../components/Modals/SuccesModal";
import NavBar from "../components/NavBars/NavBar";
import ProblemTabMenu from "../components/TabMenus/ProblemTabMenu";
import TabMenu from "../components/TabMenus/Tabs";
import { MainProps } from "../types";
const Editor = dynamic(() => import("../components/Editor"));

const Main = ({
  onLeave,
  elapsedTime,
  isOpenWon,
  onOpen,
  isOpenLost,
  joined,
  index,
  onChange,
  created,
  seconds,
  gameCode,
  runIsLoading,
  submitIsLoading,
  code,
  onExecute,
  onSubmit,
  isActive,
  secondsEditor,
  onChangeCodeInput,
  errorStatus,
  error,
  outputReceived,
}: MainProps): JSX.Element => {
  //options and hook for the dropdown-select
  const options = [
    { value: "python", label: "Python3" },
    { value: "javascript", label: "JavaScript" },
    { value: "java", label: "Java" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <>
      <NavBar onLeave={onLeave} elapsedTime={elapsedTime}></NavBar>
      <SuccesModal
        time={elapsedTime}
        isOpenWon={isOpenWon}
        onOpen={onOpen}
      ></SuccesModal>
      <LostModal isOpenLost={isOpenLost}></LostModal>
      <Flex>
        <Box>
          <ProblemTabMenu
            joined={joined}
            index={index}
            onChange={onChange}
            created={created}
            secondsTabMenu={seconds}
            gameCodeTabMenu={gameCode}
          ></ProblemTabMenu>
        </Box>
        <Box w="90%" mx={2}>
          <EditorActions
            defaultValue={selectedOption}
            setSelectedOption={setSelectedOption}
            options={options}
            isRunLoading={runIsLoading}
            isSubmitLoading={submitIsLoading}
            onExecute={() => {
              onExecute(code);
            }}
            onSubmit={() => {
              onSubmit(code);
            }}
          ></EditorActions>
          <Editor
            language={selectedOption ? selectedOption.value : "python"}
            isActive={isActive}
            secondsEditor={secondsEditor}
            code={code}
            onChangeCodeInput={onChangeCodeInput}
          ></Editor>
          <TabMenu
            errorStatus={errorStatus}
            error={error}
            output={outputReceived}
          ></TabMenu>
        </Box>
      </Flex>
    </>
  );
};

export default Main;
