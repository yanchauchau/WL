import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
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
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="primary-color">Primary color</FormLabel>
        <Input
          id="primary-color"
          placeholder="#000000"
          {...register("name", {
            required: "This is required",
            pattern: /[A-Fa-f0-9]/,
        
            minLength: { value: 6, message: "Minimum length should be 6" },
          })}
        />
        <FormLabel htmlFor="name">Secondary color</FormLabel>
          <Input
          id="Secondary color"
          placeholder="#000000"
          {...register("name", {
            required: "This is required",
            pattern: /[A-Fa-f0-9]/,
            minLength: { value: 6, message: "Minimum length should be 6" },
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}
