import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import LeaveButton from "../Buttons/LeaveButton";

const QuitModal = (props) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton variant="outline" textColor="black" />
          <ModalHeader fontSize="lg">
            Are you sure you want to quit?
          </ModalHeader>
          <ModalBody>
            <Text>
              Quitting will disconnect you from the game and automatically
              losing you the game.
            </Text>
          </ModalBody>
          <Flex p={4} ml="auto">
            <NextLink replace={true} href="/">
              <LeaveButton
                h="40px"
                w="100px"
                text="Quit"
                fontSize="16px"
                isLoading={loading}
                onClick={() => {
                  setLoading(true);
                  props.onLeave();
                  window.location.reload();
                }}
              ></LeaveButton>
            </NextLink>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuitModal;
