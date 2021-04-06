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
import SecondaryButton from "../Buttons/SecondaryButton";

interface lostModalType extends modalTypes {
  onLeave?: () => void;
  isOpenLost: boolean;
}

const LostModal = ({ onClose, onLeave, isOpenLost }: lostModalType) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Modal isOpen={isOpenLost} onClose={onClose}>
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
                h="40px"
                isLoading={loading}
                w="140px"
                onClick={() => {
                  setLoading(true);
                  onLeave;
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
