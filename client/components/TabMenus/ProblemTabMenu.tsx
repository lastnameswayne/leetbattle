import {
  Center,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import ProblemDescription from "../ProblemDescription";

interface ProblemTabMenuProps {
  created: boolean;
  secondsTabMenu: number;
  onChange: (index) => void;
  index: number;
  gameCodeTabMenu: string;
  joined: boolean;
}

const ProblemTabMenu = ({
  created,
  secondsTabMenu,
  onChange,
  index,
  gameCodeTabMenu,
}: ProblemTabMenuProps) => {
  const CountdownMenu = () => {
    if (created) {
      return (
        <Container>
          <Center mt={3}>
            <Text>Invite a player to start the countdown!</Text>
          </Center>
          <Center mt={3}>
            <Text>⏱ Game starting in</Text>
          </Center>
          <Center>
            <Text fontSize="xx-large">{secondsTabMenu + "s"}</Text>
          </Center>
        </Container>
      );
    } else if (secondsTabMenu === 0) {
      return (
        <Container>
          <Center mt={3}>
            <Text>⏱ Game started!</Text>
          </Center>
          <Center>
            <Text fontSize="xx-large">✅</Text>
          </Center>
        </Container>
      );
    } else {
      return (
        <Container>
          <Center mt={3}>
            <Text>⏱ Game starting in</Text>
          </Center>
          <Center>
            <Text fontSize="xx-large">{secondsTabMenu + "s"}</Text>
          </Center>
        </Container>
      );
    }
  };

  return (
    <Tabs
      onChange={onChange}
      index={index}
      variant="enclosed"
      isLazy
      isFitted
      w={[200, 300, 350, 350]}
      defaultIndex={1}
    >
      <TabList>
        <Tab
          onChange={onChange}
          _focus={{ outline: "0" }}
          _selected={{
            color: "#0586E8",
            border: "1px",
            borderColor: "gray.200",
          }}
        >
          Problem
        </Tab>
        <Tab
          onChange={onChange}
          _focus={{ outline: "0", border: "1px", borderColor: "gray.200" }}
          _selected={{ color: "#0586E8" }}
          //onClick={() => setOpenTab(1)}
        >
          Session Details
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ProblemDescription></ProblemDescription>
        </TabPanel>
        <TabPanel>
          <Center>
            <Text>👋 Invite people with code:</Text>
          </Center>
          <Center>
            <Text as="u" fontSize="xx-large">
              {gameCodeTabMenu ? gameCodeTabMenu : "N/A"}
            </Text>
          </Center>
          <CountdownMenu></CountdownMenu>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProblemTabMenu;
