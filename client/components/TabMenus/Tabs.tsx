import {
  TabList,
  TabPanel,
  TabPanels,
  Tab,
  Button,
  Text,
  Code,
  Textarea,
  Box,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import BoldText from "../Text/BoldText";
import CodeArea from "../Text/CodeArea";

interface TabMenuProps {
  errorStatus: boolean;
  error: string;
  output: string;
}

const TabMenu = ({ errorStatus, error, output }: TabMenuProps) => {
  const StatusText = (props) => {
    if (errorStatus) {
      return (
        <Text fontSize="xl" textColor="#D81C60" mb={2}>
          Error
        </Text>
      );
    } else if (props.errorStatus === false) {
      return (
        <Text fontSize="xl" textColor="#388E3D" mb={2}>
          Compiled
        </Text>
      );
    } else {
      return <Text></Text>;
    }
  };

  return (
    <Tabs variant="enclosed" isLazy isFitted mt={1}>
      <TabList>
        <Tab
          _focus={{ outline: "0" }}
          _selected={{
            color: "#0586E8",
            border: "1px",
            borderColor: "gray.200",
          }}
        >
          Output
        </Tab>
        <Tab
          _focus={{ outline: "0" }}
          _selected={{
            color: "#0586E8",
            border: "1px",
            borderColor: "gray.200",
          }}
        >
          Testcases
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <StatusText errorStatus={errorStatus}></StatusText>

          {
            //<BoldText text = "Your input cond. rendr"></BoldText>
            //<CodeArea></CodeArea>
          }
          <BoldText text="Output:"></BoldText>
          <CodeArea>
            <Text p={1}>{output ? output : ""}</Text>
          </CodeArea>

          {errorStatus ? (
            <>
              <Text textColor="#D81C60" fontWeight="bold">
                Error:
              </Text>
              <CodeArea textColor="#D81C60" mb={3}>
                <Text p={1}>{error ? error : ""}</Text>
              </CodeArea>
            </>
          ) : (
            <Box></Box>
          )}
          {
            //   <BoldText text = "Expected:">Expected</BoldText>
            //   <CodeArea></CodeArea>
            // </TabPanel>
            // <TabPanel>
            //   <Textarea value = "[2,7,11,15], 9" bgColor="#F7F9FA" onChange={() => {}}>
            //   </Textarea>
          }
        </TabPanel>
        <TabPanel>
          <BoldText text="Testcase:"></BoldText>
          <CodeArea bgColor="#F7F9FA">
            <Text p={1}>[2,7,11,15]</Text>
            <Text p={1}>9</Text>
          </CodeArea>
        </TabPanel>
        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabMenu;
