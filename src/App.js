import React, { useState } from "react";
import ReactDOM from "react-dom";
import HookForm from "./hooks/HookForm";
import "./styles.css";
import { FaRegCopy } from "react-icons/fa6";
import {
  ChakraProvider,
  Text,
  Button,
  Heading,
  Spacer,
  Stack,
  Textarea,
  theme,
  Center,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

function App() {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    const textArea = document.getElementById("formValuesTextArea");
    if (textArea) {
      textArea.select();
      document.execCommand("copy");
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Stack direction={"column"} gap={0}>
        <Stack
          direction={"row"}
          minHeight="4rem"
          alignItems="center"
          gap={0}
          bg="yellow.100"
          p={4}
        >
          <Heading size="md">White label JSON generatorrrr </Heading>
          <Spacer />
          <ColorModeSwitcher justifySelf="flex-end" />
        </Stack>
        <Stack direction="row" gap={8} fontSize="xl" p={16}>
          <Stack direction="column" gap={8} flex="1" align="start">
            <Text>Input for WL</Text>
            <HookForm />
          </Stack>
          <Stack direction="column" flex="1" gap={3}>
            <Stack  id="json"  direction="row" gap={8} justify={"space-between"} p={0}>
              <Heading as="h2" size="md">
                JSON testing area
              </Heading>
              {/* Conditionally render the button or text based on isCopied */}
              {isCopied ? (
                <Text fontSize="sm" color="teal.500">
                  Copied!
                </Text>
              ) : (
                <Button
                  leftIcon={<FaRegCopy />}
                  colorScheme="teal"
                  size="sm"
                  variant="outline"
                  onClick={copyToClipboard}
                >
                  Copy
                </Button>
              )}
            </Stack>
            <Textarea
              id="formValuesTextArea"
              placeholder="Here is a sample placeholder"
              rows="20"
              cols="1"
            />
          </Stack>
        </Stack>
      </Stack>
    </ChakraProvider>
  );
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
