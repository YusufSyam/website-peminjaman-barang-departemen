import { Loader, LoaderProps, useMantineTheme } from "@mantine/core";
import React from 'react';

export interface ILoading {
  props?: LoaderProps,
  color?: "green" | "navy"
}

const Loading : React.FC<ILoading> = ({props, color="green" }) => {
  const theme= useMantineTheme();
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader {...props} size={"xl"} variant="dots" color={color=="green"? theme.colors['primary-green'][5] : theme.colors['primary-navy'][5]} />
    </div>
  );
};

export default Loading;
