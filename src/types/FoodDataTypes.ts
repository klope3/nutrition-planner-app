export type FoodSearchJson = {
  foods: FoodSearchResultData[];
};

export type FoodSearchResultData = {
  description: string;
  fdcId: number;
  dataType: string;
  brandName: string;
  brandOwner: string;
  foodCategory: string;
  servingSize: number;
  servingSizeUnit: string;
  foodNutrients: SimpleNutrient[];
};

export type FoodData = {
  fdcId: number;
  description: string;
  nutrients: Nutrient[];
};

export type NutrientInfo = {
  fdcName: string;
  displayName: string;
  unit: string;
  dailyValue: number;
  isMajorNutrient: boolean;
};

export type Nutrient = NutrientInfo & {
  amount: number;
};

//the nutrient data provided by the API is simpler in search results
//than for individual foods
export type SimpleNutrient = {
  nutrientName: string;
  value: number;
  unitName: string;
  percentDailyValue: number;
};
