import { useForm } from "react-hook-form";
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
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={3} align='start'>
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

        <FormControl isInvalid={errors.name2}>
          <FormLabel htmlFor="name2">Secondary color</FormLabel>
          <Input
            id="secondary-color"
            placeholder="#000000"
            {...register("name2", {
              required: "This is required",
              pattern: /[A-Fa-f0-9]/,
              minLength: { value: 6, message: "Minimum length should be 6" },
              maxLength: { value: 6, message: "Maximum length should be 6" },
            })}
          />
          <FormErrorMessage>
            {errors.name2 && errors.name2.message}
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
