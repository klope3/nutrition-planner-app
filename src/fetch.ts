import { API_KEY, API_URL, nutrientInfo } from "./constants";
import { DayChart, dayChartSchema } from "./types/DayChartNew";
import {
  DayChartDayEntry,
  DayChartEntry,
  DaySectionEntry,
  DaySectionRowEntry,
  PortionRowEntry,
  UserDayChartEntry,
} from "./types/DayChartTypes";
// import { FoodData } from "./types/FoodDataTypes";
import { FoodData, Nutrient, NutrientInfo } from "./types/FoodDataNew";
import { splitArrayBy } from "./utility";

const foodDataCache: FoodData[] = [];
const blankFoodData: FoodData = {
  fdcId: 0,
  description: "Food Item",
  nutrients: [],
};

export type EndpointJsons = {
  userDayCharts: UserDayChartEntry[];
  dayCharts: DayChartEntry[];
  dayChartDays: DayChartDayEntry[];
  daySections: DaySectionEntry[];
  daySectionRows: DaySectionRowEntry[];
  portionRows: PortionRowEntry[];
};

function createHeadersWithAuthorization() {
  const token = localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  return headers;
}

export function loadUserDayChart(userId: string, token: string) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  const requestOptions = {
    method: "GET",
    headers,
  };
  return fetch(`http://localhost:3000/users/${userId}/chart`, requestOptions)
    .then((res) => {
      if (!res.ok) {
        res
          .clone()
          .json()
          .then((json) => {
            if (json.message !== undefined) {
              throw new Error(json.message);
            }
          });
      }
      return res.json();
    })
    .then((json) => {
      try {
        const parsedDayChart = dayChartSchema.parse(json);
        return parsedDayChart;
      } catch (error) {
        console.error(error);
      }
    })
    .catch((e) => {
      console.error(e);
      return undefined;
    });
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

export async function getFoodDataFor(fdcIds: number[]) {
  const fetches = fdcIds.map((fdcId) =>
    fetch(`${API_URL}/food/${fdcId}?api_key=${API_KEY}`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((json) => extractFoodDataFromJson(json))
  );
  return Promise.all(fetches);
  // const dataFromCache = foodDataCache.find((data) => data.fdcId === fdcId);
  // if (dataFromCache) return dataFromCache;

  // return fetch(`${API_URL}/food/${fdcId}?api_key=${API_KEY}`, {
  //   method: "GET",
  // })
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error();
  //     }
  //     return res.json();
  //   })
  //   .then((json) => {
  //     foodDataCache.push(json as FoodData);
  //     return json as FoodData;
  //   })
  //   .catch((e) => {
  //     console.error("Fetch failed for " + fdcId + " with this error:");
  //     console.error(e);
  //     return blankFoodData;
  //   });
}

function extractFoodDataFromJson(json: any) {
  const foodData: FoodData = {
    description: json.description,
    fdcId: json.fdcId,
    nutrients:
      json.foodNutrients &&
      json.foodNutrients
        .map((foodNutrient: any) => {
          const matchingInfo = nutrientInfo.find(
            (nutrientInfo) =>
              nutrientInfo.fdcName === foodNutrient.nutrient.name
          );
          if (!matchingInfo) return undefined;
          const nutrient: Nutrient = {
            amount: foodNutrient.amount,
            nutrientInfo: matchingInfo,
          };
          return nutrient;
        })
        .filter((item: any) => item !== undefined),
  };
  return foodData;
}

export function addPortionFetch(
  fdcId: number,
  userId: number,
  dayIndexInChart: number,
  sectionIndexInDay: number
) {
  const headers = createHeadersWithAuthorization();
  headers.append("Content-Type", "application/json");

  const body = JSON.stringify({
    dayIndexInChart: dayIndexInChart,
    sectionIndexInDay: sectionIndexInDay,
    fdcId: fdcId,
  });

  const requestOptions = {
    method: "POST",
    headers,
    body,
  };

  return fetch(
    `http://localhost:3000/users/${userId}/chart`,
    requestOptions
  ).then((res) => {
    if (!res.ok) {
      res.json().then((json) => {
        if (json.message !== undefined) {
          throw new Error(
            `Adding portion FAILED with a status code of ${res.status} and the message: "${json.message}`
          );
        } else {
          throw new Error(
            `Adding portion FAILED with status code ${res.status}`
          );
        }
      });
    }
  });
}

export function deletePortionFetch(userId: number, portionId: number) {
  const headers = createHeadersWithAuthorization();

  const requestOptions = {
    method: "DELETE",
    headers,
  };

  return fetch(
    `http://localhost:3000/users/${userId}/chart/portions/${portionId}`,
    requestOptions
  ).then((res) => {
    if (!res.ok) {
      res.json().then((json) => {
        if (json.message !== undefined) {
          throw new Error(
            `Deleting portion FAILED with a status code of ${res.status} and the message: ${json.message}`
          );
        } else {
          throw new Error(
            `Deleting portion FAILED with a status code of ${res.status}`
          );
        }
      });
    }
  });
}
