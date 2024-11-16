import * as yup from "yup";

export interface IAddNewCatalogItemInterfaces {
  itemName: string;
  stock: number;
  description: string;
  image: File;
  // staffName: "Nasir, S.Sos" | "Irma, S.Si" | "Karmila K, S.Si"
}

export interface IEditCatalogItemInterfaces {
  name: string;
  stock: number;
  description: string;
  staffName?: string;
  thumbnail: string;
}

export interface ILentItem {
  lendStartTime: Date;
  lendEndTime: Date;
  itemId: string;
  studentId: string;
  description: string;
  roomName: string;
  staffName?:string;
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

export const LentItemSchema = yup.object({
  itemId: yup.string().required('Input field terlebih dahulu'),
  studentId: yup.string().required('Input field terlebih dahulu'),
  description: yup.string().required('Input field terlebih dahulu'),
  roomName: yup.string().required('Input field terlebih dahulu'),
  lendStartTime: yup.number().required("Input field terlebih dahulu"),
  lendEndTime: yup.number().required("Input field terlebih dahulu"),
  staffName: yup.number().required("Input field terlebih dahulu"),
});

export const EditCatalogItemSchema = yup.object({
  itemName: yup.string().required('Input nama barang terlebih dahulu'),
  stock: yup.number().required("Input berapa total barang terlebih dahulu"),
  image: yup
    .object({
      name: yup.string().required("Input file gambar  terlebih dahulu")
    })
    .nullable()
});
