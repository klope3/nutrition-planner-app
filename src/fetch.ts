import { DB_URL } from "./constants";

export function fetchFromDb(endpoint: string) {
  const getHeaders = { method: "GET" };
  return fetch(`${DB_URL}/${endpoint}`, getHeaders);
}
