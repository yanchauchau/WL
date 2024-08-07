import React, { useState } from "react";
import ReactDOM from "react-dom";
import HookForm from "./hooks/HookForm";
import "./styles.css";
import { FaRegCopy } from "react-icons/fa";
import {
  ChakraProvider,
  Text,
  Center,
  Button,
  Heading,
  Spacer,
  Stack,
  Textarea,
  theme,
  HStack,
  VStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

function App() {
  const [isCopied, setIsCopied] = useState(false);
  const [paletteColor2, setPaletteColor2] = useState(""); // State for palette color 2
  const [primaryMain, setPrimaryMain] = useState(""); // State for Primary Main
  const [secondaryMain, setSecondaryMain] = useState(""); // State for Secondary Main
  const [primaryBorder, setPrimaryBorder] = useState(""); // State for palette color 1
  const [contrastTextColorPrimary, setContrastTextColorPrimary] = useState(""); // State for Contrast text for primary
  const [contrastTextColorSecondary, setContrastTextColorSecondary] =
    useState(""); // State for Contrast text for secondary
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
  const handlePaletteGenerated = (
    color1,
    color2,
    contrastLinkBg,
    contrastDarkLinkBg,
    primaryMain,
    secondaryMain,
    primaryBorder,
    contrastTextColorPrimary,
    contrastTextColorSecondary
  ) => {
    setPaletteColor2("#" + color2);
    setPrimaryMain("#" + primaryMain);
    setSecondaryMain("#" + secondaryMain);
    setPrimaryBorder(primaryBorder);
    setContrastTextColorPrimary(contrastTextColorPrimary);
    setContrastTextColorSecondary(contrastTextColorSecondary);
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
          <VStack align="start">
            <Heading
              as="h1"
              size="lg"
              bgGradient="linear(to-l, #30cfd0, #330867)"
              bgClip="text"
            >
              White label JSON generator
            </Heading>
            <Text fontSize="xs">Last updated on 07 Aug 2024</Text>
          </VStack>
          <Spacer />
          <ColorModeSwitcher justifySelf="flex-end" />
        </Stack>

        <Stack direction="row" gap={6} fontSize="xl" p={8}>
          <Stack direction="column" gap={8} flex="1" align="start">
            <Heading as="h2" size="md">
              1. ✍️ Fill out this form
            </Heading>
            <HookForm onPaletteGenerated={handlePaletteGenerated} />
          </Stack>
          <Stack direction="column" flex="1" gap={12}>
            <VStack spacing={4} align="start">
              <Heading as="h2" size="md">
                2. Check contrast
              </Heading>

              {/* Display the contrast */}
              <VStack align="start" gap={0}>
                <Text
                  fontSize="sm"
                  color={
                    contrastLinkBg > 0 && contrastLinkBg < 4.5
                      ? "red.500"
                      : "Black"
                  }
                >
                  Contrast(Link color on light background):
                </Text>
                <HStack>
                  <Text
                    fontSize="LG"
                    color={
                      contrastLinkBg > 0 && contrastLinkBg < 4.5
                        ? "red.500"
                        : "Black"
                    }
                  >
                    {contrastLinkBg}
                  </Text>
                  {contrastLinkBg > 0 &&
                    (contrastLinkBg < 4.5 ? (
                      <Text color="red.500">❌</Text>
                    ) : (
                      <Text color="Black">✅</Text>
                    ))}
                </HStack>
              </VStack>

              <VStack align="start" gap={0}>
                <Text
                  fontSize="sm"
                  color={
                    contrastDarkLinkBg && contrastDarkLinkBg < 4.5
                      ? "red.500"
                      : "Black"
                  }
                >
                  Contrast(Link color on light background):
                </Text>
                <HStack>
                  <Text
                    fontSize="LG"
                    color={
                      contrastDarkLinkBg && contrastDarkLinkBg < 4.5
                        ? "red.500"
                        : "black"
                    }
                  >
                    {contrastDarkLinkBg}
                  </Text>
                  {contrastDarkLinkBg > 0 &&
                    (contrastDarkLinkBg < 4.5 ? (
                      <Text color="red.500">❌</Text>
                    ) : (
                      <Text color="green.500">✅</Text>
                    ))}
                </HStack>
              </VStack>
            </VStack>

            <VStack spacing={4} align="start">
              <Heading as="h2" size="sm">
                Generated palette
              </Heading>
              {/* Add a square with the generated color */}
              <Grid
                fontSize="xs"
                templateColumns="repeat(5, 1fr)"
                gap={2}
                alignItems={"center"}
                textAlign={"center"}
              >
                <GridItem w="100%" colStart={1} rowStart={2}>
                  <Text>Primary</Text>
                </GridItem>
                <GridItem w="100%" colStart={2}>
                  <Text>Light</Text>
                </GridItem>
                <GridItem w="100%" colStart={3}>
                  <Text>Fill</Text>
                </GridItem>{" "}
                <GridItem w="100%" colStart={4}>
                  <Text>Border</Text>
                </GridItem>
                <GridItem w="100%" colStart={5}>
                  <Text>Main</Text>
                </GridItem>
                <GridItem w="100%" colStart={6}>
                  <Text>Dark</Text>
                </GridItem>
                <GridItem w="100%" colStart={1} rowStart={4}>
                  <Text>Secondary</Text>
                </GridItem>
                <GridItem w="100%" colStart={5} rowStart={2}>
                  <Center
                    w="48px"
                    h="48px"
                    m={["auto"]}
                    borderRadius={100}
                    bg={primaryMain}
                    border="1px"
                    borderColor="gray.300"
                    color={contrastTextColorPrimary}
                  >
                    Text
                  </Center>
                </GridItem>
                <GridItem w="100%" colStart={4} rowStart={2}>
                  <Center
                    w="48px"
                    h="48px"
                    m={["auto"]}
                    borderRadius={100}
                    bg={primaryBorder}
                    border="1px"
                    borderColor="gray.300"
                  />
                </GridItem>
                <GridItem w="100%" colStart={4} rowStart={4}>
                  <Center
                    w="48px"
                    h="48px"
                    m={["auto"]}
                    borderRadius={100}
                    bg={secondaryMain}
                    border="1px"
                    borderColor="gray.300"
                    color={contrastTextColorSecondary}
                  >
                    Text
                  </Center>
                </GridItem>
                <GridItem w="100%" colStart={2} rowStart={2}>
                  <Center
                    w="48px"
                    h="48px"
                    m={["auto"]}
                    borderRadius={100}
                    bg={secondaryMain}
                    border="1px"
                    borderColor="gray.300"
                    color={contrastTextColorSecondary}
                  />
                </GridItem>
              </Grid>
              <VStack align="start" spacing={2} bgColor="lightyellow" w='100%'p={4}>
                {/* Display the palette color */}
                <Text fontSize="xs" >FOR TESTING ONLY</Text>
                <Text fontSize="sm">Generated Color1: {primaryBorder}</Text>
                <Text fontSize="sm">Generated Color2: {paletteColor2}</Text>
                <Text fontSize="sm">Primary: {primaryMain}</Text>
                <Text fontSize="sm">Secondary: {secondaryMain}</Text>
                <Text fontSize="sm">
                  Contrast text: {contrastTextColorPrimary}
                </Text>
                <Text fontSize="sm">
                  Contrast text: {contrastTextColorSecondary}
                </Text>
              </VStack>
            </VStack>
            <VStack spacing={4} align="start">
              <Stack
                id="json"
                direction="row"
                gap={8}
                justify={"space-between"}
                p={0}
              >
                <Heading as="h2" size="md" w="100%">
                  3. Copy JSON here
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
                placeholder=""
                rows="20"
                cols="1"
              />
            </VStack>
          </Stack>
        </Stack>
      </Stack>
    </ChakraProvider>
  );
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
