import { NutrientProgressBar } from "../NutrientProgressBar/NutrientProgressBar";
import "./NutrientProgressArea.css";

export function NutrientProgressArea() {
  const testNutrients = [
    {
      name: "Calories",
      amount: 1300,
    },
    {
      name: "Fat",
      amount: 34,
    },
    {
      name: "Carbohydrates",
      amount: 43,
    },
    {
      name: "Sodium",
      amount: 1200,
    },
    {
      name: "Protein",
      amount: 15,
    },
  ];
  return (
    <div className="nutrient-progress-area">
      {testNutrients.map((nutrient) => (
        <NutrientProgressBar key={nutrient.name} nutrient={nutrient} />
      ))}
    </div>
  );
}
