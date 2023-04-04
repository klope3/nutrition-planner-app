import "./NutrientProgressBar.css";
import { Nutrient } from "../../../types/FoodDataTypes";

type NutrientProgressBarProps = {
  nutrient: Nutrient;
};

export function NutrientProgressBar(props: NutrientProgressBarProps) {
  const { displayName, amount, dailyValue } = props.nutrient;
  const percentDV = Math.round((amount / dailyValue) * 100);
  const right = 100 - percentDV;
  const style = right > 0 ? { right: `${right}%` } : undefined;
  return (
    <div className="nutrient-progress-bar-container">
      <div className="nutrient-progress-bar" style={style}></div>
      <div className="nutrient-progress-text">{displayName}</div>
    </div>
  );
}
