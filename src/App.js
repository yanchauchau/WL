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
  const [link, setLink] = useState(""); // State for link color
  const [linkReverse, setLinkReverse] = useState(""); // State for link reverse color
  const [primaryDark, setPrimaryDark] = useState(""); // State for primary.dark
  const [RatioLink, setRatioLink] = useState(0); // State for contrast
  const [RatioLinkReverse, setRatioLinkReverse] = useState(0); // State for contrast
  const [contrastTextColorPrimary, setContrastTextColorPrimary] = useState(0); // State for Contrast text for primary color
  const [contrastTextColorSecondary, setContrastTextColorSecondary] = useState(0); // State for Contrast text for secondary color
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
    RatioLink,
    RatioLinkReverse,
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
    setLink(link);
    setLinkReverse(linkReverse);
    setRatioLink(RatioLink);
    setRatioLinkReverse(RatioLinkReverse);
    setContrastTextColorPrimary(contrastTextColorPrimary);
    setContrastTextColorSecondary(contrastTextColorSecondary);
    setStatusUnsent(statusUnsent);
    setStatusSent(statusSent);
    setStatusNotStarted(statusNotStarted);
    setStatusSigned(statusSigned);
    setStatusApproved(statusApproved);
    setStatusExecuted(statusExecuted);
  };

  return (
    <ChakraProvider theme={theme}>
      <Stack direction={"column"} gap={0}>
        <Stack
          direction={"row"}
          minH={4}
          minW={4}
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
          <Stack direction="column" gap={8} flex="1" align="start" >
            <Heading as="h2" size="md">
              1. ✍️ Fill out this form
            </Heading>
            <HookForm onPaletteGenerated={handlePaletteGenerated} />
          </Stack>
          <Stack direction="column" flex="1" gap={12} minW={64}>
            <VStack spacing={4} align="start">
              <Heading as="h2" size="md">
                2. Check contrast
              </Heading>

              {/* Display the contrast */}
              <VStack align="start" gap={0}>
                <Text
                  fontSize="sm"
                  color={
                    RatioLink > 0 && RatioLink < 4.5
                      ? "red.500"
                      : "inherit"
                  }
                >
                  Link color on <Text as='b'>light</Text> background:
                </Text>
                <HStack>
                  <Text
                    fontSize="LG"
                    color={
                      contrastTextColorPrimary > 0 && contrastTextColorPrimary < 4.5
                        ? "red.500"
                        : "inherit"
                    }
                  >
                    {contrastTextColorPrimary}
                  </Text>
                  {contrastTextColorPrimary > 0 &&
                    (contrastTextColorPrimary < 4.5 ? (
                      <Text color="red.500">❌</Text>
                    ) : (
                      <Text color="inherit">✅</Text>
                    ))}
                </HStack>
              </VStack>

              <VStack align="start" gap={0}>
                <Text
                  fontSize="sm"
                  color={
                    contrastTextColorSecondary && contrastTextColorSecondary < 4.5
                      ? "red.500"
                      : "inherit"
                  }
                >
                  Link color on <Text as='b'>dark</Text> background:
                </Text>
                <HStack>
                  <Text
                    fontSize="LG"
                    color={
                      contrastTextColorSecondary && contrastTextColorSecondary < 4.5
                        ? "red.500"
                        : "inherit"
                    }
                  >
                    {contrastTextColorSecondary}
                  </Text>
                  {contrastTextColorSecondary > 0 &&
                    (contrastTextColorSecondary < 4.5 ? (
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

              <Heading as="h3" size="sm" bgColor='lightyellow'>Status colors</Heading>
              <Grid bgColor='lightyellow'
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

              <VStack align="start" spacing={2} bgColor="lightyellow" w='100%' p={4}>
                Display the palette color */}
                <Text fontSize="xs" >FOR TESTING ONLY</Text>
                <Text fontSize="sm">Primary.main: {primaryMain}</Text>
                <Text fontSize="sm">Secondary: {secondaryMain}</Text>
                <Text fontSize="sm">Primary.light: {primaryLight}</Text>
                <Text fontSize="sm">Primary.fill: {primaryFill}</Text>
                <Text fontSize="sm">Primary.border: {primaryBorder}</Text>
                <Text fontSize="sm">Primary.dark: {primaryDark}</Text>
                <Text fontSize="sm">Link color: {link}</Text>
                <Text fontSize="sm">Link color (dark): {RatioLinkReverse}</Text>
                <Text fontSize="sm">Ratio: {RatioLink}</Text>
                <Text fontSize="sm">Ratio (reverse: {RatioLinkReverse}</Text>
                <Text fontSize="sm">Contrast text using "contrastTextColorPrimary": {contrastTextColorPrimary}</Text>
                <Text fontSize="sm">Contrast text: {contrastTextColorSecondary}</Text>
                <Text fontSize="sm">Status unsent: {statusUnsent}</Text>
              </VStack> 
            </VStack>
            <VStack spacing={4} align="space-between" h="100%">
              <Stack
              id="json-section"
                direction="row"
                gap={8}
                justify={"space-between"}
                h="auto"
            
              >
                <Heading as="h2" fontSize='lg' w="100%">
                  3. Copy JSON here
                </Heading>
                {isCopied ? (
                  <Text fontSize="lg" color="teal.500">
                    Copied!
                  </Text>
                ) : (
                  <Button
                    leftIcon={<FaRegCopy />}
                    colorScheme="teal"
                    size="md"
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
