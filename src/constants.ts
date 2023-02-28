import { NutrientInfo } from "./types/DayChartTypes";
import { FoodSearchJson } from "./types/FoodDataTypes";

export const nutrientInfo: NutrientInfo[] = [
  {
    fdcName: "Calcium, Ca",
    displayName: "Calcium",
    unit: "mg",
    dailyValue: 1000,
  },
  {
    fdcName: "Carbohydrate, by difference",
    displayName: "Carbohydrates",
    unit: "g",
    dailyValue: 300,
  },
  {
    fdcName: "Cholesterol",
    displayName: "Cholesterol",
    unit: "mg",
    dailyValue: 300,
  },
  {
    fdcName: "Energy",
    displayName: "Calories",
    unit: "kcal",
    dailyValue: 2000,
  },
  {
    fdcName: "Fiber, total dietary",
    displayName: "Fiber",
    unit: "g",
    dailyValue: 30,
  },
  {
    fdcName: "Folate, total",
    displayName: "Folate",
    unit: "µg",
    dailyValue: 400,
  },
  {
    fdcName: "Iron, Fe",
    displayName: "Iron",
    unit: "mg",
    dailyValue: 18,
  },
  {
    fdcName: "Magnesium, Mg",
    displayName: "Magnesium",
    unit: "mg",
    dailyValue: 400,
  },
  {
    fdcName: "Niacin",
    displayName: "Niacin",
    unit: "mg",
    dailyValue: 20,
  },
  {
    fdcName: "Phosphorus, P",
    displayName: "Phosphorous",
    unit: "mg",
    dailyValue: 1000,
  },
  {
    fdcName: "Potassium, K",
    displayName: "Potassium",
    unit: "mg",
    dailyValue: 3500,
  },
  {
    fdcName: "Protein",
    displayName: "Protein",
    unit: "g",
    dailyValue: 50,
  },
  {
    fdcName: "Riboflavin",
    displayName: "Riboflavin",
    unit: "mg",
    dailyValue: 1.7,
  },
  {
    fdcName: "Sodium, Na",
    displayName: "Sodium",
    unit: "mg",
    dailyValue: 2400,
  },
  {
    fdcName: "Sugars, total including NLEA",
    displayName: "Total Sugars",
    unit: "g",
    dailyValue: 24,
  },
  {
    fdcName: "Thiamin",
    displayName: "Thiamin",
    unit: "mg",
    dailyValue: 1.5,
  },
  {
    fdcName: "Total lipid (fat)",
    displayName: "Total Fat",
    unit: "g",
    dailyValue: 65,
  },
  {
    fdcName: "Vitamin A, IU",
    displayName: "Vitamin A",
    unit: "IU",
    dailyValue: 5000,
  },
  {
    fdcName: "Vitamin B-6",
    displayName: "Vitamin B-6",
    unit: "mg",
    dailyValue: 2,
  },
  {
    fdcName: "Vitamin B-12",
    displayName: "Vitamin B-12",
    unit: "µg",
    dailyValue: 6,
  },
  {
    fdcName: "Vitamin C, total ascorbic acid",
    displayName: "Vitamin C",
    unit: "mg",
    dailyValue: 60,
  },
  {
    fdcName: "Vitamin D (D2 + D3)",
    displayName: "Vitamin D",
    unit: "µg",
    dailyValue: 15,
  },
  {
    fdcName: "Vitamin E (alpha-tocopherol)",
    displayName: "Vitamin E",
    unit: "mg",
    dailyValue: 15,
  },
  {
    fdcName: "Vitamin K (phylloquinone)",
    displayName: "Vitamin K",
    unit: "µg",
    dailyValue: 80,
  },
  {
    fdcName: "Zinc, Zn",
    displayName: "Zinc",
    unit: "mg",
    dailyValue: 15,
  },
];

export const API_URL = "https://api.nal.usda.gov/fdc/v1";
export const API_KEY = import.meta.env.VITE_API_KEY;
export const DB_URL = "http://localhost:3000";

export const sectionsPerDay = 5;

export const unknownFoodName = "Unknown Food";
