import { useState } from "react";
import {
  filterFunctions,
  SearchCriteria,
  sortFunctions,
} from "../../../searchCriteria";
import { FoodSearchJson } from "../../../types/FoodDataTypes";
import { InputField } from "../../Common/InputField/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  changeSortFunction,
  clickFilter,
  trySearch,
} from "../FoodSearch/FoodSearchFunctions";
import { useNavigate } from "react-router-dom";

type FoodSearchFormProps = {
  setSearchResults: (results: FoodSearchJson) => void;
  searchCriteria: SearchCriteria;
  setSearchCriteria: (c: SearchCriteria) => void;
};

export function FoodSearchForm(props: FoodSearchFormProps) {
  const { setSearchResults, searchCriteria, setSearchCriteria } = props;
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  async function clickSearch() {
    const success = await trySearch(searchText, setSearchResults);
    if (!success) {
      navigate("/error");
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        clickSearch();
      }}
    >
      <InputField
        name="search"
        id="search"
        value={searchText}
        changeFunction={(e) => setSearchText(e.target.value)}
        buttonChildren={<FontAwesomeIcon icon={faArrowRight} />}
        buttonType="submit"
      />
      <div className="sub-container">
        {filterFunctions.map((filterFunction) => (
          <label>
            <input
              type="checkbox"
              name={filterFunction.displayName}
              id={filterFunction.displayName}
              onChange={(e) =>
                clickFilter(e, searchCriteria, setSearchCriteria)
              }
            />
            {filterFunction.displayName}
          </label>
        ))}
      </div>
      <div>
        <div>Sort By:</div>
        <select
          onChange={(e) =>
            changeSortFunction(e, searchCriteria, setSearchCriteria)
          }
        >
          {sortFunctions.map((sortFunction) => (
            <option>{sortFunction.displayName}</option>
          ))}
        </select>
      </div>
    </form>
  );
}
