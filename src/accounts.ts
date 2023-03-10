import { fetchFromDb, postToDbAndReturnJson } from "./fetch";
import { UserDayChartEntry } from "./types/DayChartTypes";

export type UserAccount = {
  dbId: number;
  email: string;
  password: string;
};

export async function tryValidateUser(userId: number) {
  const userDayChartsResponse = await fetchFromDb("userDayCharts");
  if (!userDayChartsResponse.ok) return false;
  const json = await userDayChartsResponse.json();
  const userHasDayChart = !!json.find(
    (pair: UserDayChartEntry) => pair.userId === userId
  );
  if (userHasDayChart) return true;

  const newDayChart = await postToDbAndReturnJson(
    "dayCharts",
    {},
    "Could not post day chart"
  );
  if (!newDayChart) return false;
  const newUserDayChart = await postToDbAndReturnJson(
    "userDayCharts",
    { userId, dayChartId: newDayChart.id },
    "Could not post userDayChart"
  );
  return true;
}

export async function tryGetUser(
  emailToMatch: string,
  passwordToMatch?: string
) {
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
    (entry) =>
      entry.email === emailToMatch &&
      (passwordToMatch === undefined || entry.password === passwordToMatch)
  );
  return matchingUser;
}

export async function tryCreateAccount(email: string, password: string) {
  const postAccountJson = await postToDbAndReturnJson(
    "users",
    {
      email,
      password,
    },
    "Could not create account"
  );
  if (!postAccountJson) return undefined;
  const account: UserAccount = {
    dbId: postAccountJson.id,
    email: postAccountJson.email,
    password: postAccountJson.password,
  };
  return account;
}
