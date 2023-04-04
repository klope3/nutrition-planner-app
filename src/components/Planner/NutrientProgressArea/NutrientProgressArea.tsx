import { getNutrientsToShow } from "../../../calculateNutrients";
import {} from "../../../types/FoodDataTypes";
import { splitArrayBy } from "../../../utility";
import { useDayChart } from "../../DayChartProvider";
import { NutrientProgressBar } from "../NutrientProgressBar/NutrientProgressBar";
import "./NutrientProgressArea.css";

type NutrientProgressAreaProps = {
  dayIndex: number;
};

export function NutrientProgressArea(props: NutrientProgressAreaProps) {
  const { dayIndex } = props;
  const { dayChart } = useDayChart();
  const nutrientsToShow = getNutrientsToShow(dayChart, dayIndex);
  const { passArr: majorNutrients, failArr: minorNutrients } = splitArrayBy(
    nutrientsToShow,
    (nutrient) => nutrient.isMajorNutrient
  );

  return (
    <div>
      <div className="nutrient-progress-area sub-container">
        {majorNutrients.map((nutrient, i) => (
          <NutrientProgressBar key={i} nutrient={nutrient} />
        ))}
      </div>
      <details>
        <summary>More Nutrients</summary>
        <div className="nutrient-progress-area">
          {minorNutrients.map((nutrient, i) => (
            <NutrientProgressBar key={i} nutrient={nutrient} />
          ))}
        </div>
      </details>
    </div>
  );
}
