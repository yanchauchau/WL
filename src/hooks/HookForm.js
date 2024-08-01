import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import chroma from "chroma-js";

import {
  Box,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Textarea,
  Select,
  Checkbox,
  InputGroup,
  InputLeftAddon,
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
  Flex,
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
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const values = {
      productName: getValues("productName"),
      kustomerId: getValues("kustomerId"),
    };

    if (
      !rebrand &&
      isCheckboxChecked &&
      (values.productName || values.kustomerId)
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
      };

      if (values.productName || values.kustomerId) {
        onOpen(); // Open the modal only if either productName or kustomerId has a value
      } else {
        setRebrand(false); // Directly set rebrand to false if no values exist
      }
    }
  };

  const confirmClear = () => {
    setValue("productName", "");
    setValue("kustomerId", "");
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
        const secondaryMain = values.secondaryyMain;
        const palette = getPalette(primaryMain);
        const productName = values.productName || "";
        const kustomerId = values.kustomerId || "";
        
// // Your existing function to get the background color
// function getBackgroundColor() {
//   // Example background color, replace this with your actual logic
//   return primaryMain;
// }
const primaryBackgroundColor = primaryMain; // Replace with actual primary background color
const secondaryBackgroundColor = secondaryMain; // Use secondaryMain for secondary contrast

// Function to determine the best text color for primary
function getcontrastTextColorPrimary(primaryBackgroundColor) {
  const black = '#000000';
  const white = '#ffffff';

  // Calculate contrast ratios
  const contrastWithBlack = chroma.contrast(primaryBackgroundColor, black);
  const contrastWithWhite = chroma.contrast(primaryBackgroundColor, white);

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
function getcontrastTextColorSecondary() {
  const black = '#000000';
  const white = '#ffffff';

  // Calculate contrast ratios
  const contrastWithBlack = chroma.contrast(secondaryBackgroundColor, black);
  const contrastWithWhite = chroma.contrast(secondaryBackgroundColor, white);

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


const contrastTextColorPrimary = getcontrastTextColorPrimary(primaryBackgroundColor);
const contrastTextColorSecondary = getcontrastTextColorSecondary(secondaryBackgroundColor);





        if (textArea) {
          let resultString = `{
            "font": {
                  "main": "\\\"${values.fontFamily}\\\", \\\"Helvetica\\\", \\\"Arial\\\", sans-serif"
                },
                "logos": {
                  "app": "${values.brandLogo}",
                  "favicon": "",
                  "width_in_email": 220
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
                          "sent": "",
                          "signed": "",
                          "unsent": "",
                          "approved": "",
                          "executed": "",
                          "not_started": "",
                          "partially_signed": ""
                      }
                },
              "product_name": "${productName}",
              "kustomer_brand": "${kustomerId}"
          }`;

          textArea.value = resultString;
        }

        // Calculate contrast between Passthrough background and link(light)
        const contrast = chroma.contrast("#F9FAFB", values.link);

        // Call the callback function with the desired color and contrast
        if (onPaletteGenerated) {
          onPaletteGenerated(palette[2], palette[6], contrast);
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <VStack spacing={6} align="stretch">
          <FormControl isInvalid={errors.brandLogo} isRequired>
            <FormLabel htmlFor="brand-logo">Logo URL</FormLabel>
            <Textarea
              id="brand-logo"
              placeholder="https://app.passthrough.com/passthrough_prod_emails/embark-logo-horz.png"
              resize={"none"}
              {...register("brandLogo", {
                required: "This field is required",
              })}
            />
            <FormErrorMessage>
              {errors.brandLogo && errors.brandLogo.message}
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

          <FormControl>
            <Checkbox isChecked={rebrand} onChange={handleCheckboxChange}>
              Advanced settings
            </Checkbox>
          </FormControl>

          {rebrand ? (
            <>
              <FormControl>
                <FormLabel htmlFor="product-name">Product name</FormLabel>
                <Input id="product-name" {...register("productName", {})} />
              </FormControl>
              <FormControl isInvalid={errors.kustomerId}>
                <FormLabel htmlFor="kustomer-id">Kustomer brand ID</FormLabel>
                <Input
                  id="kustomer-id"
                  placeholder="Demo placeholder"
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
                <FormHelperText>Help text</FormHelperText>
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
