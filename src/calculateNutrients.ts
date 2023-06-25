import { nutrientInfo, nutrientOrder } from "./constants";
import { Portion } from "./types/DayChartNew";
import { FoodData, Nutrient } from "./types/FoodDataNew";

export function getNutrientsToShow(rows: Portion[], foodData: FoodData[]) {
  const foodDataThisDay: FoodData[] =
    rows &&
    (rows
      .map((row) => foodData.find((data) => data.fdcId === row.fdcId))
      .filter((item) => item !== undefined) as FoodData[]); //ts doesn't realize we filtered out the undefined

  const nutrientsThisDay =
    foodDataThisDay && foodDataThisDay.map((data) => data.nutrients).flat();
  const nutrientSums = getNutrientSums(nutrientsThisDay);
  const nutrientsToShow = nutrientInfo.map((info) => {
    const amount = nutrientSums[info.fdcName];
    const nutrient: Nutrient = {
      amount: amount !== undefined ? amount : 0,
      nutrientInfo: info,
    };
    return nutrient;
  });
  sortNutrients(nutrientsToShow);
  return nutrientsToShow;
}

export function sortNutrients(nutrients: Nutrient[]) {
  nutrients.sort((nutrient1, nutrient2) => {
    return (
      nutrientOrder.indexOf(nutrient1.nutrientInfo.fdcName) -
      nutrientOrder.indexOf(nutrient2.nutrientInfo.fdcName)
    );
  });
}

function getNutrientSums(nutrients: Nutrient[]): any {
  if (!nutrients) return {};
  const nutrientSums: any = {};
  nutrients.forEach((nutrient) => {
    if (nutrient) {
      const name = nutrient.nutrientInfo.fdcName;
      nutrientSums[name] = nutrientSums[name]
        ? nutrientSums[name] + nutrient.amount
        : nutrient.amount;
    }
  });
  return nutrientSums;
}

export function isNutrientSupported(nutrientName: string) {
  return !!nutrientInfo.find(
    (nutrientInfo) => nutrientInfo.fdcName === nutrientName
  );
}
