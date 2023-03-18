import { FdcFoodCategory } from "./FdcFoodCategories";

export type FoodSearchJson = {
  foods: FoodSearchResultData[];
};

export type FoodSearchResultData = {
  description: string;
  fdcId: number;
  dataType: string;
  brandName: string;
  brandOwner: string;
  foodCategory: FdcFoodCategory;
  servingSize: number;
  servingSizeUnit: string;
  foodNutrients: Nutrient[];
};

export type FoodData = {
  fdcId: number;
  description: string;
  nutrients: Nutrient[];
};

export type NutrientInfo = {
  fdcName: string;
  displayName: NutrientDisplayName | undefined;
  unit: string;
  dailyValue: number;
  isMajorNutrient: boolean;
};

export type Nutrient = NutrientInfo & {
  amount: number;
};

export type NutrientDisplayName =
  | "Calcium"
  | "Carbohydrates"
  | "Cholesterol"
  | "Calories"
  | "Fiber"
  | "Folate"
  | "Iron"
  | "Magnesium"
  | "Niacin"
  | "Phosphorous"
  | "Potassium"
  | "Protein"
  | "Riboflavin"
  | "Sodium"
  | "Total Sugars"
  | "Thiamin"
  | "Total Fat"
  | "Vitamin A"
  | "Vitamin B-6"
  | "Vitamin B-12"
  | "Vitamin C"
  | "Vitamin D"
  | "Vitamin E"
  | "Vitamin K"
  | "Zinc";
