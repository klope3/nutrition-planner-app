import { useState } from "react";
import {
  filterFunctions,
  SearchCriteria,
  sortFunctions,
} from "../../../searchCriteria";
import { FoodSearchJson } from "../../../types/FoodDataTypes";
import {
  changeSortFunction,
  clickFilter,
  search,
} from "../FoodSearch/FoodSearchFunctions";

type FoodSearchFormProps = {
  setSearchResults: (results: FoodSearchJson) => void;
  searchCriteria: SearchCriteria;
  setSearchCriteria: (c: SearchCriteria) => void;
};

export function FoodSearchForm(props: FoodSearchFormProps) {
  const { setSearchResults, searchCriteria, setSearchCriteria } = props;
  const [searchText, setSearchText] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        search(searchText, setSearchResults);
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
            onChange={(e) => clickFilter(e, searchCriteria, setSearchCriteria)}
          />
          {filterFunction.displayName}
        </label>
      ))}
      <select
        onChange={(e) =>
          changeSortFunction(e, searchCriteria, setSearchCriteria)
        }
      >
        {sortFunctions.map((sortFunction) => (
          <option>{sortFunction.displayName}</option>
        ))}
      </select>
    </form>
  );
}
