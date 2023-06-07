import { API_KEY, API_URL } from "./constants";
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
  try {
    const response = await fetch(
      `${API_URL}/food/${fdcId}?api_key=${API_KEY}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      console.error("FAILED to fetch food: " + response.status);
      return undefined;
    }
    return await response.json();
  } catch (error) {}
}
