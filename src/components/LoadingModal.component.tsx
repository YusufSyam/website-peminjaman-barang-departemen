import {
  Button,
  Group,
  useMantineTheme,
  Text,
  ButtonProps,
  Stack
} from "@mantine/core";
import React from "react";
import Modal from "./MyModal.component";
import Loading from "./Loading.component";

interface ILoadingModalProps {
  opened: boolean;
  title?: string;
  description?: string;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  noButtonLabel?: string;
  yesButtonLabel?: string;
  canBeClosed?: boolean;
  setOpened?: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingModal = ({
  opened,
  title = "Dalam Proses",
  description = "Dalam proses penyelesaian, silahkan tunggu..",
  canBeClosed = false,
  setOpened=()=>{}
}: ILoadingModalProps) => {
  const theme = useMantineTheme();

  return (
    <Modal
      opened={opened}
      setOpened={setOpened}
      title={"Dalam Proses"}
      onClose={() => {}}
    >
      <Stack>
        <div className={`py-10`}>
          <Loading color="red" />
        </div>
        <Text className="text-lg text-secondary-text-500">{description}</Text>
      </Stack>
    </Modal>
  );
};

export default LoadingModal;
