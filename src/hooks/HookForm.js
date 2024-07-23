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
          let resultString = 
          `{
            "font": {
                  "main": "\"Inter\", \"Helvetica\", \"Arial\", sans-serif"
                },
                "logos": {
                  "app": "https://app.passthrough.com/passthrough_prod_emails/embark-logo-horz.png",
                  "favicon": "https://app.passthrough.com/passthrough_prod_emails/embark-favicon.png",
                  "width_in_email": 220
                },
                "colors": {
                  "link": "${values.link}",
                      "primary": {
                          "dark": "${palette[6]}",
                          "fill": "${palette[1]}",
                          "main": "#${primaryColor}",
                          "light": "${palette[0]}",
                          "border": "${palette[3]}",
                          "contrast_text": "#000000"
                      },
                      "secondary": {
                          "main": "${values.name3}",
                          "contrast_text": "#000000"
                      },
                      "dark_mode_link": "#82ceea",
                      "investor_closing_status": {
                          "sent": "#f7941d",
                          "signed": "#82ceea",
                          "unsent": "",
                          "approved": "#005b90",
                          "executed": "#79ad3d",
                          "not_started": "#fbd913",
                          "partially_signed": "#7dcdcb"
                      }
                },
                "product_name": "Goodwin Embark",
                "kustomer_brand": "665a1fc74b597b6af45e7647"
          }`;

          textArea.value = resultString;
        }

        // Calculate contrast between Passthrough background and link(light)
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
