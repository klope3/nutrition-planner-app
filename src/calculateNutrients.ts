import { nutrientInfo, nutrientOrder } from "./constants";
import { DayChartState } from "./types/DayChartTypes";
import { Nutrient, SimpleNutrient } from "./types/FoodDataTypes";

export function getNutrientsToShow(dayChart: DayChartState, dayIndex: number) {
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
  const nutrientsToShow: Nutrient[] = nutrientInfo.map((info) => ({
    fdcName: info.fdcName,
    displayName: info.displayName,
    amount: nutrientSums[info.fdcName] ? nutrientSums[info.fdcName] : 0,
    unit: info.unit,
    dailyValue: info.dailyValue,
    isMajorNutrient: info.isMajorNutrient,
  }));
  nutrientsToShow.sort(
    (nutrient1, nutrient2) =>
      nutrientOrder.indexOf(nutrient1.fdcName) -
      nutrientOrder.indexOf(nutrient2.fdcName)
  );

  return nutrientsToShow;
}

export function sortNutrients(nutrients: Nutrient[] | SimpleNutrient[]) {
  nutrients.sort((nutrient1, nutrient2) => {
    return (
      nutrientOrder.indexOf(nutrient1.fdcName) -
      nutrientOrder.indexOf(nutrient2.fdcName)
    );
  });
}
