import { DB_URL } from "./constants";

async function fetchRequestWithJson(
  endpoint: string,
  requestOptions: Object,
  badResponseMessage?: string
) {
  const response = await fetch(`${DB_URL}/${endpoint}`, requestOptions);
  if (!response.ok) {
    console.error(badResponseMessage ? badResponseMessage : "Fetch FAILED");
    return undefined;
  }
  const json = await response.json();
  return json;
}

export async function postToDbAndReturnJson(
  endpoint: string,
  bodyData: Object,
  badResponseMessage?: string
) {
  return await fetchRequestWithJson(
    endpoint,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    },
    badResponseMessage
  );
}

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
