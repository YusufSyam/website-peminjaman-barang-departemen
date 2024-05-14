import { ILentItem } from "../../pages/home/Catalog/CatalogItemInputInterfaces.interface";
import { BASE_URL, getTokenAuthorizationHeader } from "../const/api";
import { ParseFileBase64 } from "../function/misc.function";

const endpoint = `${BASE_URL}/items`;

export interface IAddNewItem {
  name: string;
  stock: number;
  description: string;
  thumbnail: File;
}

export async function qfAddItem({
  description,
  name,
  stock,
  thumbnail
}: IAddNewItem) {
  const response = await fetch(`${endpoint}`, {
    method: "POST",
    headers: {
      ...getTokenAuthorizationHeader()
    },
    mode: "cors",
    credentials: "same-origin",
    body: JSON.stringify({
      name: name,
      description: description,
      stock: stock
      // thumbnail: await ParseFileBase64(thumbnail),
    })
  });

  const data = await response.json();

  console.log("INI RESPONSE", data);

  return data;
}

export interface IEditItem {
  itemId: string;
  values: IAddNewItem;
}

export async function qfEditItem({ itemId, values }: IEditItem) {
  const response = await fetch(`${endpoint}/${itemId}`, {
    method: "PUT",
    headers: {
      ...getTokenAuthorizationHeader()
    },
    mode: "cors",
    credentials: "same-origin",
    body: JSON.stringify(values)
  });

  const data = await response.json();

  console.log("INI RESPONSE", data);

  return data;
}

export async function qfDeleteItem(itemId: string) {
  const response = await fetch(`${endpoint}/${itemId}`, {
    method: "DELETE",
    headers: {
      ...getTokenAuthorizationHeader()
    }
  });

  const data = await response.json();

  return data;
}

export async function qfFetchAllItems() {
  const response = await fetch(`${endpoint}`);
  console.log(response, "response");
  if (!response.ok) {
    throw new Error("Error");
  }
  return response.json();
}

export async function qfFetchAllLentActivity() {
  const response = await fetch(`${endpoint}/lent-items`, {
    method: "GET",
    headers: {
      ...getTokenAuthorizationHeader()
    }
  });
  console.log(response, "response");
  if (!response.ok) {
    throw new Error("Error");
  }
  return response.json();
}

export async function qfLentItem(values: ILentItem) {
  const response = await fetch(`${endpoint}/lent-items`, {
    method: "POST",
    headers: {
      ...getTokenAuthorizationHeader()
    },
    mode: "cors",
    credentials: "same-origin",
    body: JSON.stringify({
      lendStartTime: values?.lendStartTime?.getTime(),
      lendEndTime: values?.lendEndTime?.getTime(),
      itemId: values?.itemId,
      studentId: values?.studentId,
      description: values?.description,
      roomName: values?.roomName
    })
  });

  const data = await response.json();

  console.log("INI RESPONSE", data);

  return data;
}
