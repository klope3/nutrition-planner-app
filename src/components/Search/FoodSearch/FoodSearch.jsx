import { FoodSearchResult } from "../FoodSearchResult/FoodSearchResult";

export function FoodSearch(props) {
  const { results } = props;
  return (
    <div>
      {results.foods.map((result) => (
        <FoodSearchResult food={result} />
      ))}
    </div>
  );
}
