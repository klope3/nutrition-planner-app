import { useState } from "react";
import { API_KEY, API_URL } from "../../../constants";
import { FoodSearchResult } from "../FoodSearchResult/FoodSearchResult";
import "./FoodSearch.css";

export function FoodSearch(props) {
  const { setShowSearch } = props;
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState();

  function search() {
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

  const foodResults = searchResults && searchResults.foods;

  return (
    <div className="modal-bg">
      <div className="food-search-modal">
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
              <FoodSearchResult key={result.fdcId} food={result} />
            ))}
        </div>
        <button className="button-x" onClick={() => setShowSearch(false)}>
          X
        </button>
      </div>
    </div>
  );
}
