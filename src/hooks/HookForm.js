import { useForm } from "react-hook-form";
import React from "react";
import chroma from 'chroma-js';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Spacer,
  VStack,
} from "@chakra-ui/react";

export default function HookForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Accessing the textarea element by its ID
        const textArea = document.getElementById("formValuesTextArea");

        // Get primary color value from the form
        const primaryColor = values.name;

        // Generate color palette using Chroma.js
        const palette = getPalette(primaryColor);

        // If the textarea element exists
        if (textArea) {
          // Construct the result string
          let resultString = `{
            primaryColor: "${primaryColor}",
            testColor: "${values.test}",
            secondaryColor: "${values.name3}",
            colors: {
              ${primaryColor}: {
                50: "${palette[0]}",
                100: "${palette[1]}",
                200: "${palette[2]}",
                300: "${palette[3]}",
                400: "${palette[4]}",
                500: "${primaryColor}", // Use primary color as the 500 shade
                600: "${palette[5]}",
                700: "${palette[6]}",
                800: "${palette[7]}",
                900: "${palette[8]}",
              },
            },
          }`;

          // Set the result string as the textarea value
          textArea.value = resultString;
        }

        resolve();
      }, 1000);
    });
  }

  // Function to generate color palette using Chroma.js
  const getPalette = (color) => {
    const colors = chroma.scale(['white', color, 'black']).colors(10);
    return colors.map(c => chroma(c).hex());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={3} align="start">
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">Primary color</FormLabel>
          <Input
            id="primary-color"
            placeholder="#000000"
            {...register("name", {
              required: "This is required",
              pattern: /[A-Fa-f0-9]/,
              minLength: { value: 6, message: "Minimum length should be 6" },
              maxLength: { value: 6, message: "Maximum length should be 6" },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.test}>
          <FormLabel>Test</FormLabel>
          <Input
            id="test-color"
            name="test"
            placeholder="#000000"
            {...register("test", {
              required: "This is required",
              pattern: /[A-Fa-f0-9]/,
              minLength: { value: 6, message: "Minimum length should be 6" },
              maxLength: { value: 6, message: "Maximum length should be 6" },
            })}
          />
          <FormErrorMessage>
            {errors.test && errors.test.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.name3}>
          <FormLabel htmlFor="name3">Secondary color</FormLabel>
          <Input
            id="secondary-color"
            placeholder="#000000"
            {...register("name3", {
              required: "This is required",
              pattern: /[A-Fa-f0-9]/,
              minLength: { value: 6, message: "Minimum length should be 6" },
              maxLength: { value: 6, message: "Maximum length should be 6" },
            })}
          />
          <FormErrorMessage>
            {errors.name3 && errors.name3.message}
          </FormErrorMessage>
        </FormControl>
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
  );
}
