import React from "react";
import ReactDOM from "react-dom";
import HookForm from './hooks/HookForm'
import {
  ChakraProvider,
  Box,
  Text,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  VStack,
  Heading,
  Spacer,
  Stack,
  Input,
  Checkbox,
  Container,
  Code,
  Grid,
  Textarea,
  theme,
  Center,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";


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
        <Stack direction="row" gap="0">
          <Box flex="1" bg="red.100" fontSize="xl" p={16}>
            <VStack spacing={8} minH="100vh" align="start">
              {/* <Logo h="10vmin" pointerEvents="none" /> */}
              <Text>Input for WL</Text>

              <HookForm />

              <ButtonGroup>
                <Button colorScheme="blue" variant="outline" size="lg">
                  Clear
                </Button>
                <Button colorScheme="blue" size="lg">
                  Generate JSON
                </Button>
              </ButtonGroup>
            </VStack>
          </Box>
          <Box flex="1" p={16}>
            <Textarea placeholder="Here is a sample placeholder" />
          </Box>
        </Stack>
      </Stack>
    </ChakraProvider>
  );
}

export default App;


const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
