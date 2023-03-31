import { nutrientInfo, nutrientOrder } from "./constants";
import { DayChartState } from "./types/DayChartTypes";
import { Nutrient, NutrientInfo } from "./types/FoodDataTypes";

export function getNutrientsToShow(dayChart: DayChartState, dayIndex: number) {
  const rowsThisDay =
    dayChart &&
    dayChart.days &&
    dayChart.days[dayIndex]?.sections?.map((section) => section?.rows).flat();
  const nutrientsThisDay =
    rowsThisDay && rowsThisDay.map((row) => row?.foodData.nutrients).flat();

  const nutrientsToSum = nutrientsThisDay?.filter(isNutrientSupported);
  const nutrientSums = getNutrientSums(nutrientsToSum);
  const nutrientsToShow = nutrientInfo.map((info) =>
    createNutrientWithAmount(nutrientSums, info)
  );
  sortNutrients(nutrientsToShow);

  return nutrientsToShow;
}

export function sortNutrients(nutrients: Nutrient[]) {
  nutrients.sort((nutrient1, nutrient2) => {
    return (
      nutrientOrder.indexOf(nutrient1.fdcName) -
      nutrientOrder.indexOf(nutrient2.fdcName)
    );
  });
}

function getNutrientSums(nutrients: (Nutrient | undefined)[] | undefined): any {
  if (!nutrients) return {};
  const nutrientSums: any = {};
  nutrients.forEach((nutrient) => {
    if (nutrient) {
      const name = nutrient.fdcName;
      nutrientSums[name] = nutrientSums[name]
        ? nutrientSums[name] + nutrient.amount
        : nutrient.amount;
    }
  });
  return nutrientSums;
}

function isNutrientSupported(nutrient: Nutrient | undefined) {
  return !!nutrientInfo.find(
    (nutrientInfo) => nutrientInfo.fdcName === nutrient?.fdcName
  );
}

function createNutrientWithAmount(
  nutrientSums: any,
  info: NutrientInfo
): Nutrient {
  return {
    fdcName: info.fdcName,
    displayName: info.displayName,
    amount: nutrientSums[info.fdcName] ? nutrientSums[info.fdcName] : 0,
    unit: info.unit,
    dailyValue: info.dailyValue,
    isMajorNutrient: info.isMajorNutrient,
  };
}
