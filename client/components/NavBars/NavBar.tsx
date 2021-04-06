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
import LeaveButton from "../Buttons/LeaveButton";
import { NavBarTypes } from "../../types";

const NavBar = ({ onLeave, elapsedTime }: NavBarTypes) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      border="1px"
      bg="#FAFAFA"
      borderColor="gray.200"
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
          <LeaveButton
            h="30px"
            w="60px"
            text="Quit"
            fontSize="14px"
            onClick={onOpen}
          ></LeaveButton>
        </Center>
      </Box>
    </Box>
  );
};

export default NavBar;
