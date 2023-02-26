import { useState } from "react";
import { API_KEY, API_URL } from "../../../constants";
import { FoodSearchJson } from "../../../types/FoodDataTypes";
import { useDayChart } from "../../DayChartProvider";
import { FoodSearchResult } from "../FoodSearchResult/FoodSearchResult";
import "./FoodSearch.css";

const fakeSearch: FoodSearchJson = {
  foods: [
    {
      description: "Cucumber",
      fdcId: 111111,
      dataType: "",
    },
    {
      description: "Tomato",
      fdcId: 23874,
      dataType: "",
    },
    {
      description: "Cookie",
      fdcId: 8977655,
      dataType: "",
    },
    {
      description: "Wheat Bread",
      fdcId: 879613,
      dataType: "",
    },
  ]
}

const useFakeSearch = true;

export function FoodSearch() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState({} as FoodSearchJson);
  const [selectedFdcId, setSelectedFdcId] = useState(0);
  const { addPortion } = useDayChart();

  function search() {
    if (useFakeSearch) {
      setSearchResults(fakeSearch);
      return;
    }
    fetch(
      `${API_URL}/foods/search?query=${searchText}&api_key=${API_KEY}&pageNumber=1`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response.status);
        }
      })
      .then((json) => setSearchResults(json))
      .catch((error) => console.log(error));
  }

  function clickAdd() {
    setShowSearch(false);
    addPortion(selectedFdcId, 1);
  }

  function selectFood(fdcId: number) {
    console.log("selected " + fdcId);
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
