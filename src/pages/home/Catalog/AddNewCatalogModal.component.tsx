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
} from "./CatalogItemInputInterfaces.interface";
import { useForm, yupResolver } from "@mantine/form";
import instance from "../../../utils/http";
import { UseMutationResult, useMutation } from "react-query";
import { IAddNewItem, qfAddItem } from "../../../utils/query/item-query";

export interface IAddNewCatalogModal {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  postAddItemMutation: UseMutationResult<any, unknown, IAddNewItem, unknown>;
}

const AddNewCatalogModal: React.FC<IAddNewCatalogModal> = ({
  opened,
  setOpened,
  postAddItemMutation
}) => {
  const form = useForm<IAddNewCatalogItemInterfaces>({
    validate: yupResolver(AddNewCatalogItemSchema)
  });

  function handleAddCatalogItem() {
    console.log(values, "values");
    postAddItemMutation.mutate({
      name: values.itemName,
      description: values.description,
      stock: values.stock,
      thumbnail: values.image
    });
    
    setOpened(false)
  }

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

  // async function handleAddCatalogItem() {
  //       try {
  //           const addItemResponse = await instance.post('/api/items', {
  //             name: values.itemName , description: values.description, stock: values.stock
  //           }, {
  //               headers: {
  //                   Authorization: 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMTFhNjY3Ny1iNzY3LTRjOWMtYTc2Ny0yNjBhODhlN2NlNjEiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzE1MzUyMDU1LCJleHAiOjE3MTc5NDQwNTUsImlzcyI6ImFwaS5qaiIsInN1YiI6ImFkbWluIn0.p6OSEYA0bY6KZHWWoH92X6qv8ZzoqgtN4L8gjLfulVU",
  //                   'Content-Type': 'application/json',
  //               },
  //           });
  //       } catch (error) {
  //           console.error('Error submitting form:', error);
  //       }
  //     setOpened(false);
  // }

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
      title={"Tambah Barang Baru Pada Katalog"}
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
          required
        />
        <MyNumberInput
          label="Stok Barang"
          size="md"
          placeholder="Masukkan Jumlah Stok Barang"
          {...getInputProps("stock")}
          error={errors["stock" as keyof IAddNewCatalogItemInterfaces]}
          defaultValue={""}
          min={0}
          required
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
          Tambah
        </Button>
      </Stack>
    </MyModal>
  );
};
export default AddNewCatalogModal;
