import {
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";

const SuccesModal = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Modal isOpen={props.isOpenWon} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Center>
              <Text fontSize="6xl">🏆</Text>
            </Center>
            <Text align="center">
              Correct answer! You beat your opponent in {" "}
              {props ? props.time : ""}!
            </Text>
          </ModalBody>
          <Center p={4}>
            <NextLink href="/">
              <PrimaryButton
                text="Play again"
                h="40px"
                isLoading={loading}
                w="140px"
                onClick={() => {
                  setLoading(true);
                  props.onLeave;
                  window.location.reload();
                }}
              ></PrimaryButton>
            </NextLink>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SuccesModal;
