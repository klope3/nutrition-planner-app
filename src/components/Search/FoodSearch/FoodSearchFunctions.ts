import { fakeSearch, useFakeData } from "../../../fakeData";
import { searchFdcFoodsJson } from "../../../fetch";
import {
  applySearchCriteria,
  FilterFunction,
  filterFunctions,
  SearchCriteria,
  sortFunctions,
} from "../../../searchCriteria";
import { FoodSearchJson } from "../../../types/FoodDataTypes";
import { convertFoodSearchJson } from "../../../utility";

export async function search(
  searchText: string,
  setSearchResults: (json: FoodSearchJson) => void
) {
  if (useFakeData) {
    setSearchResults(fakeSearch as FoodSearchJson);
    return;
  }
  const json = await searchFdcFoodsJson(searchText, 1);
  if (json) {
    let results = convertFoodSearchJson(json);
    setSearchResults(results);
  }
}

export function changeSortFunction(
  e: React.ChangeEvent<HTMLSelectElement>,
  searchCriteria: SearchCriteria,
  setSearchCriteria: (c: SearchCriteria) => void
) {
  const sortFunction = sortFunctions.find(
    (item) => item.displayName === e.target.value
  );
  const newCriteria = {
    ...searchCriteria,
    sortFunction,
  };
  setSearchCriteria(newCriteria);
}

export function clickFilter(
  e: React.ChangeEvent<HTMLInputElement>,
  searchCriteria: SearchCriteria,
  setSearchCriteria: (c: SearchCriteria) => void
) {
  const clickedName = e.target.name;
  const newCriteria = { ...searchCriteria };
  newCriteria.filterFunctions = newCriteria.filterFunctions.filter(
    (filterFunction) => filterFunction.displayName !== clickedName
  );
  const shouldAdd =
    newCriteria.filterFunctions.length ===
    searchCriteria.filterFunctions.length;
  if (shouldAdd)
    newCriteria.filterFunctions.push(
      filterFunctions.find(
        (filterFunction) => filterFunction.displayName === clickedName
      ) as FilterFunction
    );
  setSearchCriteria(newCriteria);
}

export function refineFoodResults(
  rawResults: FoodSearchJson,
  searchCriteria: SearchCriteria
) {
  const refinedResults =
    rawResults &&
    rawResults.foods &&
    rawResults.foods.length > 0 &&
    applySearchCriteria(rawResults, searchCriteria);
  return refinedResults && refinedResults.foods;
}
