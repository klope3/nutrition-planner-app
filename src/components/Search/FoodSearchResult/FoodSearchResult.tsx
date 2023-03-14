import { FoodSearchResultData } from "../../../types/FoodDataTypes";
import { formatCamelCase } from "../../../utility";
import { nutrientInfo } from "../../../constants";
import "./FoodSearchResult.css";
import { sortNutrients } from "../../../calculateNutrients";

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
      dataType,
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
      <div>{description}</div>
      <details>
        <summary>Details</summary>
        {Object.entries(details).map((entry) => (
          <div>
            {`${formatCamelCase(entry[0])}: ${entry[1] ? entry[1] : "No data"}`}
          </div>
        ))}
        {(!foodNutrients || foodNutrients.length === 0) && (
          <div>No nutrient data</div>
        )}
        {foodNutrients.length > 0 &&
          foodNutrients.map((nutrient) => {
            const matchingInfo = nutrientInfo.find(
              (info) => info.fdcName === nutrient.fdcName
            );
            if (!matchingInfo) return undefined;
            const dailyValue = Math.round(
              (Math.round(nutrient.value) / matchingInfo.dailyValue) * 100
            );
            return (
              <div>
                {matchingInfo.displayName}: {Math.round(nutrient.value)}
                {matchingInfo.unit}{" "}
                {dailyValue !== undefined && `(${dailyValue}%)`}
              </div>
            );
          })}
      </details>
    </div>
  );
}
