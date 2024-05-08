import {
  TextInput as MantineTextInput,
  TextInputProps,
  TextInputStylesNames,
  SelectProps,
  Styles,
  NumberInput as MantineNumberInput,
  NumberInputProps,
  NumberInputStylesNames,
  useMantineTheme,
  SelectStylesNames,
  Select,
  Radio,
  RadioGroupProps,
  RadioProps,
  Textarea as MantineTextArea,
  TextareaProps,
  PasswordInputProps,
  PasswordInput
} from "@mantine/core";
import { useState } from "react";

export const getDefaultStyle = (
  isFocus: boolean,
  isError: boolean
): Styles<TextInputStylesNames> | undefined => {
  const theme = useMantineTheme();
  const color = isError
    ? theme.colors.error[5]
    : isFocus
    ? theme.colors['primary-text'][5]
    : theme.colors["secondary-text"][5];
  return {
    input: {
      ":focus": {
        border: "2px solid",
        color
      },
      borderWidth: "2px",
      borderRadius: theme.radius.md,
      color,
      marginTop: "8px"
    },
    label: {
      fontWeight: 600,
      color
    },
    error: {
      marginTop: 8
    }
  };
};

export const MyTextInput = ({ onFocus, onBlur, ...props }: TextInputProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <>
      <MantineTextInput
        className="text-primary-text"
        size="lg"
        styles={{ ...getDefaultStyle(isFocus, !!props.error) }}
        onFocus={(e) => {
          setIsFocus(true);
          if (!!onFocus) onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocus(false);
          if (!!onBlur) onBlur(e);
        }}
        {...props}

      />
    </>
  );
};


export const MyNumberInput = ({
  onFocus,
  onBlur,
  ...props
}: NumberInputProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <MantineNumberInput
      size="lg"
      // hideControls
      styles={{ ...getDefaultStyle(isFocus, !!props.error) }}
      onFocus={(e) => {
        setIsFocus(true);
        if (!!onFocus) onFocus(e);
      }}
      onBlur={(e) => {
        setIsFocus(false);
        if (!!onBlur) onBlur(e);
      }}
      {...props}
    />
  );
};

{/* <DatePicker
          allowDeselect
          value={value}
          minDate={minDate}
          maxDate={maxDate}
          size="md"
          locale="id"
          onChange={(v: Date) => {
            console.log("Ini v: ", v);
            setValue(v);
          }}
          styles={{
            calendar: {
              margin: "auto"
            }
          }}
          getDayProps={(date) => {
            if (value != null && date.getTime() == value.getTime()) {
              return {
                bg: `${theme.colors["red"][5]} !important`
              };
            }

            return {};
          }}
          yearLabelFormat="[Tahun] YYYY"
        /> */}