import { getNutrientsToShow } from "../../../calculateNutrients";
import { sectionsPerDay } from "../../../constants";
import { Nutrient } from "../../../types/FoodDataNew";
import { splitArrayBy } from "../../../utility";
import { useDayChart } from "../../DayChartProvider";
import { NutrientProgressBar } from "../NutrientProgressBar/NutrientProgressBar";
import "./NutrientProgressArea.css";

type NutrientProgressAreaProps = {
  dayIndex: number;
};

export function NutrientProgressArea(props: NutrientProgressAreaProps) {
  const { dayIndex } = props;
  const { foodData, getRowsForSection } = useDayChart();
  const sectionIndices = Array.from({ length: sectionsPerDay }, (_, i) => i);
  const rowsThisDay = sectionIndices
    .map((sectionIndex) => getRowsForSection(dayIndex, sectionIndex))
    .flat();
  const nutrientsToShow = getNutrientsToShow(rowsThisDay, foodData);
  const { passArr: majorNutrients, failArr: minorNutrients } = splitArrayBy(
    nutrientsToShow,
    (nutrient: Nutrient) => nutrient.nutrientInfo.isMajorNutrient
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
