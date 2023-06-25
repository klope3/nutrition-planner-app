import { z } from "zod";

export type FoodData = z.infer<typeof foodDataSchema>;
export type Nutrient = z.infer<typeof nutrientSchema>;
export type NutrientInfo = z.infer<typeof nutrientInfoSchema>;

export const nutrientDisplayNameEnum = z.enum([
  "Calcium",
  "Carbohydrates",
  "Cholesterol",
  "Calories",
  "Fiber",
  "Folate",
  "Iron",
  "Magnesium",
  "Niacin",
  "Phosphorous",
  "Potassium",
  "Protein",
  "Riboflavin",
  "Sodium",
  "Total Sugars",
  "Thiamin",
  "Total Fat",
  "Vitamin A",
  "Vitamin B-6",
  "Vitamin B-12",
  "Vitamin C",
  "Vitamin D",
  "Vitamin E",
  "Vitamin K",
  "Zinc",
]);

const nutrientInfoSchema = z.object({
  fdcName: z.string(),
  displayName: nutrientDisplayNameEnum,
  unit: z.string(),
  dailyValue: z.number(),
  isMajorNutrient: z.boolean(),
});

const nutrientSchema = z.object({
  nutrientInfo: nutrientInfoSchema,
  amount: z.number(),
});

const foodDataSchema = z.object({
  fdcId: z.number(),
  description: z.string(),
  nutrients: z.array(nutrientSchema),
});
