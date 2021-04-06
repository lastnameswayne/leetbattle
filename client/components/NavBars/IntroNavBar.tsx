import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  Heading,
  Link,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import QuitModal from "../Modals/QuitModal";
import HoverButton from "../Buttons/HoverButton";
import { NavBarTypes } from "../../types";

const IntroNavBar = ({ onLeave, elapsedTime }: NavBarTypes) => {
  const { isOpen, onClose } = useDisclosure();
  return (
    <Box
      border="1px"
      bg="#FAFAFA"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={3}
      ml={"auto"}
    >
      <Box ml={"auto"}>
        <QuitModal
          onLeave={onLeave}
          isOpen={isOpen}
          onClose={onClose}
        ></QuitModal>
        <Center>
          <Heading>
            <Link>LEETBATTLE🏆</Link>
          </Heading>
          <Spacer />
          <Text as="u" fontSize="2xl">
            {elapsedTime}
          </Text>
          <Spacer />

          <HoverButton></HoverButton>
        </Center>
      </Box>
    </Box>
  );
};

export default IntroNavBar;
