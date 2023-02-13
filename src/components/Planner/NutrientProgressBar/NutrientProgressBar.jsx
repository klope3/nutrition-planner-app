import { nutrientDailyAmounts } from "../../../constants";
import "./NutrientProgressBar.css";

export function NutrientProgressBar(props) {
  const { name, amount } = props.nutrient;
  const referenceNutrient = nutrientDailyAmounts.find(
    (nutrient) => nutrient.name.toLowerCase() === name.toLowerCase()
  );
  const percent = referenceNutrient
    ? Math.round((amount / referenceNutrient.dailyAmount) * 100)
    : 0;
  const style = { right: `${100 - percent}%` };
  return (
    <div className="nutrient-progress-bar-container">
      <div className="nutrient-progress-bar" style={style}></div>
      <div className="nutrient-progress-text">{name}</div>
    </div>
  );
}
