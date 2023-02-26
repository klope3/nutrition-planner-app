import { DB_URL } from "./constants";

export function fetchFromDb(endpoint: string) {
  const requestOptions = { method: "GET" };
  return fetch(`${DB_URL}/${endpoint}`, requestOptions);
}

export function postToDb(endpoint: string, bodyData: Object) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  };
  return fetch(`${DB_URL}/${endpoint}`, requestOptions);
}

export function deleteFromDb(endpoint: string, id: number) {
  const requestOptions = { method: "DELETE" };
  return fetch(`${DB_URL}/${endpoint}/${id}`, requestOptions);
}
