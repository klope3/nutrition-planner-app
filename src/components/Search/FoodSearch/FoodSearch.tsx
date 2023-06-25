import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const { addPortion, setShowSearch, clickedSectionIndex } = useDayChart();

  function clickAdd() {
    setShowSearch(false);
    const userId = localStorage.getItem("userId");
    if (userId) addPortion(+userId, selectedFdcId, clickedSectionIndex);
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
          <div className="search-results-view-container">
            <div>{foodResults ? foodResults.length : 0} results</div>
            <div className="search-results-view sub-container">
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
        </div>
        <button className="button-x" onClick={() => setShowSearch(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <button
          className="search-add-button"
          onClick={clickAdd}
          disabled={selectedFdcId === 0}
        >
          ADD
        </button>
      </div>
    </div>
  );
}
