import { FoodSearchResultData } from "../../../types/FoodDataTypes";
import "./FoodSearchResult.css";

type FoodSearchResultProps = {
  food: FoodSearchResultData;
  selectFood: (fdcId: number) => void;
};

export function FoodSearchResult(props: FoodSearchResultProps) {
  const {
    food: { description, dataType, fdcId },
    selectFood,
  } = props;
  return (
    <div className="food-search-result" onClick={() => selectFood(fdcId)}>
      <div>{description}</div>
      <div>{dataType}</div>
      <div>{fdcId}</div>
    </div>
  );
}
