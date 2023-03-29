import { API_KEY, API_URL, DB_URL } from "./constants";
import {
  DayChartDayEntry,
  DayChartEntry,
  DaySectionEntry,
  DaySectionRowEntry,
  PortionRowEntry,
  UserDayChartEntry,
} from "./types/DayChartTypes";
import { splitArrayBy } from "./utility";

const foodDataCache = new Map();

export type EndpointJsons = {
  userDayCharts: UserDayChartEntry[];
  dayCharts: DayChartEntry[];
  dayChartDays: DayChartDayEntry[];
  daySections: DaySectionEntry[];
  daySectionRows: DaySectionRowEntry[];
  portionRows: PortionRowEntry[];
};

export async function fetchEndpointJsons() {
  const endpoints = [
    "userDayCharts",
    "dayCharts",
    "dayChartDays",
    "daySections",
    "daySectionRows",
    "portionRows",
  ];
  const responses = await Promise.all(
    endpoints.map((endpoint) => fetchFromDb(endpoint))
  );
  const jsons = await Promise.all(responses.map((response) => response.json()));
  const result: EndpointJsons = {
    userDayCharts: jsons[0],
    dayCharts: jsons[1],
    dayChartDays: jsons[2],
    daySections: jsons[3],
    daySectionRows: jsons[4],
    portionRows: jsons[5],
  };
  return result;
}

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

export async function searchFdcFoodsJson(
  searchText: string,
  pageNumber: number
) {
  try {
    const response = await fetch(
      `${API_URL}/foods/search?query=${searchText}&api_key=${API_KEY}&pageNumber=${pageNumber}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      console.error("Searching FDC foods FAILED: " + response.status);
      return undefined;
    }
    return await response.json();
  } catch (error) {
    return undefined;
  }
}

export function fetchSingleFdcFood(fdcId: number) {
  const fetchPromise = fetch(`${API_URL}/food/${fdcId}?api_key=${API_KEY}`, {
    method: "GET",
  });
  return fetchPromise;
}

export async function fetchAllFdcFoodJsons(fdcIds: number[]) {
  const { passArr: idsInCache, failArr: idsNotInCache } = splitArrayBy(
    fdcIds,
    (id) => foodDataCache.has(id)
  );
  const dataFromCache = idsInCache.map((id) => foodDataCache.get(id));
  if (dataFromCache.length === fdcIds.length) {
    return dataFromCache;
  }

  const jsons = await Promise.all(
    idsNotInCache.map((id) => fetchSingleFdcFoodJson(id))
  );
  jsons.forEach((json) => foodDataCache.set(json.fdcId, json));
  return dataFromCache.concat(jsons);
}

export async function fetchSingleFdcFoodJson(fdcId: number) {
  const response = await fetch(`${API_URL}/food/${fdcId}?api_key=${API_KEY}`, {
    method: "GET",
  });
  if (!response.ok) {
    console.error("FAILED to fetch food: " + response.status);
    return undefined;
  }
  return await response.json();
}
