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
import NextLink from "next/link";
import QuitModal from "../Modals/QuitModal";
import LeaveButton from "../Buttons/LeaveButton";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
const NavBar = (props) => {
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
          onLeave={props.onLeave}
          isOpen={isOpen}
          onClose={onClose}
        ></QuitModal>
        <Center>
          <Heading>
            <Link>LEETBATTLE🏆</Link>
          </Heading>
          <Spacer />
          <Text as="u" fontSize="2xl">
            {props.elapsedTime}
          </Text>
          <Spacer />
          <LeaveButton
            h="30px"
            w="60px"
            text="Quit"
            fontSize="14px"
            onClick={onOpen}
          >
            Quit
          </LeaveButton>
        </Center>
      </Box>
    </Box>
  );
};

export default NavBar;
