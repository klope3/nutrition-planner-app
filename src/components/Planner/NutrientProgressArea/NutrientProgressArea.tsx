import { getNutrientsToShow } from "../../../calculateNutrients";
import {} from "../../../types/FoodDataTypes";
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

  return (
    <div>
      <div className="nutrient-progress-area day-chart-sub-container">
        {nutrientsToShow.map(
          (nutrient) =>
            nutrient &&
            nutrient.isMajorNutrient && (
              <NutrientProgressBar nutrient={nutrient} />
            )
        )}
      </div>
      <details>
        <summary>More Nutrients</summary>
        <div className="nutrient-progress-area">
          {nutrientsToShow.map(
            (nutrient) =>
              nutrient &&
              !nutrient.isMajorNutrient && (
                <NutrientProgressBar nutrient={nutrient} />
              )
          )}
        </div>
      </details>
    </div>
  );
}
