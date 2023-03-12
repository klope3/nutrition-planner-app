import { FoodSearchResultData } from "../../../types/FoodDataTypes";
import { formatCamelCase } from "../../../utility";
import "./FoodSearchResult.css";

type FoodSearchResultProps = {
  food: FoodSearchResultData;
  selectFood: (fdcId: number) => void;
};

export function FoodSearchResult(props: FoodSearchResultProps) {
  const {
    food: {
      description,
      brandName,
      brandOwner,
      nutrients,
      servingSize,
      servingSizeUnit,
      foodCategory: category,
      dataType,
      fdcId,
    },
    selectFood,
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
  return (
    <div className="food-search-result" onClick={() => selectFood(fdcId)}>
      <div>{description}</div>
      <details>
        <summary>Details</summary>
        {Object.entries(details).map((entry) => (
          <div>
            {`${formatCamelCase(entry[0])}: ${entry[1] ? entry[1] : "No data"}`}
          </div>
        ))}
      </details>
    </div>
  );
}
