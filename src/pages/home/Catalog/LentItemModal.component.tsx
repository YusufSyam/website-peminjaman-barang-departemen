import { Button, Group, Stack, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect } from "react";
import { UseMutationResult } from "react-query";
import FotoKTM from "../../../assets/images/ktm.png";
import {
  MyDateTimePickerInput,
  MySelectInput,
  MyTextInput
} from "../../../components/FormInput.component";
import MyModal from "../../../components/MyModal.component";
import {
  IEditCatalogItemInterfaces,
  ILentItem,
  LentItemSchema
} from "./CatalogItemInputInterfaces.interface";

export interface ILentItemModal {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  postLentItemMutation?: UseMutationResult<any, unknown, ILentItem, unknown>;
  itemId: string;
}

const LentItemModal: React.FC<ILentItemModal> = ({
  opened,
  setOpened,
  postLentItemMutation,
  itemId
}) => {
  const form = useForm<ILentItem>({
    validate: yupResolver(LentItemSchema)
  });

  const {
    getInputProps,
    errors,
    values,
    setValues,
    reset,
  } = form;

  function handleLentItem() {
    postLentItemMutation?.mutate(values);
  }

  useEffect(() => {
    if (opened) {
      setValues({
        lendStartTime: new Date(),
        itemId: itemId
      });
    }
  }, [opened]);

  useEffect(() => {
    if (postLentItemMutation?.isSuccess) {
      setOpened(false);
    }
  }, [postLentItemMutation?.isSuccess]);

  useEffect(() => {
    if (!opened) {
      reset();
    }
  }, [opened]);

  console.log(values, "values date");
  return (
    <MyModal
      opened={opened}
      setOpened={setOpened}
      title={"Pinjam Barang"}
      onClose={() => {}}
      minWidth={800}
    >
      <Stack>
          <div className="border-2 border-primary-text rounded-md overflow-hidden w-fit self-center">
            <img src={FotoKTM || ""} alt="" className="w-96 object-cover" />
          </div>
          <Text className="text-primary-text-500 w-[80%] self-center mb-4 text-center">
            Silahkan scan qr-code dari KTM (kartu mahasiswa) atau menginput nim secara manual pada form input di bawah
          </Text>
          <MyTextInput
            label="NIM Mahasiswa"
            size="md"
            placeholder="Masukkan NIM Peminjam"
            {...getInputProps("studentId")}
            error={errors["studentId" as keyof IEditCatalogItemInterfaces]}
            className="grow"
            required
          />
          <MyTextInput
            label="Nama Ruangan"
            size="md"
            placeholder="Masukkan Nama Ruangan"
            {...getInputProps("roomName")}
            error={errors["roomName" as keyof IEditCatalogItemInterfaces]}
            className="grow"
          />
        <Group>
          <MyDateTimePickerInput
            label="Waktu Peminjaman"
            size="md"
            {...getInputProps("lendStartTime")}
            error={errors["lendStartTime" as keyof IEditCatalogItemInterfaces]}
            className="grow"
            required
            defaultValue={new Date()}
          />
          <MyDateTimePickerInput
            label="Waktu Pengembalian"
            size="md"
            {...getInputProps("lendEndTime")}
            error={errors["lendEndTime" as keyof IEditCatalogItemInterfaces]}
            className="grow"
            minDate={new Date()}
            required
          />
        </Group>
        
        <MySelectInput
          label="Staff"
          size="md"
          placeholder="Pilih Staff yang Memberikan Peminjaman"
          data={[
            {
              // "CLOTHES", "ACCESSORIES", "OTHER"
              label: "Nasir, S.Sos",
              value: "1"
            },
            {
              label: "Irma, S.Si",
              value: "2"
            },
            {
              value: "3",
              label: "Karmila K, S.Si"
            },
            {
              value: "4",
              label: "Staff Lain"
            },
          ]}
          {...getInputProps("staffName")}
          error={errors["staffName" as keyof IEditCatalogItemInterfaces]}
          required
          clearable
        />
        <MyTextInput
          label="Keterangan Tambahan"
          size="md"
          placeholder="Masukkan Keterangan Tambahan"
          {...getInputProps("description")}
          error={errors["description" as keyof IEditCatalogItemInterfaces]}
        />

        <Button
          onClick={handleLentItem}
          className="bg-green hover:bg-light-green rounded-full duration-100"
          disabled={
            values?.itemId == null ||
            values?.lendEndTime == null ||
            values?.lendStartTime == null ||
            values?.staffName == null ||
            values?.studentId == null
            // values?.description == null ||
            // values?.roomName == null
          }
        >
          Pinjam
        </Button>
      </Stack>
    </MyModal>
  );
};
export default LentItemModal;
