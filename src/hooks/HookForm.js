import { useForm } from "react-hook-form";
import React from "react";
import chroma from "chroma-js";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";

export default function HookForm({ onPaletteGenerated }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const textArea = document.getElementById("formValuesTextArea");
        const primaryColor = values.name;
        const palette = getPalette(primaryColor);

        if (textArea) {
          let resultString = `{
            primaryColor: "${primaryColor}",
            linkColor: "${values.link}",
            secondaryColor: "${values.name3}",
            "colors": {
             "primary": {
                light: "${palette[0]}",
                fill: "${palette[1]}",
                200: "${palette[2]}",
                border: "${palette[3]}",
                400: "${palette[4]}",
                main: "${primaryColor}", // Use primary color as the 500 shade
                dark: "${palette[5]}",
                700: "${palette[6]}",
                800: "${palette[7]}",
                900: "${palette[8]}",
              },
            },
          }`;
          textArea.value = resultString;
        }

        // Calculate contrast between palette[2] and palette[8]
        const contrast = chroma.contrast("#F9FAFB", values.link);

        // Call the callback function with the desired color and contrast
        if (onPaletteGenerated) {
          onPaletteGenerated(palette[2], contrast);
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
        <FormControl isInvalid={errors.link}>
          <FormLabel>Link</FormLabel>
          <Input
            id="link-color"
            name="link"
            placeholder="#000000"
            {...register("link", {
              required: "This is required",
              pattern: /[A-Fa-f0-9]/,
              minLength: { value: 6, message: "Minimum length should be 6" },
              maxLength: { value: 6, message: "Maximum length should be 6" },
            })}
          />
          <FormErrorMessage>
            {errors.link && errors.link.message}
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
