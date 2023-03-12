import { useState } from "react";
import { API_KEY, API_URL } from "../../../constants";
import { fakeSearch, useFakeData } from "../../../fakeData";
import { searchFdcFoodsJson } from "../../../fetch";
import { FoodSearchJson } from "../../../types/FoodDataTypes";
import { useAccount } from "../../AccountProvider";
import { useDayChart } from "../../DayChartProvider";
import { FoodSearchResult } from "../FoodSearchResult/FoodSearchResult";
import "./FoodSearch.css";

export function FoodSearch() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState({} as FoodSearchJson);
  const [selectedFdcId, setSelectedFdcId] = useState(0);
  const { addPortion } = useDayChart();
  const { activeUser } = useAccount();

  async function search() {
    if (useFakeData) {
      setSearchResults(fakeSearch);
      return;
    }
    const json = await searchFdcFoodsJson(searchText, 1);
    if (json) setSearchResults(json);
  }

  function clickAdd() {
    setShowSearch(false);
    addPortion(activeUser.dbId, selectedFdcId, 1);
  }

  function selectFood(fdcId: number) {
    setSelectedFdcId(fdcId);
  }

  const foodResults = searchResults && searchResults.foods;
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
            <label htmlFor="">
              <input type="checkbox" name="placeholder" id="" /> Placeholder
            </label>
            <label htmlFor="">
              <input type="checkbox" name="placeholder" id="" /> Placeholder
            </label>
            <label htmlFor="">
              <input type="checkbox" name="placeholder" id="" /> Placeholder
            </label>
            <label htmlFor="">
              <input type="checkbox" name="placeholder" id="" /> Placeholder
            </label>
            <label htmlFor="">
              <input type="checkbox" name="placeholder" id="" /> Placeholder
            </label>
            <label htmlFor="">
              <input type="checkbox" name="placeholder" id="" /> Placeholder
            </label>
            <label htmlFor="">
              <input type="checkbox" name="placeholder" id="" /> Placeholder
            </label>
          </form>
          <div className="search-results-view">
            {foodResults &&
              foodResults.map((result) => (
                <FoodSearchResult
                  key={result.fdcId}
                  food={result}
                  selectFood={selectFood}
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
