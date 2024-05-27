import {
  Button,
  Group,
  Input,
  MantineColor,
  MantineSize,
  Stack,
  Text,
  useMantineTheme
} from "@mantine/core";
import { Dropzone, DropzoneProps } from "@mantine/dropzone";
import { useEffect, useState } from "react";
import {
  CloudUploadIcon,
  DeleteOutline,
  PreviewIcon
} from "../assets/icons/Fluent";

interface IDocumentInputProps
  extends Omit<DropzoneProps, "onChange" | "children" | "onDrop"> {
  error?: React.ReactNode;
  size?: MantineSize;
  value?: File;
  required?: boolean;
  withPreview?: boolean;
  onChange: (files: File | undefined) => void;
  label?: string;
  buttonLabel?: string;
  defaultUrl?: string;
  defaultName?: string;
  description?: string;
  placeholder?: string;
  withDelete?: boolean;
  color?: MantineColor;
  disabled?: boolean;
}

const DocumentInput: React.FC<IDocumentInputProps> = ({
  size = "lg",
  onChange,
  label,
  withDelete = true,
  placeholder,
  description = "",
  value,
  required,
  disabled = false,
  accept,
  maxSize,
  defaultUrl,
  defaultName
}) => {
  if (value?.name === "undefined" || value?.size === 0) {
    value = undefined;
  }
  const [alert, setAlert] = useState("");
  const [dbFile, setDBFile] = useState<{
    defaultUrl?: string;
    defaultName?: string;
  }>({ defaultName, defaultUrl });
  useEffect(() => {
    setDBFile({ defaultName, defaultUrl });
  }, [defaultName, defaultUrl]);
  const theme = useMantineTheme();

  function handleDrop(files: File[]) {
    onChange(files[0]);
    setAlert("");
  }

  function onDelete() {
    setDBFile({ defaultName: "", defaultUrl: "" });
    onChange(undefined);
  }

  function onPreviewClick() {
    if (!value && !!dbFile.defaultUrl) {
      window.open(dbFile.defaultUrl, "_blank");
    }
    if (!value) return;
    const url = URL.createObjectURL(value);
    window.open(url || defaultUrl, "_blank");
  }

  function handleReject(val: any[]) {
    setAlert(val[0]?.errors?.[0].message);
  }

  return (
    <>
      <Input.Wrapper
        size={size}
        error={alert}
        required={required}
        label={label}
        styles={{
          label: {
            color: theme.colors["secondary-text"][5],
            marginBottom: "10px",
            fontSize: "16px",
            fontWeight: 600
          }
        }}
      >
        <Dropzone
          onDrop={handleDrop}
          className={
            `items-center gap-[1px] border-2 border-secondary pt-7 pb-5 rounded-xl border-solid` +
            (disabled == true ? `cursor-context-menu` : ``)
          }
          disabled={disabled}
          accept={accept}
          onReject={handleReject}
          maxSize={maxSize}
        >
          <Stack className="items-center gap-4 cursor-not-allowed">
            <CloudUploadIcon
              size={32}
              color={theme.colors["secondary"][6]}
              className="mt-1"
            />
            <Stack spacing={0} align="center">
              {!!placeholder && (
                <Text className="text-primary-text-500 text-lg tracking-1">
                  {value?.name || dbFile.defaultName || placeholder}
                </Text>
              )}
              {!!description && (
                <Text className="text-secondary-text-500 text-base tracking-2">
                  {description}
                </Text>
              )}
            </Stack>
          </Stack>
        </Dropzone>
        {((!!value && value?.name !== "undefined") || !!dbFile.defaultName) && (
          <Group grow spacing={"md"} className="mt-4">
            <Button
              variant="light"
              className="rounded-full bg-primary-text py-[10px] h-max text-white hover:bg-primary-text"
              onClick={onPreviewClick}
            >
              <PreviewIcon size={14} color={"white"} className="mr-2" />
              Lihat Pratinjau
            </Button>
            {withDelete && (
              <Button
                variant="light"
                className="rounded-full bg-red !important py-[10px] h-max text-white hover:bg-red"
                onClick={onDelete}
                disabled={disabled}
              >
                <DeleteOutline size={16} color={"white"} className="mr-2" />
                Hapus File
              </Button>
            )}
          </Group>
        )}
      </Input.Wrapper>
    </>
  );
};

export default DocumentInput;
