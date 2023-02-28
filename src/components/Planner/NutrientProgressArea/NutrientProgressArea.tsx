import { nutrientInfo, nutrientOrder } from "../../../constants";
import {
  Nutrient,
  NutrientInfo,
  PortionRowState,
} from "../../../types/DayChartTypes";
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
  const rowsThisDay =
    dayChart &&
    dayChart.days &&
    dayChart.days[dayIndex]?.sections?.map((section) => section?.rows).flat();
  const nutrientsThisDay =
    rowsThisDay && rowsThisDay.map((row) => row?.foodData.nutrients).flat();
  const nutrientsToSum = nutrientsThisDay?.filter(
    (nutrient) =>
      !!nutrientInfo.find(
        (nutrientInfo) => nutrientInfo.fdcName === nutrient?.fdcName
      )
  );
  const nutrientSums: { [key: string]: number } = {};
  nutrientsToSum?.forEach((nutrient) => {
    if (nutrient) {
      const name = nutrient.fdcName;
      nutrientSums[name] = nutrientSums[name]
        ? nutrientSums[name] + nutrient.amount
        : nutrient.amount;
    }
  });
  // const nutrientsToShow: Nutrient[] = Object.keys(nutrientSums).map(
  //   (nutrientKey) => {
  //     const info = nutrientInfo.find(
  //       (info) => info.fdcName === nutrientKey
  //     ) as NutrientInfo;
  //     const nutrient: Nutrient = {
  //       fdcName: info.fdcName,
  //       displayName: info.displayName,
  //       amount: nutrientSums[nutrientKey],
  //       unit: info.unit,
  //       dailyValue: info.dailyValue,
  //     };
  //     return nutrient;
  //   }
  // );
  const nutrientsToShow: Nutrient[] = nutrientInfo.map((info) => ({
    fdcName: info.fdcName,
    displayName: info.displayName,
    amount: +nutrientSums[info.fdcName],
    unit: info.unit,
    dailyValue: info.dailyValue,
  }));
  nutrientsToShow.sort(
    (nutrient1, nutrient2) =>
      nutrientOrder.indexOf(nutrient1.fdcName) -
      nutrientOrder.indexOf(nutrient2.fdcName)
  );

  return (
    <div className="nutrient-progress-area">
      {nutrientsToShow?.map(
        (nutrient) => nutrient && <NutrientProgressBar nutrient={nutrient} />
      )}
    </div>
  );
}
