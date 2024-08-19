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
  const [primaryMain, setPrimaryMain] = useState(""); // State for Primary.main
  const [secondaryMain, setSecondaryMain] = useState(""); // State for Secondary.main
  const [primaryLight, setPrimaryLight] = useState(""); // State for primary.light
  const [primaryFill, setPrimaryFill] = useState(""); // State for primary.fill
  const [primaryBorder, setPrimaryBorder] = useState(""); // State for primary.border
  const [primaryDark, setPrimaryDark] = useState(""); // State for primary.dark
  const [link, setLink] = useState(""); // State for link color
  const [linkReverse, setLinkReverse] = useState(""); // State for link reverse color
  const [ratioLink, setRatioLink] = useState(0); // State for contrast
  const [ratioLinkReverse, setRatioLinkReverse] = useState(0); // State for contrast
  const [contrastTextColorPrimary, setContrastTextColorPrimary] = useState(0); // State for Contrast text for primary color
  const [contrastTextColorSecondary, setContrastTextColorSecondary] =
    useState(0); // State for Contrast text for primary color
  const [statusUnsent, setStatusUnsent] = useState(""); // State for statusUnsent
  const [statusSent, setStatusSent] = useState(""); // State for statusSent
  const [statusNotStarted, setStatusNotStarted] = useState(""); // State for statusNotStarted
  const [statusSigned, setStatusSigned] = useState(""); // State for statusSigned
  const [statusApproved, setStatusApproved] = useState(""); // State for statusApproved
  const [statusExecuted, setStatusExecuted] = useState(""); // State for statusExecuted
  
  


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
    primaryMain,
    secondaryMain,
    primaryLight,
    primaryFill,
    primaryBorder,
    primaryDark,
    link,
    linkReverse,
    ratioLink,
    ratioLinkReverse,
    contrastTextColorPrimary,
    contrastTextColorSecondary,
    statusUnsent,
    statusSent,
    statusNotStarted,
    statusSigned,
    statusApproved,
    statusExecuted
  ) => {
    setPrimaryMain("#" + primaryMain);
    setSecondaryMain("#" + secondaryMain);
    setPrimaryLight(primaryLight);
    setPrimaryFill(primaryFill);
    setPrimaryBorder(primaryBorder);
    setPrimaryDark(primaryDark);
    setLink("#" + link);
    setLinkReverse("#" + linkReverse);
    setRatioLink(ratioLink);
    setRatioLinkReverse(ratioLinkReverse);
    setContrastTextColorPrimary(contrastTextColorPrimary);
    setContrastTextColorSecondary(contrastTextColorSecondary);
    setStatusUnsent("#" + statusUnsent);
    setStatusSent("#" + statusSent);
    setStatusNotStarted("#" + statusNotStarted);
    setStatusSigned("#" + statusSigned);
    setStatusApproved("#" + statusApproved);
    setStatusExecuted("#" + statusExecuted);
  };

  return (
    <ChakraProvider theme={theme}>
      <Stack direction={"column"} >
        <Stack
          direction={"row"}
          minH={4}
          minW={4}
          alignItems="center"
          gap={16}
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

        <Stack direction={"row"} ontSize="md" p={8}  spacing={8} >
          <Stack id='step1' direction="column"  spacing={8} flex="1" align="start">
            <Heading as="h2" size="md">
              1. ✍️ Fill out this form
            </Heading>      
            <HookForm onPaletteGenerated={handlePaletteGenerated} />
          </Stack>
          <Stack  id='step2' direction="column"  flex="1" minW={64} spacing={8}>
            <VStack  align="start" spacing={8} >
              <Heading as="h2" size="md">
                2. Check contrast
              </Heading>
              <Grid
                templateColumns="repeat(1fr, 2fr)"
                gap={4}
                alignItems={"center"}
                textAlign={"center"}
              >
                <GridItem w="100%" colStart={1} rowStart={1}>
                  <Center
                    w="80px"
                    h="48px"
                    m="auto"
                    borderRadius={4}
                    bg="#F9FAFB"
                    border="1px"
                    borderColor="gray.300"
                    color={link}
                    fontSize="xs"
                  >
                    Link
                  </Center>
                  {/* <Text   bgColor={link}  color={link}
                    fontSize="xs">new text</Text> */}
                </GridItem>

                <GridItem w="100%" colStart={1} rowStart={2}>
                  <Center
                    w="80px"
                    h="48px"
                    m="auto"
                    borderRadius={4}
                    bg="#252A36"
                    border="1px"
                    color={linkReverse}
                    borderColor="gray.300"
                    fontSize="xs"
                  >
                    Link (Reverse)
                  </Center>
                </GridItem>
                <GridItem w="100%" colStart={2} rowStart={1}>
                  <VStack align="start" gap={0}>
                    <Text
                      fontSize="sm"
                      color={
                        ratioLink > 0 && ratioLink < 4.5 ? "red.500" : "inherit"
                      }
                    >
                      Link on <Text as="b">light</Text> background:
                    </Text>
                    <HStack>
                      <Text
                        fontSize="LG"
                        color={
                          ratioLink > 0 && ratioLink < 4.5
                            ? "red.500"
                            : "inherit"
                        }
                      >
                        {ratioLink}
                      </Text>
                      {ratioLink > 0 &&
                        (ratioLink < 4.5 ? (
                          <Text color="red.500">❌</Text>
                        ) : (
                          <Text color="inherit">✅</Text>
                        ))}
                    </HStack>
                  </VStack>
                </GridItem>

                <GridItem w="100%" colStart={2} rowStart={2}>
                  <VStack align="start" gap={0}>
                    <Text
                      fontSize="sm"
                      color={
                        ratioLinkReverse && ratioLinkReverse < 4.5
                          ? "red.500"
                          : "inherit"
                      }
                    >
                      Link (Reverse) on <Text as="b">dark</Text> background:
                    </Text>
                    <HStack>
                      <Text
                        fontSize="LG"
                        color={
                          ratioLinkReverse && ratioLinkReverse < 4.5
                            ? "red.500"
                            : "inherit"
                        }
                      >
                        {ratioLinkReverse}
                      </Text>
                      {ratioLinkReverse > 0 &&
                        (ratioLinkReverse < 4.5 ? (
                          <Text color="red.500">❌</Text>
                        ) : (
                          <Text color="green.500">✅</Text>
                        ))}
                    </HStack>
                  </VStack>
                </GridItem>
              </Grid>
              {/* Display the contrast */}
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
                    Contrast text
                  </Center>
                </GridItem>
                <GridItem w="100%" colStart={2} rowStart={2}>
                  <Center
                    w="48px"
                    h="48px"
                    m={["auto"]}
                    borderRadius={100}
                    bg={primaryLight}
                    border="1px"
                    borderColor="gray.300"
                    color={primaryLight}
                  />
                </GridItem>
                <GridItem w="100%" colStart={3} rowStart={2}>
                  <Center
                    w="48px"
                    h="48px"
                    m={["auto"]}
                    borderRadius={100}
                    bg={primaryFill}
                    border="1px"
                    borderColor="gray.300"
                    color={primaryFill}
                  />
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
                <GridItem w="100%" colStart={6} rowStart={2}>
                  <Center
                    w="48px"
                    h="48px"
                    m={["auto"]}
                    borderRadius={100}
                    bg={primaryDark}
                    border="1px"
                    borderColor="gray.300"
                    color={primaryDark}
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
                    Contrast text
                  </Center>
                </GridItem>
              </Grid>

              <Heading as="h3" size="sm">
                Status colors
              </Heading>
              <Grid
                fontSize="xs"
                templateColumns="repeat(6, 1fr)"
                gap={2}
                alignItems={"center"}
                textAlign={"center"}
              >
                <GridItem w="100%" colStart={1} rowStart={1}>
                  <Text>Unsent</Text>
                </GridItem>
                <GridItem w="100%" colStart={2} rowStart={1}>
                  <Text>Sent</Text>
                </GridItem>
                <GridItem w="100%" colStart={3} rowStart={1}>
                  <Text>Not sent</Text>
                </GridItem>
                <GridItem w="100%" colStart={4} rowStart={1}>
                  <Text>Signed</Text>
                </GridItem>
                <GridItem w="100%" colStart={5} rowStart={1}>
                  <Text>Approved</Text>
                </GridItem>
                <GridItem w="100%" colStart={6} rowStart={1}>
                  <Text>Executed</Text>
                </GridItem>

                <GridItem w="100%" colStart={1} rowStart={2}>
                  <Center
                    w="24px"
                    h="24px"
                    m={["auto"]}
                    borderRadius={100}
                    bg={statusUnsent}
                    border="1px"
                    borderColor="gray.300"
                    color={statusUnsent}
                  />
                </GridItem>

                <GridItem w="100%" colStart={2} rowStart={2}>
                  <Center
                    w="24px"
                    h="24px"
                    m={["auto"]}
                    borderRadius={100}
                    bg={statusSent}
                    border="1px"
                    borderColor="gray.300"
                    color={statusSent}
                  />
                </GridItem>

                <GridItem w="100%" colStart={3} rowStart={2}>
                  <Center
                    w="24px"
                    h="24px"
                    m={["auto"]}
                    borderRadius={100}
                    bg={statusNotStarted}
                    border="1px"
                    borderColor="gray.300"
                    color={statusNotStarted}
                  />
                </GridItem>

                <GridItem w="100%" colStart={4} rowStart={2}>
                  <Center
                    w="24px"
                    h="24px"
                    m={["auto"]}
                    borderRadius={100}
                    bg={statusSigned}
                    border="1px"
                    borderColor="gray.300"
                    color={statusSigned}
                  />
                </GridItem>

                <GridItem w="100%" colStart={5} rowStart={2}>
                  <Center
                    w="24px"
                    h="24px"
                    m={["auto"]}
                    borderRadius={100}
                    bg={statusApproved}
                    border="1px"
                    borderColor="gray.300"
                    color={statusApproved}
                  />
                </GridItem>

                <GridItem w="100%" colStart={6} rowStart={2}>
                  <Center
                    w="24px"
                    h="24px"
                    m={["auto"]}
                    borderRadius={100}
                    bg={statusExecuted}
                    border="1px"
                    borderColor="gray.300"
                    color={statusExecuted}
                  />
                </GridItem>
              </Grid>

              {/* <VStack
                id="for-testing-only"
                align="start"
                spacing={2}
                bgColor="lightyellow"
                w="100%"
                p={4}
              >
                <Text fontSize="xs">FOR TESTING ONLY</Text>
                <Text fontSize="sm">Primary.main: {primaryMain}</Text>
                <Text fontSize="sm">Secondary: {secondaryMain}</Text>
                <Text fontSize="sm">Primary.light: {primaryLight}</Text>
                <Text fontSize="sm">Primary.fill: {primaryFill}</Text>
                <Text fontSize="sm">Primary.border: {primaryBorder}</Text>
                <Text fontSize="sm">Primary.dark: {primaryDark}</Text>
                <Text fontSize="sm">Link color: {link}</Text>
                <Text fontSize="sm">Link color (reverse): {linkReverse}</Text>
                <Text fontSize="sm">Ratio: {ratioLink}</Text>
                <Text fontSize="sm">Ratio (reverse): {ratioLinkReverse}</Text>
                <Text fontSize="sm">
                  Contrast text (Primary): {contrastTextColorPrimary}
                </Text>
                <Text fontSize="sm">
                  Contrast text (Secondary): {contrastTextColorSecondary}
                </Text>
                <Text fontSize="sm">Status unsent: {statusUnsent}</Text>
              </VStack> */}
            </VStack>
          </Stack>
          <Stack id='step3' direction="column" spacing={6} flex="1" align="start">
            <Stack
              id="json-section"
              direction="row"
              justify={"space-between"}
              h="auto"
              w="100%"
            >
                <Heading as="h2" size="md">
                3. Copy JSON here
              </Heading>
              
              {isCopied ? (
                <Text fontSize="md" color="teal.500">
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
          </Stack>
        </Stack>
      </Stack>
    </ChakraProvider>
  );
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
