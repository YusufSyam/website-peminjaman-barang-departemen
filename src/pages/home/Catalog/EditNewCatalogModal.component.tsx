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
  IEditCatalogItemInterfaces
} from "./CatalogItemInputInterfaces.interface";
import { useForm, yupResolver } from "@mantine/form";
import { UseMutationResult } from "react-query";
import { IAddNewItem, IEditItem } from "../../../utils/query/item-query";

export interface IEditNewCatalogModal {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  putEditItemMutation?: UseMutationResult<any, unknown, IEditItem, unknown>;
  label: string;
  image: string;
  stock: number;
  description: string;
  itemId: string;
}

const EditNewCatalogModal: React.FC<IEditNewCatalogModal> = ({
  opened,
  setOpened,
  putEditItemMutation,
  description,
  image,
  itemId,
  label,
  stock
}) => {
  const form = useForm<IEditCatalogItemInterfaces>({
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

  function handleEditCatalogItem() {
    putEditItemMutation?.mutate({ itemId: itemId, values:values });
    console.log("DDDDDDDDDDDDDDD", values);
  }

  useEffect(() => {
    if (putEditItemMutation?.isSuccess) {
      setOpened(false);
    }
  }, [putEditItemMutation?.isSuccess]);

  useEffect(() => {
    if (!opened) {
      reset();
    }
  }, [opened]);
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
          {...getInputProps("name")}
          error={errors["name" as keyof IEditCatalogItemInterfaces]}
          defaultValue={label}
        />
        <MyNumberInput
          label="Stok Barang"
          size="md"
          placeholder="Masukkan Jumlah Stok Barang"
          {...getInputProps("stock")}
          error={errors["stock" as keyof IEditCatalogItemInterfaces]}
          defaultValue={stock}
          min={0}
        />
        <MyTextInput
          label="Deskripsi"
          size="md"
          placeholder="Masukkan Deskripsi Barang"
          {...getInputProps("description")}
          error={errors["description" as keyof IEditCatalogItemInterfaces]}
          defaultValue={description}
        />
        
        <DocumentInput
          withDelete
          {...getInputProps("thumbnail")}
          required
          accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.mp4]}
          label="Gambar Barang"
          placeholder="Seret dan tempatkan file, atau klik untuk memilih file."
          description="Ekstensi file png, jpeg atau mp4. Ukuran file maksimal 100 MB."
          error={
            errors[`${"thumbnail" as keyof IEditCatalogItemInterfaces}.name`]
          }
          maxSize={100_000_000}
        />
        <Button
          onClick={handleEditCatalogItem}
          className="bg-green hover:bg-light-green rounded-full duration-100"
          // disabled={
          //   values?.image == null ||
          //   values?.itemName == null ||
          //   values?.itemName == "" ||
          //   values?.stock == null ||
          //   typeof values?.stock == "string"
          // }
        >
          Edit
        </Button>
      </Stack>
    </MyModal>
  );
};
export default EditNewCatalogModal;
