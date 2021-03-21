import { Box, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";
import CodeArea from "../components/Text/CodeArea";
import BoldText from "../components/Text/BoldText";
import CodeText from "../components/Text/CodeText";
import ItalicText from "../components/Text/ItalicText";

const TwoSum = () => {
  return (
    <>
      <Heading>Two Sum</Heading>
      <Text fontSize="l" as="u">
        Description
      </Text>
      <Box>
        Given an array of integers <CodeText text="nums"></CodeText> and an
        integer <CodeText text="target"></CodeText>, return{" "}
        <ItalicText text="indices of the two numbers">
          indices of the two numbers
        </ItalicText>{" "}
        such that they add up to <CodeText text="target"></CodeText>.
      </Box>
      <Box mt={3}>
        You may assume that each input would have{" "}
        <Box as="span" fontWeight="bold">
          exactly one solution
        </Box>
        , and you may not use the <ItalicText text="same"></ItalicText> element
        twice.
      </Box>
      <Box my={6}>You can return the answer in any order.</Box>
      <BoldText text="Example 1" />
      <CodeArea>
        <Text><BoldText text  ="Input: "/>nums = [2,7,11,15], target = 9</Text>
        <Text><BoldText text = "Output: "/> [0,1]</Text>
        <Text><BoldText text  ="Output: "/>Because nums[0] + nums[1] == 9, we return [0, 1].</Text>
      </CodeArea>
      <BoldText text="Example 2" />
      <CodeArea>
        <Text><BoldText text = "Input: "/>nums = [3,2,4], target = 6</Text>
        <Text><BoldText text = "Output: "/>[1,2]</Text>
      </CodeArea>
      <BoldText text="Example 3"></BoldText>
      <CodeArea>
        <Text><BoldText text = "Input: "/> nums = [3,3], target = 6</Text>
        <Text><BoldText text = "Output: "/>[0,1]</Text>
      </CodeArea>
      <Box mt={10}>
        <BoldText text="Constraints:"></BoldText>
        <UnorderedList spacing={2}>
          <ListItem>
            <CodeText text="2 <= nums.length <= 10^3"></CodeText>
          </ListItem>
          <ListItem>
            <CodeText text="-10^9 <= nums[i] <= 10^9"></CodeText>
          </ListItem>
          <ListItem>
            <CodeText text="-10^9 <= nums[i] <= 10^9"></CodeText>
          </ListItem>
          <ListItem>
            <BoldText text="Only one valid answer exists."></BoldText>
          </ListItem>
        </UnorderedList>{" "}
      </Box>
    </>
  );
  ``;
};

export default TwoSum;
