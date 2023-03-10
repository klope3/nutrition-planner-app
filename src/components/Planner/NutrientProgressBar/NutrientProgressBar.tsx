import { Nutrient } from "../../../types/DayChartTypes";
import "./NutrientProgressBar.css";

type NutrientProgressBarProps = {
  nutrient: Nutrient;
};

export function NutrientProgressBar(props: NutrientProgressBarProps) {
  const { displayName, amount, dailyValue } = props.nutrient;
  const percentDV = Math.round((amount / dailyValue) * 100);
  const style = { right: `${100 - percentDV}%` };
  return (
    <div className="nutrient-progress-bar-container">
      <div className="nutrient-progress-bar" style={style}></div>
      <div className="nutrient-progress-text">{displayName}</div>
    </div>
  );
}
