import { fetchFromDb } from "./fetch";

export type UserAccount = {
  dbId: number;
  email: string;
  password: string;
};

export async function tryGetUser(email: string, password: string) {
  const usersResponse = await fetchFromDb("users");
  if (!usersResponse.ok) {
    console.error("Could not get users data");
    return undefined;
  }
  const usersJson = await usersResponse.json();
  const userEntries: UserAccount[] = usersJson.map((json: any) => {
    const entry: UserAccount = {
      dbId: json.id,
      email: json.email,
      password: json.password,
    };
    return entry;
  });
  const matchingUser = userEntries.find(
    (entry) => entry.email === email && entry.password === password
  );
  return matchingUser;
}
