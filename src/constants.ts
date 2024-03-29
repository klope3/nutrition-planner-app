import { NutrientInfo } from "./types/FoodDataNew";

export const nutrientInfo: NutrientInfo[] = [
  {
    fdcName: "Calcium, Ca",
    displayName: "Calcium",
    unit: "mg",
    dailyValue: 1000,
    isMajorNutrient: false,
  },
  {
    fdcName: "Carbohydrate, by difference",
    displayName: "Carbohydrates",
    unit: "g",
    dailyValue: 300,
    isMajorNutrient: true,
  },
  {
    fdcName: "Cholesterol",
    displayName: "Cholesterol",
    unit: "mg",
    dailyValue: 300,
    isMajorNutrient: true,
  },
  {
    fdcName: "Energy",
    displayName: "Calories",
    unit: "kcal",
    dailyValue: 2000,
    isMajorNutrient: true,
  },
  {
    fdcName: "Fiber, total dietary",
    displayName: "Fiber",
    unit: "g",
    dailyValue: 30,
    isMajorNutrient: true,
  },
  {
    fdcName: "Folate, total",
    displayName: "Folate",
    unit: "µg",
    dailyValue: 400,
    isMajorNutrient: false,
  },
  {
    fdcName: "Iron, Fe",
    displayName: "Iron",
    unit: "mg",
    dailyValue: 18,
    isMajorNutrient: false,
  },
  {
    fdcName: "Magnesium, Mg",
    displayName: "Magnesium",
    unit: "mg",
    dailyValue: 400,
    isMajorNutrient: false,
  },
  {
    fdcName: "Niacin",
    displayName: "Niacin",
    unit: "mg",
    dailyValue: 20,
    isMajorNutrient: false,
  },
  {
    fdcName: "Phosphorus, P",
    displayName: "Phosphorous",
    unit: "mg",
    dailyValue: 1000,
    isMajorNutrient: false,
  },
  {
    fdcName: "Potassium, K",
    displayName: "Potassium",
    unit: "mg",
    dailyValue: 3500,
    isMajorNutrient: false,
  },
  {
    fdcName: "Protein",
    displayName: "Protein",
    unit: "g",
    dailyValue: 50,
    isMajorNutrient: true,
  },
  {
    fdcName: "Riboflavin",
    displayName: "Riboflavin",
    unit: "mg",
    dailyValue: 1.7,
    isMajorNutrient: false,
  },
  {
    fdcName: "Sodium, Na",
    displayName: "Sodium",
    unit: "mg",
    dailyValue: 2400,
    isMajorNutrient: true,
  },
  {
    fdcName: "Sugars, total including NLEA",
    displayName: "Total Sugars",
    unit: "g",
    dailyValue: 24,
    isMajorNutrient: true,
  },
  {
    fdcName: "Thiamin",
    displayName: "Thiamin",
    unit: "mg",
    dailyValue: 1.5,
    isMajorNutrient: false,
  },
  {
    fdcName: "Total lipid (fat)",
    displayName: "Total Fat",
    unit: "g",
    dailyValue: 65,
    isMajorNutrient: true,
  },
  {
    fdcName: "Vitamin A, IU",
    displayName: "Vitamin A",
    unit: "IU",
    dailyValue: 5000,
    isMajorNutrient: false,
  },
  {
    fdcName: "Vitamin B-6",
    displayName: "Vitamin B-6",
    unit: "mg",
    dailyValue: 2,
    isMajorNutrient: false,
  },
  {
    fdcName: "Vitamin B-12",
    displayName: "Vitamin B-12",
    unit: "µg",
    dailyValue: 6,
    isMajorNutrient: false,
  },
  {
    fdcName: "Vitamin C, total ascorbic acid",
    displayName: "Vitamin C",
    unit: "mg",
    dailyValue: 60,
    isMajorNutrient: false,
  },
  {
    fdcName: "Vitamin D (D2 + D3)",
    displayName: "Vitamin D",
    unit: "µg",
    dailyValue: 15,
    isMajorNutrient: false,
  },
  {
    fdcName: "Vitamin E (alpha-tocopherol)",
    displayName: "Vitamin E",
    unit: "mg",
    dailyValue: 15,
    isMajorNutrient: false,
  },
  {
    fdcName: "Vitamin K (phylloquinone)",
    displayName: "Vitamin K",
    unit: "µg",
    dailyValue: 80,
    isMajorNutrient: false,
  },
  {
    fdcName: "Zinc, Zn",
    displayName: "Zinc",
    unit: "mg",
    dailyValue: 15,
    isMajorNutrient: false,
  },
];

export const nutrientOrder = [
  "Energy",
  "Total lipid (fat)",
  "Cholesterol",
  "Sodium, Na",
  "Carbohydrate, by difference",
  "Fiber, total dietary",
  "Sugars, total including NLEA",
  "Protein",
  "Vitamin A, IU",
  "Vitamin B-6",
  "Vitamin B-12",
  "Vitamin C, total ascorbic acid",
  "Vitamin D (D2 + D3)",
  "Vitamin E (alpha-tocopherol)",
  "Vitamin K (phylloquinone)",
  "Calcium, Ca",
  "Iron, Fe",
  "Folate, total",
  "Magnesium, Mg",
  "Niacin",
  "Phosphorus, P",
  "Potassium, K",
  "Riboflavin",
  "Thiamin",
  "Zinc, Zn",
];

export const API_URL = "https://api.nal.usda.gov/fdc/v1";
export const API_KEY = import.meta.env.VITE_API_KEY;

export const sectionsPerDay = 5;
export const daysToShow = 7;

export const unknownFoodName = "Unknown Food";

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const invalidSignInError = "Invalid username or password.";
export const miscError = "Something went wrong. Try again later.";
export const serverError = "Unable to contact server. Try again later.";
export const fetchFailure = "Failed to fetch";
