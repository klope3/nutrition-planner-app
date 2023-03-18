import { useState } from "react";
import { SearchCriteria, sortFunctions } from "../../../searchCriteria";
import { FoodSearchJson } from "../../../types/FoodDataTypes";
import { useAccount } from "../../AccountProvider";
import { useDayChart } from "../../DayChartProvider";
import { FoodSearchForm } from "../FoodSearchForm/FoodSearchForm";
import { FoodSearchResult } from "../FoodSearchResult/FoodSearchResult";
import "./FoodSearch.css";
import { refineFoodResults } from "./FoodSearchFunctions";

const initialCriteria: SearchCriteria = {
  sortFunction: sortFunctions[0],
  filterFunctions: [],
};

export function FoodSearch() {
  const [searchResults, setSearchResults] = useState({} as FoodSearchJson);
  const [selectedFdcId, setSelectedFdcId] = useState(0);
  const [searchCriteria, setSearchCriteria] = useState(initialCriteria);
  const { addPortion, setShowSearch } = useDayChart();
  const { activeUser } = useAccount();

  function clickAdd() {
    setShowSearch(false);
    addPortion(activeUser.dbId, selectedFdcId, 1);
  }

  function selectFood(fdcId: number) {
    setSelectedFdcId(fdcId);
  }

  const foodResults = refineFoodResults(searchResults, searchCriteria);

  return (
    <div className="modal-bg">
      <div className="food-search-modal">
        <div className="food-search-flex">
          <FoodSearchForm
            searchCriteria={searchCriteria}
            setSearchCriteria={setSearchCriteria}
            setSearchResults={setSearchResults}
          />
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
