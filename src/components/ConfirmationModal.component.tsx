import {
  Group,
  ModalProps,
  Stack,
  Text,
  useMantineTheme
} from "@mantine/core";
import React from "react";
import { IconInformationCircleFilled } from "../assets/icons/Fluent";
import Modal from "./MyModal.component";
import { SmallButton } from "./MyButton";

interface IConfirmationModal {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: string | JSX.Element;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCloseFunc?: () => void;
  noButtonLabel?: string;
  yesButtonLabel?: string;
  minWidth?: number;
  disableNoButton?: boolean;
  disableYesButton?: boolean;
  subTitle?: string;
  leftTitleIcon?: JSX.Element;
}

const ConfirmationModal = ({
  opened,
  setOpened,
  title,
  children = "Data yang telah dihapus tidak dapat dikembalikan.",
  onSubmit,
  noButtonLabel = "Batal",
  yesButtonLabel = "Iya",
  minWidth = 600,
  onCloseFunc = () => {},
  disableNoButton = false,
  disableYesButton = false,
  subTitle = "",
  leftTitleIcon,
  ...props
}: IConfirmationModal & ModalProps) => {
  const theme = useMantineTheme();

  return (
    <Modal
      {...props}
      opened={opened}
      setOpened={setOpened}
      onCloseFunc={onCloseFunc}
      minWidth={minWidth}
      subTitle={subTitle}
      title={
        <Group className="gap-3">
          {leftTitleIcon == null ? (
            <IconInformationCircleFilled
              color={theme.colors["blue"][5]}
              size={40}
              className=""
            />
          ) : (
            <>{leftTitleIcon}</>
          )}
          <Text className="text-[24px] text-primary-text-500 font-poppins-semibold">
            {title}
          </Text>
        </Group>
      }
    >
      <Stack className="relative ">
        {typeof children === "string" ? (
          <Text className="text-lg text-secondary-text-500 ml-[48px]">
            {children}
          </Text>
        ) : (
          <>{children}</>
        )}
        <Group className="self-end mt-4 gap-6">
          <SmallButton
            className="!text-blue-500 !border-white "
            disabled={disableNoButton}
            onClick={() => setOpened(false)}
          >
            {noButtonLabel}
          </SmallButton>
          <SmallButton
            className="!bg-blue-500 !rounded-md !border-transparent !text-white !hover:bg-blue-500"
            // disabled={value == null}
            disabled={disableYesButton}
            onClick={onSubmit}
          >
            {yesButtonLabel}
          </SmallButton>
        </Group>
      </Stack>
    </Modal>
  );
};

export default ConfirmationModal;
