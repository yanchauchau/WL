import React, { useState } from "react";
import ReactDOM from "react-dom";
import HookForm from "./hooks/HookForm";
import "./styles.css";
import { FaRegCopy } from "react-icons/fa";
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
  text,
  HStack,
  VStack
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

function App() {
  const [isCopied, setIsCopied] = useState(false);
  const [paletteColor1, setPaletteColor1] = useState(""); // State for palette color 1
  const [paletteColor2, setPaletteColor2] = useState(""); // State for palette color 2
  const [contrastLinkBg, setContrastLinkBg] = useState(0); // State for contrast
  const [contrastDarkLinkBg, setContrastDarkLinkBg] = useState(0); // State for contrast


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
  const handlePaletteGenerated = (color1, color2, contrastLinkBg, contrastDarkLinkBg) => {
    setPaletteColor1(color1);
    setPaletteColor2(color2);
    setContrastLinkBg(contrastLinkBg);
    setContrastDarkLinkBg(contrastDarkLinkBg);
  };

  return (
    <ChakraProvider theme={theme}>
      <Stack direction={"column"} gap={0}>
        <Stack
          direction={"row"}
          minHeight="4rem"
          alignItems="center"
          gap={0}
          p={8}
        >
          <VStack align='start'><Heading as="h1" size="lg" bgGradient="linear(to-l, #30cfd0, #330867)"
            bgClip="text">
            White label JSON generatorrrr
          </Heading>
          <Text fontSize='xs'>Last updated on 09 Aug 2069</Text></VStack>
          <Spacer />
          <ColorModeSwitcher justifySelf="flex-end" />
        </Stack>
        <Stack direction="row" gap={8} fontSize="xl" p={12} >
          <Stack direction="column" gap={8} flex="1" align="start">
            <Heading as="h2" size="md">
              1. ✍️ Fill out this form
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
                2. Copy JSON here
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
              rows="10"
              cols="1"
            />


            <Heading as="h2" size="md">
              Contrast checker
            </Heading>


            {/* Display the palette color */}
            <Text>Generated Color1: {paletteColor1}</Text>
            <Text>Generated Color2: {paletteColor2}</Text>
            {/* Add a square with the generated color */}
            <HStack>
              <Box width='60px' height='60px' centerContent bg={paletteColor1} border="1px" borderColor='gray.300' />
              <Box width='60px' height='60px' centerContent bg={paletteColor2} border="1px" borderColor='gray.300' />
            </HStack>

            {/* Display the contrast */}
            <Text>Contrast (link & bg): {contrastLinkBg}</Text>
            <Text>Contras (Links in bulk action drawer) : {contrastDarkLinkBg}</Text>

            <Heading as="h2" size="md">
              3. Paste to Asana task
            </Heading>
            <Heading as="h2" size="md">
              4. Paste to Django
            </Heading>
          </Stack>

        </Stack>

      </Stack>
    </ChakraProvider>
  );
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
