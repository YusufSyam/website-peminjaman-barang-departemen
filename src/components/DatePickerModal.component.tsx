import { Group, Stack, useMantineTheme } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import "dayjs/locale/id";
import React, { useState } from "react";
import Modal from "./MyModal.component";
import { SmallButton } from "./MyButton";

export interface IDatePickerModal {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  minDate?: Date;
  maxDate?: Date;
  onCancel?: () => void;
  onSubmit?: (newDate: Date) => void;
  defaultValue?: Date;
  subTitle?: string | null
}

const DatePickerModal: React.FC<IDatePickerModal> = ({
  opened,
  setOpened,
  title = "Ganti Tanggal",
  minDate,
  maxDate = new Date(),
  onCancel = () => {},
  onSubmit = () => {},
  defaultValue = new Date(),
  subTitle="Lihat riwayat deteksi pada hari lain"
}) => {
  const theme = useMantineTheme();
  const [value, setValue] = useState<Date | null>(defaultValue);

  return (
    <Modal
      opened={opened}
      setOpened={setOpened}
      title={title}
      subTitle={subTitle}
      onClose={() => {
        setValue(defaultValue);
      }}
    >
      <Stack className="mt-2">
        <DatePicker
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
        />
        <Group className="self-end mt-4 gap-6">
          <SmallButton
            className="!text-blue-500 !border-white "
            onClick={() => {
              setValue(defaultValue);
              setOpened(false);
            }}
          >
            Batal
          </SmallButton>
          <SmallButton
            className="!bg-blue-500 !rounded-md !border-transparent !text-white !hover:bg-blue-500"
            disabled={value == null}
            onClick={() => {
              onSubmit(value!);
              setOpened(false);
            }}
          >
            Pilih
          </SmallButton>
        </Group>
      </Stack>
    </Modal>
  );
};
export default DatePickerModal;
