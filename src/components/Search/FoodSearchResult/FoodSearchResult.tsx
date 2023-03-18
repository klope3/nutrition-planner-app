import { FoodSearchResultData } from "../../../types/FoodDataTypes";
import { formatCamelCase } from "../../../utility";
import "./FoodSearchResult.css";
import { sortNutrients } from "../../../calculateNutrients";
import { NutrientTable } from "../../Common/NutrientTable/NutrientTable";

type FoodSearchResultProps = {
  food: FoodSearchResultData;
  selectFood: (fdcId: number) => void;
  isSelected: boolean;
};

export function FoodSearchResult(props: FoodSearchResultProps) {
  const {
    food: {
      description,
      brandName,
      brandOwner,
      foodNutrients,
      servingSize,
      servingSizeUnit,
      foodCategory: category,
      fdcId,
    },
    selectFood,
    isSelected,
  } = props;
  const details = {
    brandName,
    brandOwner,
    servingSize:
      servingSize && servingSizeUnit
        ? `${Math.round(servingSize)}${servingSizeUnit}`
        : "No data",
    category,
  };
  sortNutrients(foodNutrients);
  return (
    <div
      className={`food-search-result ${isSelected && "result-selected"}`}
      onClick={() => selectFood(fdcId)}
    >
      <div>
        {description} <span className="minor-text">{`(${category})`}</span>
      </div>
      <details>
        <summary>Details</summary>
        {Object.entries(details).map((entry) => (
          <div>
            {`${formatCamelCase(entry[0])}: ${entry[1] ? entry[1] : "No data"}`}
          </div>
        ))}
        <NutrientTable nutrients={foodNutrients} />
      </details>
    </div>
  );
}
