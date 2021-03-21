import {
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import SecondaryButton from "../Buttons/SecondaryButton";

const LostModal = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Modal isOpen={props.isOpenLost} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Center>
              <Text fontSize="6xl">😭</Text>
            </Center>
            <Text align="center">You lost!</Text>
          </ModalBody>
          <Center p={4}>
            <NextLink href="/">
              <SecondaryButton
                text="Try again"
                bg="#F28A3A"
                h="40px"
                isLoading={loading}
                w="140px"
                onClick={() => {
                  setLoading(true);
                  props.onLeave;
                  window.location.reload();
                }}
              ></SecondaryButton>
            </NextLink>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LostModal;
