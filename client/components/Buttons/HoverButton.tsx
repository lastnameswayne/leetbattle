import { QuestionIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";

const HoverButton = () => {
  return (
    <Menu>
      <MenuButton
        icon={<QuestionIcon />}
        mr={4}
        pt={1}
        textColor="white"
        borderRadius="4px"
        fontWeight="semibold"
        bg="#F28A3A"
        transition="transform 250ms, opacity 400ms"
        _hover={{
          transform: "scale(1.06)",
          bg: "#F09A2B",
        }}
        _active={{
          bg: "#F09A2B",
        }}
        _focus={{
          outline: "0",
        }}
        as={Button}
      >
        <QuestionIcon w={5} h={5} mr={1} mb={1} /> How to play
      </MenuButton>
      <MenuList pl={2} pb={8} minH="100px" w="300px">
        <Text>
          The objective of the game is for you to solve programming problem
          before your opponent!
        </Text>
        <Text mt={2}>
          After two players have entered a game, the timer starts. You can now
          start typing your solution in the editor and run it. When you think
          you have the correct solution, make sure to submit.
        </Text>
        <Text mt={2}>Fastest solution wins!</Text>
        <Text mt={4}>
          Note that this is a beta-release, so please submit an issue on{" "}
          <Box as="span">
            <Link
              textColor="#F28A3A"
              href="https://github.com/lastnameswayne/leetbattle"
            >
              GitHub
            </Link>
          </Box>{" "}
          if you find a bug or have any suggestions.
        </Text>
      </MenuList>
    </Menu>
  );
};

export default HoverButton;
