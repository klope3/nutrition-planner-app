import { nutrientInfo, unknownFoodName } from "./constants";
import {
  FoodData,
  FoodSearchJson,
  FoodSearchResultData,
  Nutrient,
} from "./types/FoodDataTypes";

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
  const converted: FoodSearchJson = {
    foods: json.foods.map((foodAny: any) =>
      convertFoodSearchResultData(foodAny)
    ),
  };
  return converted;
}

function convertFoodSearchResultData(food: any): FoodSearchResultData {
  return {
    description: food.description,
    fdcId: food.fdcId,
    dataType: food.dataType,
    brandName: food.brandName,
    brandOwner: food.brandOwner,
    foodCategory: food.foodCategory,
    servingSize: food.servingSize,
    servingSizeUnit: food.servingSizeUnit,
    foodNutrients: food.foodNutrients.map((nutrientAny: any) =>
      convertNutrientFromRawSearch(nutrientAny)
    ),
  };
}

function convertNutrientFromRawSearch(nutrient: any): Nutrient {
  const matchingInfo = nutrientInfo.find(
    (info) => info.fdcName === nutrient.nutrientName
  );
  const roundAmount = Math.round(nutrient.value);
  let dailyValue = matchingInfo
    ? Math.round((roundAmount / matchingInfo.dailyValue) * 100)
    : nutrient.percentDailyValue;
  if (roundAmount === 0) dailyValue = 0;

  return {
    fdcName: nutrient.nutrientName,
    displayName: matchingInfo ? matchingInfo.displayName : undefined,
    unit: matchingInfo ? matchingInfo.unit : nutrient.unitName,
    dailyValue,
    isMajorNutrient: matchingInfo ? matchingInfo.isMajorNutrient : false,
    amount: roundAmount,
  };
}
