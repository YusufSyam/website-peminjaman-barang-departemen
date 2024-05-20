import { Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { IconInfoOutline } from "../assets/icons/Fluent";

export interface IInformationNotification {
  info: string | JSX.Element;
}

const InformationNotification: React.FC<
  IInformationNotification
> = ({ info }) => {
  const theme = useMantineTheme();

  return (
    <Group className="bg-primary-text/20 py-3 px-4 text-primary-text gap-2 relative rounded-md">
      <>
        <IconInfoOutline
          color={theme.colors["primary-text"][5]}
          className="top-[11px] absolute"
        />
        {typeof info === "string" ? (
          <Text className="tracking-2 pl-8">{info}</Text>
        ) : (
          <Stack className="pl-8">{info}</Stack>
        )}
      </>
    </Group>
  );
};
export default InformationNotification;
