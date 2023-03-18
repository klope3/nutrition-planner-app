import { Nutrient } from "../../../types/FoodDataTypes";
import "./NutrientTable.css";

type NutrientTableProps = {
  nutrients: Nutrient[];
};

export function NutrientTable({ nutrients }: NutrientTableProps) {
  return (
    <div className="nutrient-table">
      {(!nutrients || nutrients.length === 0) && <div>No nutrient data</div>}
      {nutrients.length > 0 &&
        nutrients.map((nutrient) => {
          if (!nutrient.displayName) return undefined;
          return (
            <div>
              <div>{`${nutrient.displayName} ${nutrient.amount}${nutrient.unit}`}</div>
              <div>{`${nutrient.dailyValue}%`}</div>
            </div>
          );
        })}
    </div>
  );
}
