import { Button, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";
import { UseMutationResult } from "react-query";
import {
  MyPasswordInput,
  MyTextInput
} from "../../components/FormInput.component";
import MyModal from "../../components/MyModal.component";
export interface ILoginModal {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  loginMutation: UseMutationResult<any, unknown, ILoginInput, unknown>;
}

export interface ILoginInput {
  username: string;
  password: string;
}

const LoginModal: React.FC<ILoginModal> = ({
  opened,
  setOpened,
  loginMutation
}) => {
  
  const form = useForm<ILoginInput>();

  const {
    getInputProps,
    errors,
    values,
    reset,
  } = form;

  useEffect(() => {
    if (!opened) {
      reset();
    }
  }, [opened]);

  function handleLogin() {
    loginMutation.mutate(values)
  }
  return (
    <MyModal
      opened={opened}
      setOpened={setOpened}
      title={"Log In"}
      onClose={() => {}}
      minWidth={500}
    >
      <Stack>
        <Text className="text-primary-text-500">
          Silahkan Memasukkan username dan password untuk masuk sebagai admin.
        </Text>
        <MyTextInput
          label="Username"
          size="md"
          placeholder="Masukkan Username"
          {...getInputProps("username")}
          error={errors["username" as keyof ILoginInput]}
        />
        <MyPasswordInput
          label="Password"
          size="md"
          placeholder="Masukkan Password"
          {...getInputProps("password")}
          error={errors["password" as keyof ILoginInput]}
        />

        <Button
          onClick={handleLogin}
          className="bg-green hover:bg-light-green rounded-full duration-100 mt-4"
          disabled={values?.password == null || values?.username == null}
        >
          Log In
        </Button>
      </Stack>
    </MyModal>
  );
};
export default LoginModal;
