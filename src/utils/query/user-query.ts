import { ILoginInput } from "../../layouts/headers/LoginModal.component";
import { BASE_URL } from "../const/api";

const endpoint = `${BASE_URL}/users`;

// export async function qfLogin(values: ILoginInput) {
//   const response = await fetch(`${endpoint}`, {
//     method: "POST",
//     headers: {
//       // ...getTokenAuthorizationHeader()

//       "Content-Type": "application/json"
//     },
//     mode: "cors",
//     credentials: "same-origin",
//     body: JSON.stringify(values)
//   });
//   if (response.ok) {
//     const data = await response.json();
//     console.log('LLLLLLLLLLLLLLLLLL',data)
//     localStorage.setItem("accessToken", data.accessToken);
//     return data.accessToken;
//   } else {
//     throw new Error("Login failed");
//   }
// }


export async function qfLogin(values: ILoginInput) {
  const credentials = btoa(`${values.username}:${values.password}`);
  const response = await fetch(`${endpoint}/login`, {
    method: "POST",
    headers: {
      // ...getTokenAuthorizationHeader()
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json"
    },
    mode: "cors",
    credentials: "same-origin",
    body: JSON.stringify(values)
  });
  if (response.ok) {
    const data = await response.json();
    console.log("LLLLLLLLLLLLLLLLLL", data);
    localStorage.setItem("accessToken", data?.data?.accessToken);
    return data.accessToken;
  } else {
    throw new Error("Login failed");
  }
}