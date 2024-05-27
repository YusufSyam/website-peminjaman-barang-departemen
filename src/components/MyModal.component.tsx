import {
  Modal as MantineModal,
  ModalProps,
  Stack,
  Text
} from "@mantine/core";
import React from "react";

interface IModalProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string | JSX.Element;
  children: JSX.Element;
  // onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCloseFunc?: () => void;
  minWidth?: number;
  subTitle?: string | null;
  additionalPaddingLeft?: number;
  additionalPaddingRight?: number;
}

const MyModal = ({
  opened,
  setOpened,
  title,
  children,
  onCloseFunc = () => {},
  minWidth = 500,
  subTitle,
  additionalPaddingLeft = 0,
  additionalPaddingRight = 0,
  ...props
}: IModalProps & ModalProps) => {

  return (
    <MantineModal
      {...props}
      opened={opened}
      centered
      title={
        <Stack className="gap-0">
          {typeof title === "string" ? (
            <Text className="text-[24px] text-primary-text-500 font-poppins-semibold">
              {title}
            </Text>
          ) : (
            <>{title}</>
          )}
          <Text className="text-secondary-text-500 font-normal text-md">
            {subTitle}
          </Text>
        </Stack>
      }
      padding={28}
      closeButtonProps={{ size: "md" }}
      styles={{
        content: {
          minWidth: `${minWidth}px`,
          borderRadius: "12px",
          paddingLeft: `${additionalPaddingLeft}px`,
          paddingRight: `${additionalPaddingRight}px`,
          // overflow: "hidden !important",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "-webkit-scrollbar": {
            display: "none !important"
          }
        },
        header: {
          // backgroundColor: "#FF0000 !important"
        },
        body:{
          // backgroundColor: "#FF0000 !important",overflow: "hidden !important",
        },
        root:{
        }
      }}
      onClose={() => {
        console.log('Terclose2')
        setOpened(false);
        onCloseFunc();
      }}
    >
      <Stack className="">{children}</Stack>
    </MantineModal>
  );
};

export default MyModal;
