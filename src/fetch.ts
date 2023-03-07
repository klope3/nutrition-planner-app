import { API_KEY, API_URL, DB_URL } from "./constants";
import {
  DayChartDayEntry,
  DaySectionEntry,
  DaySectionRowEntry,
  PortionRowEntry,
} from "./types/DayChartTypes";
import { extractFoodDataFromJson, splitArrayBy } from "./utility";

const foodDataCache = new Map();

export type EndpointJsons = {
  dayChartDays: DayChartDayEntry[];
  daySections: DaySectionEntry[];
  daySectionRows: DaySectionRowEntry[];
  portionRows: PortionRowEntry[];
};

export async function fetchEndpointJsons() {
  const endpoints = [
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
    dayChartDays: jsons[0],
    daySections: jsons[1],
    daySectionRows: jsons[2],
    portionRows: jsons[3],
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
}

export function fetchSingleFdcFood(fdcId: number) {
  // const fromCache = foodDataCache.get(fdcId);
  // if (fromCache) {
  //   const json = () => fromCache;
  //   const promise = new Promise((resolve, reject) => {
  //     const response = new Response();
  //     response.json = json;
  //     resolve(response);
  //   });
  //   return promise;
  // }
  const fetchPromise = fetch(`${API_URL}/food/${fdcId}?api_key=${API_KEY}`, {
    method: "GET",
  });
  // if (!fromCache) addFoodDataToCache(fetchPromise);
  return fetchPromise;
}

export async function fetchAllFdcFoodJsons(fdcIds: number[]) {
  const { passArr: idsInCache, failArr: idsNotInCache } = splitArrayBy(
    fdcIds,
    (id) => foodDataCache.has(id)
  );
  const dataFromCache = idsInCache.map((id) => foodDataCache.get(id));
  console.log(
    idsInCache.length +
      " found in cache, " +
      idsNotInCache.length +
      " not in cache"
  );
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
  // const response = await fetchSingleFdcFood(fdcId);
  // if (!response.ok) {
  //   console.error("Getting name for food FAILED: " + response.status);
  //   return undefined;
  // }
  // return await response.json();

  const response = await fetch(`${API_URL}/food/${fdcId}?api_key=${API_KEY}`, {
    method: "GET",
  });
  if (!response.ok) {
    console.error("FAILED to fetch food: " + response.status);
    return undefined;
  }
  return await response.json();
}

async function addFoodDataToCache(fetchPromise: Promise<Response>) {
  const response = await fetchPromise;
  const clone = response.clone();
  const json = await clone.json();
  const foodData = extractFoodDataFromJson(json);
  foodDataCache.set(foodData.fdcId, foodData);
  console.log("cache is now:");
  console.log(foodDataCache);
}
