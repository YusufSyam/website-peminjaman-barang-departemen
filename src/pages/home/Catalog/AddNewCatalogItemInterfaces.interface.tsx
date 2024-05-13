import * as yup from "yup";

export interface IAddNewCatalogItemInterfaces {
  itemName: string;
  stock: number;
  description: string;
  image: File;
}

export const AddNewCatalogItemSchema = yup.object({
  itemName: yup.string().required('Input nama barang terlebih dahulu'),
  stock: yup.number().required("Input berapa total barang terlebih dahulu"),
  image: yup
    .object({
      name: yup.string().required("Input file gambar  terlebih dahulu")
    })
    .nullable()
});

export const EditCatalogItemSchema = yup.object({
  roadName: yup.string().required('Input nama barang terlebih dahulu'),
  stock: yup.number().required("Input berapa total barang terlebih dahulu"),
  image: yup
    .object({
      name: yup.string().required("Input file gambar  terlebih dahulu")
    })
    .nullable()
});
