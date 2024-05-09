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
import { DatePickerInputProps, DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import { IconCalendarLtrOutline, IconSearchOutlined } from "../assets/icons/Fluent";

export const getDefaultStyle = (
  isFocus: boolean,
  isError: boolean
): Styles<TextInputStylesNames> | undefined => {
  const theme = useMantineTheme();
  const color = isError
    ? theme.colors.error[5]
    : isFocus
    ? theme.colors["primary-text"][5]
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


export const getDefaultStyleSearch = (
  isFocus: boolean,
  isError: boolean
):
  | Styles<TextInputStylesNames | NumberInputStylesNames | SelectStylesNames>
  | undefined => {
  const theme = useMantineTheme();
  const color = isError
    ? theme.colors.error[5]
    : isFocus
    ? theme.colors["primary-text"][5]
    : theme.colors["secondary-text"][5];
  return {
    input: {
      borderWidth: "0px",
      borderRadius: "9999px",
      padding: "22px",
      color,
      // fontWeight: 400,
      fontFamily: "poppins",
      letterSpacing: "0.01em",
      backgroundColor: theme.colors['secondary'][5],
      fontSize: "16px"
    },
    label: {
      fontWeight: 800,
      color
    },
    icon:{
      paddingLeft: "6px"
    }
  };
};

export const getDefaultStyleDatePickerInput = (
  isFocus: boolean,
  isError: boolean
):
  | Styles<TextInputStylesNames | NumberInputStylesNames | SelectStylesNames>
  | undefined => {
  const theme = useMantineTheme();
  const color = isError
    ? theme.colors.error[5]
    : isFocus
    ? theme.colors["primary-text"][5]
    : theme.colors["secondary-text"][5];
  return {
    input: {
      ":focus": {
        border: "2px solid",
        color
      },
      // borderWidth: "2px",
      borderRadius: "9999px",
      color,
      fontWeight: 600,
      letterSpacing: "0.01em",
      ":disabled": {
        color
      }
    },
    label: {
      fontWeight: 600,
      color
    },
    icon: {
      paddingLeft: "6px"
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

{
  /* <DatePicker
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
        /> */
}

export const MyDatePickerInput = ({
  onFocus,
  onBlur,
  ...props
}: DatePickerInputProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const theme = useMantineTheme();
  return (
    <DatePickerInput
      size="md"
      styles={{ ...getDefaultStyleDatePickerInput(isFocus, !!props.error) }}
      icon={<IconCalendarLtrOutline color={theme.colors["red"][5]} />}
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


export const MySearchInput = ({
  onFocus,
  onBlur,
  ...props
}: TextInputProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const theme = useMantineTheme();

  return (
    <>
      <MantineTextInput
        styles={{ ...getDefaultStyleSearch(isFocus, !!props.error) }}
        icon={
          <IconSearchOutlined size={22} color={theme.colors["secondary-text"][9]} />
        }
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