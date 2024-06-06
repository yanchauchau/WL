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
  Box,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

function App() {
  const [isCopied, setIsCopied] = useState(false);
  const [paletteColor, setPaletteColor] = useState(''); // State for palette color
  const [contrast, setContrast] = useState(0); // State for contrast

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

  // Callback function to handle palette color and contrast from HookForm
  const handlePaletteGenerated = (color, contrastValue) => {
    setPaletteColor(color);
    setContrast(contrastValue);
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
          <Heading as="h1" size="md">White label JSON generatorrrr</Heading>
          <Spacer />
          <ColorModeSwitcher justifySelf="flex-end" />
        </Stack>
        <Stack direction="row" gap={8} fontSize="xl" p={16}>
          <Stack direction="column" gap={8} flex="1" align="start">
            <Heading as="h2" size="md">
              Input
            </Heading>
            <HookForm onPaletteGenerated={handlePaletteGenerated} />
          </Stack>
          <Stack direction="column" flex="1" gap={3}>
            <Stack
              id="json"
              direction="row"
              gap={8}
              justify={"space-between"}
              p={0}
            >
              <Heading as="h2" size="md">
                Output
              </Heading>
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
            {/* Display the palette color */}
            <Text>Generated Color: {paletteColor}</Text>
            {/* Add a square with the generated color */}
            <Box
              width="100px"
              height="100px"
              backgroundColor={paletteColor}
            />
            {/* Display the contrast */}
            

            <Text>Contrast: {contrast}</Text>
            <Text>Contrast: {contrast}</Text>
          </Stack>
        </Stack>
      </Stack>
    </ChakraProvider>
  );
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
