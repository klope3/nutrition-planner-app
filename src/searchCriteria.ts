import {
  FoodSearchJson,
  FoodSearchResultData,
  NutrientDisplayName,
} from "./types/FoodDataTypes";

type SortDirection = "asc" | "desc";
export type SortFunction = {
  displayName: string;
  function: (foods: FoodSearchResultData[]) => void;
};
export type FilterFunction = {
  displayName: string;
  function: (foods: FoodSearchResultData[]) => FoodSearchResultData[];
};

export type SearchCriteria = {
  sortFunction: SortFunction | undefined;
  filterFunctions: FilterFunction[];
};

export function applySearchCriteria(
  originalResults: FoodSearchJson,
  criteria: SearchCriteria
) {
  let newResults = { ...originalResults };
  if (criteria.sortFunction) {
    criteria.sortFunction.function(newResults.foods);
  }
  return newResults;
}

function sortByNutrient(
  foods: FoodSearchResultData[],
  nutrientName: NutrientDisplayName,
  direction: SortDirection
) {
  foods.sort((a, b) => {
    const nutrientA = a.foodNutrients.find(
      (nutrient) => nutrient.displayName === nutrientName
    )?.amount;
    const nutrientB = b.foodNutrients.find(
      (nutrient) => nutrient.displayName === nutrientName
    )?.amount;
    if (nutrientA !== undefined && nutrientB === undefined) return -1;
    if (nutrientA === undefined && nutrientB !== undefined) return 1;
    if (nutrientA === undefined || nutrientB === undefined) return -1;
    return direction === "asc" ? nutrientA - nutrientB : nutrientB - nutrientA;
  });
}

function sortByBrandName(
  foods: FoodSearchResultData[],
  sortDirection: SortDirection
) {
  foods.sort((foodA, foodB) => {
    const a = foodA.brandName;
    const b = foodB.brandName;
    if (sortDirection === "asc") {
      console.log("alpha ascending");
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    } else {
      console.log("alpha descending");
      if (a < b) return 1;
      if (a > b) return -1;
      return 0;
    }
  });
}

export const sortFunctions: SortFunction[] = [
  {
    displayName: "Calores (low to high)",
    function: (foods) => {
      sortByNutrient(foods, "Calories", "asc");
    },
  },
  {
    displayName: "Calories (high to low)",
    function: (foods) => {
      sortByNutrient(foods, "Calories", "desc");
    },
  },
  {
    displayName: "Total Fat (low to high)",
    function: (foods) => {
      sortByNutrient(foods, "Total Fat", "asc");
    },
  },
  {
    displayName: "Total Fat (high to low)",
    function: (foods) => {
      sortByNutrient(foods, "Total Fat", "desc");
    },
  },
  {
    displayName: "Carbohydrates (low to high)",
    function: (foods) => {
      sortByNutrient(foods, "Carbohydrates", "asc");
    },
  },
  {
    displayName: "Carbohydrates (high to low)",
    function: (foods) => {
      sortByNutrient(foods, "Carbohydrates", "desc");
    },
  },
  {
    displayName: "Sodium (low to high)",
    function: (foods) => {
      sortByNutrient(foods, "Sodium", "asc");
    },
  },
  {
    displayName: "Sodium (high to low)",
    function: (foods) => {
      sortByNutrient(foods, "Sodium", "desc");
    },
  },
  {
    displayName: "Sugar (low to high)",
    function: (foods) => {
      sortByNutrient(foods, "Total Sugars", "asc");
    },
  },
  {
    displayName: "Sugar (high to low)",
    function: (foods) => {
      sortByNutrient(foods, "Total Sugars", "desc");
    },
  },
  {
    displayName: "Protein (low to high)",
    function: (foods) => {
      sortByNutrient(foods, "Protein", "asc");
    },
  },
  {
    displayName: "Protein (high to low)",
    function: (foods) => {
      sortByNutrient(foods, "Protein", "desc");
    },
  },
  {
    displayName: "Brand Name (A-Z)",
    function: (foods) => {
      sortByBrandName(foods, "asc");
    },
  },
  {
    displayName: "Brand Name (Z-A)",
    function: (foods) => {
      sortByBrandName(foods, "desc");
    },
  },
];
