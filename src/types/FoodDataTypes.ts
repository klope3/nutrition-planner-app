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
  foodNutrients: Nutrient[];
};

export type FoodData = {
  fdcId: number;
  description: string;
  nutrients: Nutrient[];
};

export type NutrientInfo = {
  fdcName: string;
  displayName: string | undefined;
  unit: string;
  dailyValue: number;
  isMajorNutrient: boolean;
};

export type Nutrient = NutrientInfo & {
  amount: number;
};
