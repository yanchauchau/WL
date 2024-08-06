import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import chroma from "chroma-js";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Alert,
  AlertIcon,
  Box,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Divider,
  Textarea,
  Select,
  Checkbox,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  FormHelperText,
  Button,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export default function HookForm({ onPaletteGenerated }) {
  const [rebrand, setRebrand] = useState(false); // rebrand boolean for checkbox
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // Track initial checkbox state
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm({
    defaultValues: {
      brandLogo:
        "https://app.passthrough.com/passthrough_prod_emails/embark-logo-horz.png",
      logoWidth: "160",
      primaryMain: "FF9800",
      secondaryMain: "F7C164",
      link: "3A72F2",
      linkDark: "5CB06D",
      // statusUnsent: "ccd0d7",
      // statusSent: "FF9800",
      // statusNotStarted: "F7C164",
      // statusSigned: "9ABAEF",
      // statusApproved: "3A72F2",
      // statusExecuted: "5CB06D",
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const processFormValues = (values) => {
    const statusFields = [
      "statusUnsent",
      "statusSent",
      "statusNotStarted",
      "statusSigned",
      "statusApproved",
      "statusExecuted",
    ];

    statusFields.forEach((field) => {
      if (values[field]) {
        values[field] = `#${values[field]}`;
      }
    });

    return values;
  };

  useEffect(() => {
    const values = {
      productName: getValues("productName"),
      kustomerId: getValues("kustomerId"),
      favicon: getValues("favicon"),
    };

    if (
      !rebrand &&
      isCheckboxChecked &&
      (values.productName || values.kustomerId || values.favicon)
    ) {
      onOpen(); // Open the modal if rebrand is false, checkbox was checked, and either productName or kustomerId contains a value
    }
  }, [rebrand, isCheckboxChecked, onOpen, getValues]);

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setRebrand(true);
    } else {
      const values = {
        productName: getValues("productName"),
        kustomerId: getValues("kustomerId"),
        favicon: getValues("favicon"),
      };

      if (values.productName || values.kustomerId || values.favicon) {
        onOpen(); // Open the modal only if either productName or kustomerId has a value
      } else {
        setRebrand(false); // Directly set rebrand to false if no values exist
      }
    }
  };

  const confirmClear = () => {
    setValue("productName", "");
    setValue("kustomerId", "");
    setValue("favicon", "");
    setRebrand(false); // Confirm and set rebrand to false
    onClose();
  };

  const cancelClear = () => {
    // Revert checkbox state to checked
    setIsCheckboxChecked(true);
    onClose();
  };

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const textArea = document.getElementById("formValuesTextArea");
        const primaryMain = values.primaryMain;
        // const secondaryMain = values.secondaryyMain;
        const palette = getPalette(primaryMain);
        const productName = values.productName || "";
        const kustomerId = values.kustomerId || "";
        const favicon = values.favicon || "";

        const primaryBackgroundColor = primaryMain; // Replace with actual primary background color
        const secondaryBackgroundColor = values.secondaryMain; // Replace with actual secondary background color

        // Function to determine the best text color for primary
        function getcontrastTextColorPrimary(primaryBackgroundColor) {
          const black = "#000000";
          const white = "#ffffff";

          // Calculate contrast ratios
          const contrastWithBlack = chroma.contrast(
            primaryBackgroundColor,
            black
          );
          const contrastWithWhite = chroma.contrast(
            primaryBackgroundColor,
            white
          );

          // Check if either contrast ratio meets the 4.5:1 standard
          if (contrastWithBlack >= 4.5 && contrastWithWhite >= 4.5) {
            // Both colors pass, choose the one with higher contrast
            return contrastWithBlack > contrastWithWhite ? black : white;
          } else if (contrastWithBlack >= 4.5) {
            // Only black passes
            return black;
          } else if (contrastWithWhite >= 4.5) {
            // Only white passes
            return white;
          } else {
            // Neither color passes, choose the one with the highest contrast
            return contrastWithBlack > contrastWithWhite ? black : white;
          }
        }

        // Function to determine the best text color for secondary
        function getcontrastTextColorSecondary(secondaryBackgroundColor) {
          const black = "#000000";
          const white = "#ffffff";

          // Calculate contrast ratios
          const contrastWithBlack = chroma.contrast(
            secondaryBackgroundColor,
            black
          );
          const contrastWithWhite = chroma.contrast(
            secondaryBackgroundColor,
            white
          );

          // Check if either contrast ratio meets the 4.5:1 standard
          if (contrastWithBlack >= 4.5 && contrastWithWhite >= 4.5) {
            // Both colors pass, choose the one with higher contrast
            return contrastWithBlack > contrastWithWhite ? black : white;
          } else if (contrastWithBlack >= 4.5) {
            // Only black passes
            return black;
          } else if (contrastWithWhite >= 4.5) {
            // Only white passes
            return white;
          } else {
            // Neither color passes, choose the one with the highest contrast
            return contrastWithBlack > contrastWithWhite ? black : white;
          }
        }

        // Process the values to add pound signs where needed
        const processedValues = processFormValues(values);

        const contrastTextColorPrimary = getcontrastTextColorPrimary(
          primaryBackgroundColor
        );
        const contrastTextColorSecondary = getcontrastTextColorSecondary(
          secondaryBackgroundColor
        );

        if (textArea) {
          let resultString = `{
            "font": {
                  "main": "\\\"${values.fontFamily}\\\", \\\"Helvetica\\\", \\\"Arial\\\", sans-serif"
                },  
                "logos": {
                  "app": "${values.brandLogo}",
                  "favicon": "${favicon}",
                  "width_in_email": "${values.logoWidth}"
},
                "colors": {
                  "link": "#${values.link}",
                      "primary": {
                          "dark": "${palette[6]}",
                          "fill": "${palette[1]}",
                          "main": "#${primaryMain}",
                          "light": "${palette[0]}",
                          "border": "${palette[3]}",
                          "contrast_text": "${contrastTextColorPrimary}"
                      },
                      "secondary": {
                          "main": "#${values.secondaryMain}",
                          "contrast_text": "${contrastTextColorSecondary}"
                      },
                      "dark_mode_link": "#${values.linkDark}",
                      "investor_closing_status": {
                         "unsent": "${values.statusUnsent}",
                          "sent": "${values.statusSent}",
                          "not_started": "${values.statusNotStarted}",
                          "signed": "${values.statusSigned}",
                          "approved": "${values.statusApproved}",
                          "executed": "${values.statusExecuted}"
                      }
                },
              "product_name": "${productName}",
              "kustomer_brand": "${kustomerId}"
          }`;

          textArea.value = resultString;
        }

        // Calculate contrast between Passthrough background and link(light)
        const contrastLinkBg = chroma.contrast("#F9FAFB", values.link);
        const contrastDarkLinkBg = chroma.contrast("#252A36", values.linkDark);

        // Call the callback function with the desired color and contrast
        if (onPaletteGenerated) {
          onPaletteGenerated(values.link, values.linkDark, contrastLinkBg, contrastDarkLinkBg);
        }

        resolve();
      }, 1000);
    });
  }

  const getPalette = (color) => {
    const colors = chroma.scale(["white", color, "black"]).colors(10);
    return colors.map((c) => chroma(c).hex());
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate >
        <VStack spacing={6} align="stretch" >
          <Divider />
          <Alert status="info" fontSize="sm">
            <AlertIcon />
            test
          </Alert>
          <FormControl isInvalid={errors.brandLogo} isRequired >
            <FormLabel htmlFor="brand-logo">Logo URL</FormLabel>
            <Textarea
              id="brand-logo"
              resize={"none"}
              placeholder="https://app.passthrough.com/passthrough_prod_emails/..."
              {...register("brandLogo", {
                required: "This field is required",
              })}
            />
            <FormHelperText>
              Must be uploaded to prod.<br></br> URL should start with{" "}
              <i>app.passthrough.com/</i>
            </FormHelperText>
            <FormErrorMessage>
              {errors.brandLogo && errors.brandLogo.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.logoWidth} isRequired>
            <FormLabel>Logo width</FormLabel>
            <InputGroup>
              <Input
                id="logoWidth"
                name="logoWidth"
                {...register("logoWidth")}
              /> <InputRightAddon>px</InputRightAddon>
            </InputGroup>
            <FormErrorMessage>
              {errors.logoWidth && errors.logoWidth.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.primaryMain} isRequired>
            <FormLabel htmlFor="primaryMain">Primary color</FormLabel>
            <InputGroup>
              <InputLeftAddon>#</InputLeftAddon>
              <Input
                id="primary-color"
                placeholder="000000"
                {...register("primaryMain", {
                  required: "This field is required",
                  pattern: /^[a-zA-Z0-9]*$/,
                  minLength: {
                    value: 6,
                    message: "Enter a valid 6-digit hex code",
                  },
                  maxLength: {
                    value: 6,
                    message: "Enter a valid 6-digit hex code",
                  },
                })}
              />{" "}
            </InputGroup>
            <FormErrorMessage>
              {errors.primaryMain && errors.primaryMain.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.secondaryMain} isRequired>
            <FormLabel htmlFor="secondaryMain">Secondary color</FormLabel>
            <InputGroup>
              <InputLeftAddon>#</InputLeftAddon>
              <Input
                id="secondary-color"
                placeholder="000000"
                {...register("secondaryMain", {
                  required: "This field is required",
                  pattern: /^[a-zA-Z0-9]*$/,
                  minLength: {
                    value: 6,
                    message: "Enter a valid 6-digit hex code",
                  },
                  maxLength: {
                    value: 6,
                    message: "Enter a valid 6-digit hex code",
                  },
                })}
              />
            </InputGroup>
            <FormHelperText>Help text</FormHelperText>
            <FormErrorMessage>
              {errors.secondaryMain && errors.secondaryMain.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.link} isRequired>
            <FormLabel>Link</FormLabel>
            <InputGroup>
              <InputLeftAddon>#</InputLeftAddon>
              <Input
                id="link-color"
                name="link"
                placeholder="000000"
                {...register("link", {
                  required: "This field is required",
                  pattern: /^[a-zA-Z0-9]*$/,
                  minLength: {
                    value: 6,
                    message: "Enter a valid 6-digit hex code",
                  },
                  maxLength: {
                    value: 6,
                    message: "Enter a valid 6-digit hex code",
                  },
                })}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.link && errors.link.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.linkDark} isRequired>
            <FormLabel>Link (dark mode)</FormLabel>
            <InputGroup>
              <InputLeftAddon>#</InputLeftAddon>
              <Input
                id="linkDark-color"
                name="linkDark"
                placeholder="000000"
                {...register("linkDark", {
                  required: "This field is required",
                  pattern: /^[a-zA-Z0-9]*$/,
                  minLength: {
                    value: 6,
                    message: "Enter a valid 6-digit hex code",
                  },
                  maxLength: {
                    value: 6,
                    message: "Enter a valid 6-digit hex code",
                  },
                })}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.linkDark && errors.linkDark.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.fontFamily} isRequired>
            <FormLabel>Font family</FormLabel>
            <Select id="font-family" {...register("fontFamily", {})}>
              <option value="Centra No1" selected>
                Centra No.1
              </option>
              <option value="Inter">Inter</option>
              <option value="Work sans">Work sans</option>
              <option value="Montserrat">Montserrat</option>
            </Select>
            <FormErrorMessage>
              {errors.fontFamily && errors.fontFamily.message}
            </FormErrorMessage>
          </FormControl>

          <Accordion defaultIndex={[]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Status colors
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack spacing={6} align="stretch">
                  <FormControl isInvalid={errors.statusUnsent}>
                    <FormLabel>Unsent</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>#</InputLeftAddon>
                      <Input
                        id="statusUnsent-color"
                        name="statusUnsent"
                        placeholder="000000"
                        {...register("statusUnsent", {
                          pattern: /^[a-zA-Z0-9]*$/,
                          minLength: {
                            value: 6,
                            message: "Enter a valid 6-digit hex code",
                          },
                          maxLength: {
                            value: 6,
                            message: "Enter a valid 6-digit hex code",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.statusUnsent && errors.statusUnsent.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.statusSent}>
                    <FormLabel>Sent</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>#</InputLeftAddon>
                      <Input
                        id="statusSent-color"
                        name="statusSent"
                        placeholder="000000"
                        {...register("statusSent", {
                          pattern: /^[a-zA-Z0-9]*$/,
                          minLength: {
                            value: 6,
                            message: "Enter a valid 6-digit hex code",
                          },
                          maxLength: {
                            value: 6,
                            message: "Enter a valid 6-digit hex code",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.statusSent && errors.statusSent.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.statusNotStarted}>
                    <FormLabel>Not Started</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>#</InputLeftAddon>
                      <Input
                        id="statusNotStarted-color"
                        name="statusNotStarted"
                        placeholder="000000"
                        {...register("statusNotStarted", {
                          pattern: /^[a-zA-Z0-9]*$/,
                          minLength: {
                            value: 6,
                            message: "Enter a valid 6-digit hex code",
                          },
                          maxLength: {
                            value: 6,
                            message: "Enter a valid 6-digit hex code",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.statusNotStarted &&
                        errors.statusNotStarted.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.statusSigned}>
                    <FormLabel>Signed</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>#</InputLeftAddon>
                      <Input
                        id="statusSigned-color"
                        name="statusSigned"
                        placeholder="000000"
                        {...register("statusSigned", {
                          pattern: /^[a-zA-Z0-9]*$/,
                          minLength: {
                            value: 6,
                            message: "Enter a valid 6-digit hex code",
                          },
                          maxLength: {
                            value: 6,
                            message: "Enter a valid 6-digit hex code",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.statusSigned && errors.statusSigned.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.statusApproved}>
                    <FormLabel>Approved</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>#</InputLeftAddon>
                      <Input
                        id="statusApproved-color"
                        name="statusApproved"
                        placeholder="000000"
                        {...register("statusApproved", {
                          pattern: /^[a-zA-Z0-9]*$/,
                          minLength: {
                            value: 6,
                            message: "Enter a valid 6-digit hex code",
                          },
                          maxLength: {
                            value: 6,
                            message: "Enter a valid 6-digit hex code",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.statusApproved && errors.statusApproved.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.statusExecuted}>
                    <FormLabel>Executed</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>#</InputLeftAddon>
                      <Input
                        id="statusExecuted-color"
                        name="statusExecuted"
                        placeholder="000000"
                        {...register("statusExecuted", {
                          pattern: /^[a-zA-Z0-9]*$/,
                          minLength: {
                            value: 6,
                            message: "Enter a valid 6-digit hex code",
                          },
                          maxLength: {
                            value: 6,
                            message: "Enter a valid 6-digit hex code",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.statusExecuted && errors.statusExecuted.message}
                    </FormErrorMessage>
                  </FormControl>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <FormControl>
            <Checkbox isChecked={rebrand} onChange={handleCheckboxChange}>
              Advanced settings
            </Checkbox>
          </FormControl>

          {rebrand ? (
            <>
              <FormControl>
                <FormLabel htmlFor="product-name">Product name</FormLabel>
                <Input id="product-name" placeholder="Passthrough" {...register("productName", {

                })} />
              </FormControl>

              <FormControl isInvalid={errors.favicon} >
                <FormLabel htmlFor="favicon">Favicon URL</FormLabel>
                <Textarea
                  id="favicon"
                  resize={"none"}
                  placeholder="https://app.passthrough.com/passthrough_prod_emails/..."
                  {...register("favicon", {
                  })}
                />
                <FormHelperText>
                  Must be uploaded to prod.<br></br> URL should start with{" "}
                  <i>app.passthrough.com/</i>
                </FormHelperText>
                <FormErrorMessage>
                  {errors.favicon && errors.favicon.message}
                </FormErrorMessage>
              </FormControl>


              <FormControl isInvalid={errors.kustomerId}>
                <FormLabel htmlFor="kustomer-id">Kustomer brand ID</FormLabel>
                <Input
                  id="kustomer-id"
                  {...register("kustomerId", {
                    minLength: {
                      value: 24,
                      message: "Enter a 24-digit brand ID",
                    },
                    maxLength: {
                      value: 24,
                      message: "Enter a 24-digit brand ID",
                    },
                  })}
                />
                <FormHelperText>This ID controls the Kustomer widget in Passthrough. <br></br>It must be created in Kustomer first.</FormHelperText>
                <FormErrorMessage>
                  {errors.kustomerId && errors.kustomerId.message}
                </FormErrorMessage>
              </FormControl>
            </>
          ) : (
            <></>
          )}

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </VStack>
      </form>

      <Modal
        isCentered
        isOpen={isOpen}
        onClose={cancelClear}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove advanced settings?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>You are about to clear all advanced settings.</ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={cancelClear}>
              No
            </Button>
            <Button colorScheme="teal" mr={3} onClick={confirmClear}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
