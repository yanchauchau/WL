import React from "react";
import ReactDOM from "react-dom";
import HookForm from "./hooks/HookForm";
import "./styles.css";

import {
  ChakraProvider,
  Text,
  Heading,
  Spacer,
  Stack,
  Textarea,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";


function App() {
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
          <Heading size="md">Example </Heading>
          <Spacer />
          <ColorModeSwitcher justifySelf="flex-end" />
        </Stack>
        <Stack direction="row" gap={8} fontSize="xl" p={16}>
          <Stack direction="column" gap={8} flex="1" align="start">
          <Text>Input for WL</Text>
            <HookForm />
          </Stack>
          <Stack  direction="column" flex="1" gap={3}>
            <Heading as="h2" size="md">
              JSON testing area
            </Heading>
            <Textarea id="formValuesTextArea" placeholder="Here is a sample placeholder" rows="10" cols="50" />
          </Stack>
        </Stack>
      </Stack>
    </ChakraProvider>
  );
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
