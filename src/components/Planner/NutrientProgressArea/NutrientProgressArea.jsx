import { NutrientProgressBar } from "../NutrientProgressBar/NutrientProgressBar";
import "./NutrientProgressArea.css";

export function NutrientProgressArea() {
  return (
    <div className="nutrient-progress-area">
      <NutrientProgressBar />
      <NutrientProgressBar />
      <NutrientProgressBar />
      <NutrientProgressBar />
    </div>
  );
}
