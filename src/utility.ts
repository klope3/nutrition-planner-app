import { nutrientInfo, unknownFoodName } from "./constants";
import { FoodData, FoodSearchJson, Nutrient } from "./types/FoodDataTypes";

export function extractFoodDataFromJson(json: any) {
  const foodData: FoodData = {
    fdcId: json ? json.fdcId : 0,
    description: json ? json.description : unknownFoodName,
    nutrients: json ? foodNutrientsObjToNutrientsArr(json.foodNutrients) : [],
  };

  return foodData;
}

function foodNutrientsObjToNutrientsArr(foodNutrients: any[]): Nutrient[] {
  return foodNutrients.map((foodNutrient: any) => {
    const fdcName = foodNutrient.nutrient.name;
    const matchingInfo = nutrientInfo.find((info) => info.fdcName === fdcName);
    const nutrient: Nutrient = {
      fdcName,
      displayName: matchingInfo
        ? matchingInfo.displayName
        : "Nutrient name not found",
      amount: foodNutrient.amount,
      unit: foodNutrient.nutrient.unitName,
      dailyValue: matchingInfo ? matchingInfo.dailyValue : 0,
      isMajorNutrient: matchingInfo ? matchingInfo.isMajorNutrient : false,
    };
    return nutrient;
  });
}

export function splitArrayBy(array: any[], callback: (item: any) => boolean) {
  const passArr = [];
  const failArr = [];
  for (const item of array) {
    if (callback(item)) passArr.push(item);
    else failArr.push(item);
  }
  return {
    passArr,
    failArr,
  };
}

export const formatCamelCase = (str: string) =>
  str
    .replace(/([A-Z])/, " $1")
    .split(" ")
    .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
    .join(" ");

export function convertFoodSearchJson(json: any) {
  const converted = json as FoodSearchJson;
  converted.foods.forEach((food) => {
    food.foodNutrients.forEach((nutrient) => {
      nutrient.fdcName = (nutrient as any).nutrientName;
    });
  });
  return converted;
}
