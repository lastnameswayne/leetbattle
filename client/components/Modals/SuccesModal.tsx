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
import { modalTypes } from "../../types";
import PrimaryButton from "../Buttons/PrimaryButton";

interface succesModalTypes extends modalTypes {
  isOpenWon: boolean;
  onLeave?: () => void;
  onOpen: () => void;
  time: string;
}

const SuccesModal = ({
  isOpenWon,
  onClose,
  onLeave,
  time,
}: succesModalTypes) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Modal isOpen={isOpenWon} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Center>
              <Text fontSize="6xl">🏆</Text>
            </Center>
            <Text align="center">
              Correct answer! You beat your opponent in {time ? time : ""}!
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
                  onLeave();
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
