import { useState } from "react";
import { API_KEY, API_URL } from "../../../constants";
import { fakeSearch, useFakeData } from "../../../fakeData";
import { searchFdcFoodsJson } from "../../../fetch";
import {
  applySearchCriteria,
  FilterFunction,
  filterFunctions,
  SearchCriteria,
  SortFunction,
  sortFunctions,
} from "../../../searchCriteria";
import { FoodSearchJson } from "../../../types/FoodDataTypes";
import { convertFoodSearchJson } from "../../../utility";
import { useAccount } from "../../AccountProvider";
import { useDayChart } from "../../DayChartProvider";
import { FoodSearchResult } from "../FoodSearchResult/FoodSearchResult";
import "./FoodSearch.css";

const initialCriteria: SearchCriteria = {
  sortFunction: undefined,
  filterFunctions: [],
};

export function FoodSearch() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState({} as FoodSearchJson);
  const [selectedFdcId, setSelectedFdcId] = useState(0);
  const [searchCriteria, setSearchCriteria] = useState(initialCriteria);
  const { addPortion } = useDayChart();
  const { activeUser } = useAccount();

  async function search() {
    if (useFakeData) {
      setSearchResults(fakeSearch as FoodSearchJson);
      return;
    }
    const json = await searchFdcFoodsJson(searchText, 1);
    if (json) {
      let results = convertFoodSearchJson(json);
      if (
        searchCriteria.sortFunction ||
        searchCriteria.filterFunctions.length > 0
      ) {
        results = applySearchCriteria(results, searchCriteria);
      }
      setSearchResults(results);
    }
  }

  function changeSortFunction(e: React.ChangeEvent<HTMLSelectElement>) {
    const sortFunction = sortFunctions.find(
      (item) => item.displayName === e.target.value
    );
    const newCriteria = {
      ...searchCriteria,
      sortFunction,
    };
    setSearchCriteria(newCriteria);
  }

  function clickFilter(e: React.ChangeEvent<HTMLInputElement>) {
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

  function clickAdd() {
    setShowSearch(false);
    addPortion(activeUser.dbId, selectedFdcId, 1);
  }

  function selectFood(fdcId: number) {
    setSelectedFdcId(fdcId);
  }

  const refinedResults =
    searchResults && applySearchCriteria(searchResults, searchCriteria);
  const foodResults = refinedResults && refinedResults.foods;
  const { setShowSearch } = useDayChart();

  return (
    <div className="modal-bg">
      <div className="food-search-modal">
        <div className="food-search-flex">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              search();
            }}
          >
            <input
              type="text"
              name="search"
              id="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button type="submit">Search</button>
            {filterFunctions.map((filterFunction) => (
              <label>
                <input
                  type="checkbox"
                  name={filterFunction.displayName}
                  id={filterFunction.displayName}
                  onChange={clickFilter}
                />
                {filterFunction.displayName}
              </label>
            ))}
            <select onChange={changeSortFunction}>
              {sortFunctions.map((sortFunction) => (
                <option>{sortFunction.displayName}</option>
              ))}
            </select>
          </form>
          <div className="search-results-view">
            <div>{foodResults ? foodResults.length : 0} results</div>
            {foodResults &&
              foodResults.map((result) => (
                <FoodSearchResult
                  key={result.fdcId}
                  food={result}
                  selectFood={selectFood}
                  isSelected={result.fdcId === selectedFdcId}
                />
              ))}
          </div>
        </div>
        <button className="button-x" onClick={() => setShowSearch(false)}>
          X
        </button>
        <button onClick={clickAdd}>ADD</button>
      </div>
    </div>
  );
}
