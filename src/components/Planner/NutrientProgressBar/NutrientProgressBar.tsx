import { nutrientDailyAmounts } from "../../../constants";
import "./NutrientProgressBar.css";

type Nutrient = {
  name: string,
  amount: number,
}

type NutrientProgressBarProps = {
  nutrient: Nutrient
}

export function NutrientProgressBar(props: NutrientProgressBarProps) {
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
