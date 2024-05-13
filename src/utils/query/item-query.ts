import { BASE_URL } from "../const/api";
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
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMTFhNjY3Ny1iNzY3LTRjOWMtYTc2Ny0yNjBhODhlN2NlNjEiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzE1MzUyMDU1LCJleHAiOjE3MTc5NDQwNTUsImlzcyI6ImFwaS5qaiIsInN1YiI6ImFkbWluIn0.p6OSEYA0bY6KZHWWoH92X6qv8ZzoqgtN4L8gjLfulVU",
      "Content-Type": "application/json"
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

export async function qfDeleteItem(itemId: string) {
  const response = await fetch(`${endpoint}/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMTFhNjY3Ny1iNzY3LTRjOWMtYTc2Ny0yNjBhODhlN2NlNjEiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzE1MzUyMDU1LCJleHAiOjE3MTc5NDQwNTUsImlzcyI6ImFwaS5qaiIsInN1YiI6ImFkbWluIn0.p6OSEYA0bY6KZHWWoH92X6qv8ZzoqgtN4L8gjLfulVU",
      "Content-Type": "application/json"
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
