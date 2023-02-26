import { FoodSearchJson } from "./types/FoodDataTypes";

export const nutrientDailyAmounts = [
  {
    name: "Calories",
    dailyAmount: 2000,
  },
  {
    name: "Fat",
    dailyAmount: 67,
  },
  {
    name: "Carbohydrates",
    dailyAmount: 125,
  },
  {
    name: "Sodium",
    dailyAmount: 2000,
  },
  {
    name: "Protein",
    dailyAmount: 50,
  },
];

export const API_URL = "https://api.nal.usda.gov/fdc/v1";
export const API_KEY = import.meta.env.VITE_API_KEY;
export const DB_URL = "http://localhost:3000";

export const sectionsPerDay = 5;

export const unknownFoodName = "Unknown Food";

export const useFakeSearch = false;
export const fakeSearch: FoodSearchJson = {
  foods: [
    {
      description: "Cucumber",
      fdcId: 111111,
      dataType: "",
    },
    {
      description: "Tomato",
      fdcId: 23874,
      dataType: "",
    },
    {
      description: "Cookie",
      fdcId: 8977655,
      dataType: "",
    },
    {
      description: "Wheat Bread",
      fdcId: 879613,
      dataType: "",
    },
  ],
};
