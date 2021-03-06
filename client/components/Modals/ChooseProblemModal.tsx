import {
  Center,
  Container,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import ProblemCard from "../ProblemCard";
import { modalTypes } from "../../types";

const ChooseProblemModal = ({
  isOpen,
  onClose,
  text,
  handleCreate,
}: modalTypes) => {
  const [loading, setLoading] = useState(false);

  const options = ["Two Sum", "Coming soon!", "Coming soon v2!"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Problems",
    defaultValue: "Two Sum",
  });

  const group = getRootProps();

  return (
    <>
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton textColor="black" />
          <ModalHeader>Click to choose a problem👏</ModalHeader>
          <ModalBody>
            <VStack {...group}>
              {options.map((value) => {
                const radio = getRadioProps({ value });
                return (
                  <ProblemCard key={value} {...radio}>
                    <Flex>
                      <Container>
                        <Flex ml="auto">
                          <Text fontSize="lg" fontWeight="bold">
                            {value}
                          </Text>
                        </Flex>
                        <Text>{text}</Text>
                      </Container>
                    </Flex>
                  </ProblemCard>
                );
              })}
            </VStack>
          </ModalBody>
          <Center p={4}>
            <PrimaryButton
              text="Choose!"
              w="140px"
              h="40px"
              isLoading={loading}
              onClick={() => {
                setLoading(true);
                handleCreate();
              }}
            ></PrimaryButton>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChooseProblemModal;
