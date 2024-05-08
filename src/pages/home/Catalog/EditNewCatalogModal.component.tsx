import { Stack, Button } from "@mantine/core";
import { MIME_TYPES } from "@mantine/dropzone";
import React, { useEffect } from "react";
import DocumentInput from "../../../components/DocumentInput.component";
import {
  MyTextInput,
  MyNumberInput
} from "../../../components/FormInput.component";
import MyModal from "../../../components/MyModal.component";
import {
  AddNewCatalogItemSchema,
  IAddNewCatalogItemInterfaces
} from "./AddNewCatalogItemInterfaces.interface";
import { useForm, yupResolver } from "@mantine/form";

export interface IEditNewCatalogModal {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditNewCatalogModal: React.FC<IEditNewCatalogModal> = ({
  opened,
  setOpened
}) => {
  const form = useForm<IAddNewCatalogItemInterfaces>({
    validate: yupResolver(AddNewCatalogItemSchema)
  });

  const {
    getInputProps,
    errors,
    isDirty,
    values,
    setValues,
    reset,
    isValid,
    onSubmit
  } = form;

  function handleAddCatalogItem() {
    setOpened(false);
  }

  useEffect(() => {
    if (!opened) {
      reset();
    }
  }, [opened]);

  console.log(values, "values");
  console.log(values?.itemName?.length > 1, "values?.itemName?.length");
  console.log(
    values?.image == null,
    values?.itemName == null,
    values?.itemName == "",
    values?.stock == null,
    typeof values?.stock == "string",
    `values?.image == null ||
    values?.itemName == null  || values?.itemName != "" ||
    values?.stock == null  || typeof values?.stock == "string"`
  );
  return (
    <MyModal
      opened={opened}
      setOpened={setOpened}
      title={"Edit Detail Barang"}
      onClose={() => {}}
      minWidth={600}
    >
      <Stack>
        <MyTextInput
          label="Nama Barang"
          size="md"
          placeholder="Masukkan Nama Barang"
          {...getInputProps("itemName")}
          error={errors["itemName" as keyof IAddNewCatalogItemInterfaces]}
          defaultValue={""}
        />
        <MyNumberInput
          label="Stok Barang"
          size="md"
          placeholder="Masukkan Jumlah Stok Barang"
          {...getInputProps("stock")}
          error={errors["stock" as keyof IAddNewCatalogItemInterfaces]}
          defaultValue={""}
          min={0}
        />
        <MyTextInput
          label="Deskripsi"
          size="md"
          placeholder="Masukkan Deskripsi Barang"
          {...getInputProps("description")}
          error={errors["description" as keyof IAddNewCatalogItemInterfaces]}
          defaultValue={""}
        />
        <DocumentInput
          withDelete
          {...getInputProps("image")}
          required
          accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.mp4]}
          label="Gambar Barang"
          placeholder="Seret dan tempatkan file, atau klik untuk memilih file."
          description="Ekstensi file png, jpeg atau mp4. Ukuran file maksimal 100 MB."
          error={
            errors[`${"image" as keyof IAddNewCatalogItemInterfaces}.name`]
          }
          maxSize={100_000_000}
        />
        <Button
          onClick={handleAddCatalogItem}
          className="bg-green hover:bg-light-green rounded-full duration-100"
          disabled={
            values?.image == null ||
            values?.itemName == null ||
            values?.itemName == "" ||
            values?.stock == null ||
            typeof values?.stock == "string"
          }
        >
          Edit
        </Button>
      </Stack>
    </MyModal>
  );
};
export default EditNewCatalogModal;
