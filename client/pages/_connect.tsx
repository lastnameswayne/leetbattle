import {
  Box,
  Center,
  Container,
  Divider,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import SecondaryButton from "../components/Buttons/SecondaryButton";
import IntroNavBar from "../components/NavBars/IntroNavBar";
import ChooseProblemModal from "../components/Modals/ChooseProblemModal";

const ConnectPage = (props): JSX.Element => {
  return (
    <Box>
      <IntroNavBar></IntroNavBar>
      <ChooseProblemModal
        isOpen={props.isOpen}
        onClose={props.onClose}
        handleCreate={props.newGame}
      ></ChooseProblemModal>
      <Container p={5}>
        <Box
          mt="10px"
          padding="10px"
          borderRadius="10px"
          border="1px"
          borderColor="gray.200"
        >
          <Center>
            <Heading mb={3}>Welcome to LeetBattle!</Heading>
          </Center>
          <Text fontSize="xl" align="center" mb={3}>
            Use your algorithm-skills to beat your opponent by solving the
            problem as fast as possible!
          </Text>
          <Text align="center" fontSize="xl" mb={3}>
            Start by creating a game:
          </Text>
          <Center>
            <PrimaryButton
              text="Create game"
              bg="#F28A3A"
              h="40px"
              w="140px"
              onClick={props.onOpen}
            ></PrimaryButton>
          </Center>
          <Divider></Divider>
          <Center>
            <Text m={3} fontSize="xl">
              or with gamecode:
            </Text>
          </Center>
          <Input isRequired={true} mb={3} onChange={props.handleChange}></Input>
          <Center>
            <SecondaryButton
              text="Join game"
              w="140px"
              h="40px"
              bg="#0586E8"
              onClick={props.joinGame}
            ></SecondaryButton>
          </Center>
        </Box>
      </Container>
    </Box>
  );
};

export default ConnectPage;